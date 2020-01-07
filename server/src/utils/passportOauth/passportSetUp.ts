import passport from "passport";

const GOOGLE_CLIENT_ID =
  "273389879865-jqohftesaasod68fnivsqlgnmri1arfd.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "m7uFkSgcpIaToih2Es5SMycf";

export const passportSetUp = () => {
  const FortyTwoStrategy = require("passport-42").Strategy;

  //PASSPORT SETUP MUST BE BEFORE THE CENTRAL ROUTER TO BE
  passport.use(
    new FortyTwoStrategy(
      {
        clientID:
          "5d0610399d93dc381272699d913e30df53e710ee0451e67ea86c56955026cb0a",
        clientSecret:
          "f05c930209f878c84651a1849511887e60fa700888e119f80179002a11c9f0f4",
        callbackURL: `${process.env.BACK_HOST}/Oauth/42/redirect`
      },
      (accessToken: any, refreshToken: any, profile: any, cb: any) =>
        cb(null, profile)
    )
  );

  const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACK_HOST}/Oauth/google/redirect`
      },
      (accessToken: any, refreshToken: any, profile: any, cb: any) =>
        cb(null, profile)
    )
  );
  passport.serializeUser((user: any, cb: any) => cb(null, user));
  passport.deserializeUser((obj: any, cb: any) => cb(null, obj));
};
