import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
// import * as path from "path";
console.log(User);
const typeDefs = importSchema("src/schema.graphql");
createConnection().then(() => {
  console.log("database connection made on port ...");
});

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
