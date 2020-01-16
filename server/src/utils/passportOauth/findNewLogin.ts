import { User } from "../../entity/User";

export const findNewLogin = async (login: string) => {
  let loginTaken = (await User.findOne({
    where: { login }
  })) as User;
  if (loginTaken) {
    let i = 0;
    let newLogin = `${login}${i}`;
    while (
      (await User.findOne({
        where: { login: newLogin }
      })) as User
    )
      i++;
    return newLogin;
  } else return login;
};
