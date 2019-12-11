import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import connectToDb from "./utils/connecToDb";
import { genSchema } from "./utils/genSchema";

const startServer = async () => {
  await require("dotenv").config();
  const server = new GraphQLServer({ schema: (await genSchema()) as any });
  await server.start(() =>
    console.log(`Server is running on ${process.env.BACK_HOST}`)
  );
  await connectToDb(2);
};
export default startServer();
