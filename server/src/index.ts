import "reflect-metadata";
import bodyParser from "body-parser";
// import { Request, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import passport from "passport";
import connectToDb from "./utils/connecToDb";
import { genSchema } from "./utils/genSchema";
import { createSession } from "./utils/createSession";
import { passportSetUp } from "./utils/passportOauth/passportSetUp";

const startServer = async () => {
  await require("dotenv").config();

  //SERVER CREATION
  //graphql server is handling the request and redirecting them to the
  // query and mutaitons we also need it to get the request information like
  const server = new GraphQLServer({
    schema: (await genSchema()) as any,
    context: ({ request, response }) => {
      response.header("Access-Control-Allow-Origin", "http://localhost:3000");
      return {
        url: request.protocol + "://" + request.get("host"),
        session: request.session,
        res: response,
        req: request
      };
    }
  });

  // EXTRA SET UP: connecting to the db and the sessions (cookie stored using filed store in the session dir)
  server.express.use(createSession());
  await connectToDb();
  await passportSetUp();
  server.express.use(passport.initialize());

  // NECESSARY TO BE ABLE TO SEND IMAGES TO THE BACK
  server.express.use(bodyParser.json({ limit: "10mb" }));
  server.express.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

  //ROUTING
  const router = require("./router");
  server.express.use("/", router);

  //SERVER START
  //server parameters and actual start
  const cors = {
    credentials: true,
    origin: [
      process.env.FRONT_HOST,
      process.env.BACK_HOST,
      "http://localhost:4000/*",
      "http://localhost:3000/*"
    ]
  };
  await server.start({ cors }, () =>
    console.log(`Server is running on ${process.env.BACK_HOST}`)
  );
};

export default startServer();
