import * as passport from "passport";
// import router from "./index";
import { passportSuccess } from "../utils/passportSuccess";
import * as express from "express";

const router = express.Router();

router.route("/42").get(
  () => passport.authenticate("42", { failureRedirect: "failure" }),
  (req, res) => passportSuccess(req, res)
);
// router
//   .route("/42/failure")
//   .get((req: any, res: Response) => res.redirect(process.env.FRONT_HOST));

module.exports = router;
