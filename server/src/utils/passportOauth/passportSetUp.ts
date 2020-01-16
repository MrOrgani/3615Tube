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
          "21ee8791ef364480489dc035732d734be746729d0dfc68c2fab5c5816c85728c",
        clientSecret:
          "73d97c9c7e44b2c59ff91abd3192e456a272e148fd2fb01a7739252e3e676ca0",
        callbackURL: `${process.env.BACK_HOST}/Oauth/42/redirect`
      },
      (_accessToken: any, _refreshToken: any, profile: any, cb: any) =>
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
      (_accessToken: any, _refreshToken: any, profile: any, cb: any) =>
        cb(null, profile)
    )
  );
  passport.serializeUser((user: any, cb: any) => cb(null, user));
  passport.deserializeUser((obj: any, cb: any) => cb(null, obj));
};
