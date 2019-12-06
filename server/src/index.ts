import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import connectToDb from "./utils/connecToDb";
import * as fs from "fs";
import * as path from "path";
import { GraphQLSchema } from "graphql";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";

const startServer = async () => {
  //IMPORT ALL THE SCHEMAS AND MERGE THEM
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "./modules"));
  folders.forEach(folder => {
    const { resolvers } = require(`./modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `./modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });
  const server = new GraphQLServer({ schema: mergeSchemas({ schemas }) });
  await server.start(() => console.log("Server is running on localhost:4000"));

  //CONNECT TO ORM DB --> POSTGRES BEHIND
  await connectToDb(2);
};
export default startServer();
