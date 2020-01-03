import passport from "passport";
// import router from "./index";
import { passport42Success } from "../utils/passportOauth/passport42Success";
import * as express from "express";

const router = express.Router();

router.route("/42").get(passport.authenticate("42", { session: false }));
router
  .route("/42/redirect")
  .get(
    passport.authenticate("42", { failureRedirect: "failure", session: false }),
    (req, res) => passport42Success(req, res)
  );
router
  .route("/42/failure")
  .get((req, res) => res.redirect(process.env.FRONT_HOST));

module.exports = router;
