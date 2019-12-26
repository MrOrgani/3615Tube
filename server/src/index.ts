import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import connectToDb from "./utils/connecToDb";
import { genSchema } from "./utils/genSchema";
import { createSession } from "./utils/createSession";
import { User } from "./entity/User";
import bodyParser from "body-parser";

const startServer = async () => {
  await require("dotenv").config();

  //SERVER CREATION
  //graphql server is handling the request and redirecting them to the
  // query and mutaitons we also need it to get the request information like
  const server = new GraphQLServer({
    schema: (await genSchema()) as any,
    context: ({ request }) => ({
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      req: request
    })
  });

  // EXTRA SET UP: connecting to the db and the sessions (cookie stored using filed store in the session dir)
  server.express.use(createSession());
  await connectToDb();

  server.express.use(bodyParser.json({ limit: "10mb" }));
  server.express.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

  //ROUTING
  //we still need a route for the confirmation email
  //at the moment it does not redirect to the front
  server.express.get("/confirm/:id", async (req, res) => {
    const { id } = req.params;
    await User.update({ id }, { verified: true });
    res.send("ok");
  });

  //SERVER START
  //server parameters and actual start
  const cors = {
    credentials: true,
    origin: [
      process.env.FRONT_HOST,
      process.env.BACK_HOST,
      "http://localhost:4000/",
      "http://localhost:3000/"
    ]
  };
  await server.start({ cors }, () =>
    console.log(`Server is running on ${process.env.BACK_HOST}`)
  );
};

export default startServer();
