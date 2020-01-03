import "reflect-metadata";
import connectToDb from "./utils/connecToDb";
import { genSchema } from "./utils/genSchema";
import { createSession } from "./utils/createSession";
// import { User } from "./entity/User";
// import { passportSuccess } from "./utils/passportSuccess";
import bodyParser from "body-parser";
// import { Request, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import passport from "passport";

const startServer = async () => {
  await require("dotenv").config();

  //SERVER CREATION
  //graphql server is handling the request and redirecting them to the
  // query and mutaitons we also need it to get the request information like
  const server = new GraphQLServer({
    schema: (await genSchema()) as any,
    context: ({ request, response }) => ({
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      res: response,
      req: request
    })
  });

  // EXTRA SET UP: connecting to the db and the sessions (cookie stored using filed store in the session dir)
  server.express.use(createSession());
  await connectToDb();

  // NECESSARY TO BE ABLE TO SEND IMAGES TO THE BACK
  server.express.use(bodyParser.json({ limit: "10mb" }));
  server.express.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

  //OAUTH & PASSPORT SETUP
  const FortyTwoStrategy = require("passport-42").Strategy;
  //PASSPORT SETUP MUST BE BEFORE THE CENTRAL ROUTER TO BE
  passport.use(
    new FortyTwoStrategy(
      {
        clientID:
          "5d0610399d93dc381272699d913e30df53e710ee0451e67ea86c56955026cb0a",
        clientSecret:
          "f05c930209f878c84651a1849511887e60fa700888e119f80179002a11c9f0f4",
        callbackURL: "http://localhost:4000/Oauth/42/redirect"
      },
      (accessToken: any, refreshToken: any, profile: any, cb: any) =>
        cb(null, profile)
    )
  );
  passport.serializeUser((user: any, cb: any) => cb(null, user));
  passport.deserializeUser((obj: any, cb: any) => cb(null, obj));
  // server.express.use(passport.initialize(), passport.session());
  server.express.use(passport.initialize());

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
      "http://localhost:4000/",
      "http://localhost:3000/"
    ]
  };
  await server.start({ cors }, () =>
    console.log(`Server is running on ${process.env.BACK_HOST}`)
  );
};

export default startServer();
