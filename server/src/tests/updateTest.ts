import request from "graphql-request";
import { User } from "../entity/User";
import { AxiosInstance } from "axios";
import { loginAndTest } from "./loginAndTest";

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
  password: string,
  newLogin: string,
  newFirstName: string,
  newLanguage: string,
  email: string
  //   avatar: string,
  //   description: string
) => {
  describe("update Test", () => {
    test("basic update", async () => {
      const basicUpdateTest = async function(
        login: string,
        transport: AxiosInstance
      ) {
        const response = (await transport.post(process.env.BACK_HOST, {
          query: updateMutation(newLogin, newFirstName, newLanguage)
        })) as any;
        // const response = await request(
        //   process.env.BACK_HOST,
        //   updateMutation(login, firstName, language)
        // );
        console.log("in update test, response after update = ", response);
        expect(response.data.data.update).toEqual(null);
        const user: User = (await User.findOne({ where: { email } })) as User;
        console.log("in the update test: returned user", user);
        expect(user.language).toEqual(newLanguage);
        expect(user.login).toEqual(login);
        expect(user.firstName).toEqual(newFirstName);
      };
      loginAndTest(login, password, basicUpdateTest);
    });

    // test("login + me + logout + me", async () => {});
    //   });
  });
};
