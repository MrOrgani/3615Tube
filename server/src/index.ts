import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import connectToDb from "./utils/connecToDb";
import { genSchema } from "./utils/genSchema";
import session from "express-session";
import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";

const startServer = async () => {
  if (process.env.debug)
    console.log("debugging mod is active", process.env.debug);
  await require("dotenv").config();
  const server = new GraphQLServer({
    schema: (await genSchema()) as any,
    context: ({ request }) => ({ session: request.session, req: request })
  });

  const fileStore = require("session-file-store")(session);
  server.express.use(bodyParser.json());
  server.express.use(
    session({
      store: new fileStore({}),
      name: "sid",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {}
    })
  );
  await connectToDb(1);
  const cors = {
    credentials: true,
    origin: "*"
  };
  await server.start(
    {
      cors
    },
    () => console.log(`Server is running on ${process.env.BACK_HOST}`)
  );
};

export default startServer();
