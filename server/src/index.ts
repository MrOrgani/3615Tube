import "reflect-metadata";
import connectToDb from "./utils/connecToDb";
import { genSchema } from "./utils/genSchema";
import { createSession } from "./utils/createSession";
import { User } from "./entity/User";
import { passportSuccess } from "./utils/passportSuccess";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { GraphQLServer } from "graphql-yoga";

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
  const passport = require("passport");
  //PASSPORT SETUP MUST BE BEFORE THE CENTRAL ROUTER TO BE
  passport.use(
    new FortyTwoStrategy(
      {
        clientID:
          "df73b3fc5349efbfe57212d545fa735865396e52b4255c89e2302a385f0ab970",
        clientSecret:
          "879768eaf73a693d8feb1db647223d29be6555d3bd667ad6bf42d6adac9c3808",
        callbackURL: "http://localhost:9000/api/Oauth/42/redirect"
      },
      (profile: any, cb: any) => cb(null, profile)
    )
  );
  passport.serializeUser((user: any, cb: any) => cb(null, user));
  passport.deserializeUser((obj: any, cb: any) => cb(null, obj));
  server.express.use(passport.initialize(), passport.session());

  //ROUTING
  //we still need a route for the confirmation email
  //at the moment it does not redirect to the front
  server.express.get("/confirm/:id", async (req, res) => {
    const { id } = req.params;
    await User.update({ id }, { verified: true });
    res.send("ok");
  });
  server.express.route("/42").get(passport.authenticate("42"));
  server.express
    .route("/42/redirect")
    .get(
      passport.authenticate("42", { failureRedirect: "failure" }),
      (req: any, res: Response) => passportSuccess(req, res)
    );
  server.express
    .route("/42/failure")
    .get((req, res: Response) => res.redirect("http://localhost:3000"));

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
