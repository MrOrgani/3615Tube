import * as express from "express";
// import { router } from "./Oauth";

const router = express.Router();
router.use("/Oauth", require("./Oauth")).use("/confirm", require("./confirm"));
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
