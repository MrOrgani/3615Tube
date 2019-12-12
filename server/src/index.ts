import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import connectToDb from "./utils/connecToDb";
import { genSchema } from "./utils/genSchema";
import session from "express-session";

// const cors = {
//   credentials: true,
//   origin: process.env.FRONT_HOST
// };

const startServer = async () => {
  await require("dotenv").config();
  const server = new GraphQLServer({
    schema: (await genSchema()) as any,
    context: ({ request }) => ({ session: request.session })
  });

  const pgSession = require("connect-pg-simple")(session);
  const conString = "postgres://postgres:postgres@db:5432/postgres";
  server.express.use(
    session({
      store: new pgSession({ conString: conString }),
      name: "HT_id",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 //7 days
      }
    })
  );
  await connectToDb(1);
  await server.start(() =>
    console.log(`Server is running on ${process.env.BACK_HOST}`)
  );
};

export default startServer();
