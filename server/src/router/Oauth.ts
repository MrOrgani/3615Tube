import passport from "passport";
// import router from "./index";
import { passport42Success } from "../utils/passportOauth/passport42Success";
import * as express from "express";
import { passportGoogleSuccess } from "../utils/passportOauth/passportGooglesuccess";

const router = express.Router();

//42 OAuth
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

//GoogleOauth
router.route("/google").get(
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"]
  })
);
router.route("/google/redirect").get(
  passport.authenticate("google", {
    failureRedirect: "failure",
    session: false,
    scope: ["profile", "email"]
  }),
  (req, res) => passportGoogleSuccess(req, res)
);
router
  .route("/google/failure")
  .get((req, res) => res.redirect(process.env.FRONT_HOST));

module.exports = router;
