import * as express from "express";
// import { router } from "./Oauth";

//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
const router = express.Router();
router.use("/Oauth", require("./Oauth"))
.use("/confirm", require("./confirm"))
.use('/streaming', require('./streaming'))

//   .use("/test", (req: any, res: any) => {
//     console.log("ok");
//     res.send("ok");
//   });

module.exports = router;

// server.express.route("/42").get(passport.authenticate("42"));
// server.express
//   .route("/42/redirect")
//   .get(
//     passport.authenticate("42", { failureRedirect: "failure" }),
//     (req: any, res: Response) => passportSuccess(req, res)
//   );
// server.express
//   .route("/42/failure")
//   .get((req, res: Response) => res.redirect("http://localhost:3000"));
