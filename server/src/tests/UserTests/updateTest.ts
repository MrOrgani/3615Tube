import { User } from "../../entity/User";
import axios, { AxiosInstance } from "axios";
import { setSessionAndTest } from "../setSessionAndTest";

const updateMutation: any = (firstName: string, language: string) => `mutation{
    update(firstName:"${firstName}", language:"${language}")
    {path, msg}
  }`;

export const updateTest = (
  login: string,
  password: string,
  newFirstName: string,
  newLanguage: string,
  email: string
  //   avatar: string,
  //   description: string
) => {
  describe("update Test", () => {
    test("update not being connected", async () => {
      const response = (await axios.post(process.env.BACK_HOST, {
        query: updateMutation(newFirstName, newLanguage)
      })) as any;
      expect(response.data.data.update[0].path).toEqual("cookie");
    });
    test("basic update", async () => {
      const basicUpdateTest = async function(transport: AxiosInstance) {
        const response = (await transport.post(process.env.BACK_HOST, {
          query: updateMutation(newFirstName, newLanguage)
        })) as any;
        // const response = await request(
        //   process.env.BACK_HOST,
        //   updateMutation(login, firstName, language)
        // );
        // await console.log("in update test, response after update = ", response);
        expect(response.data.data.update).toEqual(null);
        const user: User = (await User.findOne({ where: { email } })) as User;
        expect(user.language).toEqual(newLanguage);
        expect(user.firstName).toEqual(newFirstName);
      };
      await setSessionAndTest(login, password, basicUpdateTest);
    });
  });
};
