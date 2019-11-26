import "reflect-metadata"; // needs to be on top
import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import schema from "./Graphql/schema";
import dotenv from "dotenv";
// import makeCallBack from "./express-callback";
// import { createUser } from "./controlers";
const app = express();
dotenv.config();

//when a query arrives at the GraphQL server, https://medium.com/@paigen11/what-is-graphql-really-76c48e720202
//it resolves the query by reading the payload and fetching the data.
//Then it uses the schema to return the data in the correct format to the client.

//MIDDLEWARES
app.use("*", cors());

//SERVER SETUP
const httpServer = createServer(app);
const port = 9000;
// require("./Mongo/connect").startMongoServer();
httpServer.listen(port, (): void =>
  console.log(`🚀   GraphQL running on ${port}${serverApollo.graphqlPath}`)
);

//GRAPH API && GRAPHQL SETUP
const serverApollo = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)]
});
serverApollo.applyMiddleware({ app, path: "/graphql" });
app.use(compression());
