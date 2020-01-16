import { Response } from "express";
import { User } from "../../entity/User";
import { saveUserInDb } from "../../modules/user/register/resolvers";
import { findNewLogin } from "./findNewLogin";

export async function passport42Success(req: any, res: Response) {
  if (req.user) {
    const {
      id,
      email,
      login,
      first_name,
      last_name,
      image_url
    } = req.user._json;
    try {
      if (!id) throw "token expired";
      if (!req.session) throw "session Issue with your request";
      let registeredUser = (await User.findOne({
        where: [{ id42: parseInt(id) }, { email }]
      })) as User;
      if (!registeredUser) {
        registeredUser = (await saveUserInDb(
          "",
          (await findNewLogin(login)) as string,
          email,
          first_name,
          last_name
        )) as User;
        User.update(
          { id: registeredUser.id },
          { verified: true, avatar: image_url, id42: id }
        );
      }
      req.session.userId = registeredUser.id;
      res.redirect(`${process.env.FRONT_HOST}/movies`);
    } catch (err) {
      console.log("error creating / finding 42 profile", err);
      res.redirect(`http://127.0.0.1:3000`);
    }
  }
}
