import { Response } from "express";
import { User } from "../../entity/User";
import { saveUserInDb } from "../../modules/user/register/resolvers";
import { findNewLogin } from "./findNewLogin";

export async function passportGoogleSuccess(req: any, res: Response) {
  if (req.user) {
    const {
      sub: id,
      given_name: firstName,
      family_name: lastName,
      email,
      picture
    } = req.user._json;
    try {
      if (!id) throw "no id was received from the response";
      if (!req.session) throw "session Issue with your request";
      let registeredUser = (await User.findOne({
        where: [{ email }, { idGoogle: parseInt(id) }]
      })) as User;
      if (!registeredUser) {
        registeredUser = (await saveUserInDb(
          "",
          (await findNewLogin(firstName + lastName)) as string,
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
      res.redirect(`${process.env.FRONT_HOST}/movies`);
    } catch (err) {
      console.log("error creating / finding google profile", err);
      res.redirect(`http://127.0.0.1:3000`);
    }
  }
}
