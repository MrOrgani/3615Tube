import * as express from "express";

//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
const router = express.Router();
router
  .use("/Oauth", require("./Oauth"))
  .use("/confirm", require("./confirm"))
  .use("/video", require("./video"));

module.exports = router;
