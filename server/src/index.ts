import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import connectToDb from "./utils/connecToDb";
import { genSchema } from "./utils/genSchema";
import { confirmEmail } from "./modules/confirmEmail/index";

const startServer = async () => {
  await require("dotenv").config();
  const server = new GraphQLServer({ schema: (await genSchema()) as any });
  await server.start(() =>
    console.log(`Server is running on ${process.env.BACK_HOST}`)
  );
  server.express.get("/confirm/:id", (req, res) => confirmEmail(req, res));
  await connectToDb(2);
};
export default startServer();
