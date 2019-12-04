import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { createConnection } from "typeorm";

const startServer = async () => {
  const typeDefs = importSchema("src/schema.graphql");
  await createConnection().then(() => {
    console.log("database connection made on port ...");
  });
  const server = new GraphQLServer({ typeDefs, resolvers });
  await server.start(() => console.log("Server is running on localhost:4000"));
};
export default startServer();
