import session from "express-session";

export const createSession = () => {
  const pgSession = require("connect-pg-simple")(session);
  const conString = "postgres://postgres:postgres@db:5432/postgres";
  return session({
    store: new pgSession({ conString: conString }),
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
