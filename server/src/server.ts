import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import schema from "./Graphql/schema";
import dotenv from "dotenv";
import makeCallBack from "./express-callback";
import { createUser } from "./controlers";
const app = express();
dotenv.config();

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
const port = 9000;
// require("./Mongo/connect").startMongoServer();
httpServer.listen(port, (): void =>
  console.log(`🚀   GraphQL running on ${port}${server.graphqlPath}`)
);

//TESTING ROUTES
const apiRoot = process.env.apiRoot;
app.post(`${apiRoot}/user`, makeCallBack(createUser));
app.use("/api/test", (req, res) => res.send({ hello: "world" }));
