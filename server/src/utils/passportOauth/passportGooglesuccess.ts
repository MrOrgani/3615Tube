import { Response } from "express";
import { User } from "../../entity/User";
import { saveUserInDb } from "../../modules/user/register/resolvers";

export async function passportGoogleSuccess(req: any, res: Response) {
  if (req.user) {
    const {
      sub: id,
      given_name: firstName,
      family_name: lastName,
      email,
      picture
    } = req.user._json;
    // console.log("id in passport Googlesuccess", id);
    try {
      if (!id) throw "no id was received from the response";
      if (!req.session) throw "session Issue with your request";
      let registeredUser = (await User.findOne({
        where: { idGoogle: parseInt(id) }
      })) as User;
      if (!registeredUser) {
        registeredUser = (await saveUserInDb(
          "",
          firstName + lastName,
          email,
          firstName,
          lastName
        )) as User;
        User.update(
          { id: registeredUser.id },
          { verified: true, avatar: picture, idGoogle: id }
        );
      }
      req.session.userId = registeredUser.id;
      res.redirect(process.env.FRONT_HOST);
    } catch (err) {
      console.log("error creating / finding google profile", err);
      res.redirect(`http://localhost:3000`);
    }
  }
}
