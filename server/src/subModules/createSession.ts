import session from "express-session";

export const createSession = () => {
  const fileStore = require("session-file-store")(session);
  return session({
    store: new fileStore({}),
    name: "HT_id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 1 //7 days
    }
  });
};
