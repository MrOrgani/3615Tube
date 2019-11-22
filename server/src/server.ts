import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import schema from "./Graphql/schema";
const app = express();

//GRAPHQL SETUP
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)]
});
server.applyMiddleware({ app, path: "/graphql" });
app.use(compression());

//MIDDLEWARES
app.use("*", cors());

//SERVER SETUP
const httpServer = createServer(app);
const port = 3000;
httpServer.listen(port, (): void =>
  console.log(`🚀   GraphQL running on ${port}${server.graphqlPath}`)
);

//TESTING ROUTES
app.use("/api/test", (req, res) => res.send({ hello: "world" }));
app.use("/api/mongoTest", (req, res) => {
  require("./Mongo/connect.ts");
  res.send("working");
});
