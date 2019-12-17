import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import connectToDb from "./utils/connecToDb";
import { genSchema } from "./utils/genSchema";
import { createSession } from "./utils/createSession";
import { User } from "./entity/User";

const startServer = async () => {
  await require("dotenv").config();
  const server = new GraphQLServer({
    schema: (await genSchema()) as any,
    context: ({ request }) => ({
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      req: request
    })
  });
  server.express.use(createSession());
  await connectToDb(1);
  server.express.get("/confirm/:id", async (req, res) => {
    const { id } = req.params;
    await User.update({ id }, { verified: true });
    res.send("ok");
  });

  const cors = {
    credentials: true,
    origin: process.env.BACK_HOST
  };

  await server.start({ cors }, () =>
    console.log(`Server is running on ${process.env.BACK_HOST}`)
  );
};

export default startServer();
