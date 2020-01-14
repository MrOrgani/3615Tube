import * as express from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

const router = express.Router();

//we still need a route for the confirmation email
//at the moment it does not redirect to the front
router.get("/:token", async (req: express.Request, res: express.Response) => {
  const { token } = req.params;

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  if (token) {
    const { id }: any = jwt.verify(token, process.env.SESSION_SECRET);
    // console.log(id);
    const user = (await User.findOne({ id })) as User;
    if (user) {
      await User.update({ id }, { verified: true });
      res.send("ok");
    } else res.send("no user found");
  } else res.send("no id provided");
});

module.exports = router;
