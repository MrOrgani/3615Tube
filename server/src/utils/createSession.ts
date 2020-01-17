import session from "express-session";

//fileStore allows us to store the session data in a file and not in the databse
//--> full automation of the db via typeorm
export const createSession = () => {
  const fileStore = require("session-file-store")(session);
  return session({
    store: new fileStore({ logFn: function() {} }),
    name: "HT_id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, //don't save until we store actual info
    cookie: {
      httpOnly: true, //not available from the front
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 1 //1 day
    }
  });
};
