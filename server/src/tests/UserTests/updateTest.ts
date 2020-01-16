import { User } from "../../entity/User";
import axios, { AxiosInstance } from "axios";
import { setSessionAndTest } from "../setSessionAndTest";

const updateMutation: any = (
  firstName: string,
  language: string,
  login: string,
  email: string,
  avatar: string,
  lastName: string
) => `mutation{
    update(firstName:"${firstName}", language:"${language}", login:"${login}",email:"${email}",avatar:"${avatar}", lastName:"${lastName}")
    {path, msg}
  }`;

export const updateTest = (
  login: string,
  password: string,
  newFirstName: string,
  newLanguage: string,
  email: string,
  avatar: string,
  lastName: string
) => {
  describe("update Test", () => {
    test("update not being connected", async () => {
      const response = (await axios.post(process.env.BACK_HOST, {
        query: updateMutation(
          newFirstName,
          newLanguage,
          login,
          email,
          avatar,
          lastName
        )
      })) as any;
      expect(response.data.data.update[0].path).toEqual("cookie");
    });
    test("basic update", async () => {
      const basicUpdateTest = async function(transport: AxiosInstance) {
        const response = (await transport.post(process.env.BACK_HOST, {
          query: updateMutation(
            newFirstName,
            newLanguage,
            login,
            email,
            avatar,
            lastName
          )
        })) as any;
        const user: User = (await User.findOne({ where: { email } })) as User;
        expect(response.data.data.update).toEqual(null);
        expect(user.language).toEqual(newLanguage);
        expect(user.firstName).toEqual(newFirstName);
      };
      await setSessionAndTest(login, password, basicUpdateTest);
    });
    test("Yup error", async () => {
      const basicUpdateTest = async function(transport: AxiosInstance) {
        const response = (await transport.post(process.env.BACK_HOST, {
          query: updateMutation(
            newFirstName,
            newLanguage,
            login,
            email,
            "",
            lastName
          )
        })) as any;
        expect(response.data.data.update[0].path).toEqual("avatar");
      };
      await setSessionAndTest(login, password, basicUpdateTest);
    });
  });
};
