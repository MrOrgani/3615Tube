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
  console.log(`🚀   GraphQL running on ${port}${server.graphqlPath}`)
);

//GRAPH API && GRAPHQL SETUP
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)]
});
server.applyMiddleware({ app, path: "/graphql" });
app.use(compression());

//TESTING ROUTES && TO BE DELETED
const apiRoot = process.env.apiRoot;
// app.post(`${apiRoot}/user`, makeCallBack(createUser));
app.use("/api/test", (req, res) => res.send({ hello: "world" }));
