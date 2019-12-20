import request from "graphql-request";
import { User } from "../entity/User";

const updateMutation: any = (
  login: string,
  firstName: string,
  language: string
) => `mutation{
    update(firstName:"${firstName}", language:"${language}", login:"${login}")
    {path, msg}
  }`;

export const updateTest = (
  login: string,
  email: string,
  firstName: string,
  //   password: string,
  language: string
  //   avatar: string,
  //   description: string
) => {
  describe("update Test", () => {
    test("basic update", async () => {
      const response = await request(
        process.env.BACK_HOST,
        updateMutation(login, firstName, language)
      );
      expect(response.update).toEqual(null);
      const user: User = (await User.findOne({ where: { email } })) as User;
      console.log(user);
      expect(user.language).toEqual(language);
      expect(user.login).toEqual(login);
      expect(user.firstName).toEqual(firstName);
    });

    // test("login + me + logout + me", async () => {});
    //   });
  });
};
