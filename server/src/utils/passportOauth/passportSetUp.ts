import passport from "passport";

export const passportSetUp = () => {
  const FortyTwoStrategy = require("passport-42").Strategy;

  //PASSPORT SETUP MUST BE BEFORE THE CENTRAL ROUTER TO BE
  passport.use(
    new FortyTwoStrategy(
      {
        clientID:
          "1147a6093eeba9395c609615a02c74d062dc0ba819ed06b06c77f971f4d804af",
        clientSecret:
          "c3ae72ca14b63acace97a152bfbe05b73e113b9c5e9fde5a68ebce58790f30fa",
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
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: `${process.env.BACK_HOST}/Oauth/google/redirect`
      },
      (_accessToken: any, _refreshToken: any, profile: any, cb: any) =>
        cb(null, profile)
    )
  );
  passport.serializeUser((user: any, cb: any) => cb(null, user));
  passport.deserializeUser((obj: any, cb: any) => cb(null, obj));
};
