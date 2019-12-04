import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { createConnection } from "typeorm";
// import { User } from "./entity/User";

const startServer = async () => {
  const typeDefs = importSchema("src/schema.graphql");
  let retries = 2;
  while (retries) {
    try {
      await createConnection().then(() => {
        console.log(`database connection made on port ${process.env.DB_HOST} `);
      });
      break;
    } catch (err) {
      retries -= 1;
      if (retries > 0)
        console.log("error connecting to the database, retrying ....");
      else console.log("ERROR CONNECTING TO DB", err);
      await new Promise(res => setTimeout(res, 4000));
    }
  }

  const server = new GraphQLServer({ typeDefs, resolvers });
  server.start(() => console.log("Server is running on localhost:4000"));
};
startServer();
