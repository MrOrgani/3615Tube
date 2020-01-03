import { Response } from "express";
import { User } from "../entity/User";
import { saveUserInDb } from "../modules/user/register/resolvers";

export async function passportSuccess(req: any, res: Response) {
  if (req.user) {
    const { emails, id, username } = req.user;
    const { first_name, last_name, image_url } = req.user._json;
    try {
      if (!id) throw "token expired";
      if (!req.session) throw "session Issue with your request";
      const user = (await User.findOne({
        where: { id42: parseInt(id) }
      })) as User;
      if (!user.id) {
        console.log(
          "in passport 42 success, createing a new user",
          req.user,
          req.user._json
        );
        const user = (await saveUserInDb(
          "",
          username,
          emails[0].value,
          first_name,
          last_name
        )) as User;
        User.update(
          { id: user.id },
          { verified: true, avatar: image_url, id42: id }
        );
      }
      req.session.userId = user.id;
      res.redirect(process.env.FRONT_HOST);
    } catch (err) {
      console.log("error creating / finding 42 profile", err);
      res.redirect(`http://localhost:3000`);
    }
  }
}
