import * as express from "express";
import { User } from "../entity/User";

const router = express.Router();

//we still need a route for the confirmation email
//at the moment it does not redirect to the front
router.get("/", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const user = (await User.findOne({ id })) as User;
  if (user) {
    await User.update({ id }, { verified: true });
    res.send("ok");
  } else res.send("no user found");
});

module.exports = router;
