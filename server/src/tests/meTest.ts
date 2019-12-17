import axios from "axios";
import { loginMutation } from "./loginTest";

const meQuery: string = `query{me{
          login
          firstName
          language
        }}`;

export const meTest = (
  login: string,
  firstName: string,
  language: string,
  password: string
) => {
  describe("me", () => {
    test("can't get user if not logged in", async () => {
      const transport = await axios.create({
        withCredentials: true
      });
      const res = await transport.post(process.env.BACK_HOST, {
        query: meQuery
      });
      expect(res.data.data).toEqual({ me: null });
    });

    test("get current user if logged in", async () => {
      const transport = await axios.create({
        withCredentials: true
      });

      //connect to get the cookies
      const res = await transport.post(process.env.BACK_HOST, {
        query: loginMutation(login, password)
      });

      //set cookies we got from the login in the second request
      const [cookie] = res.headers["set-cookie"];
      transport.defaults.headers.Cookie = cookie;

      //verify we can login using the cookie we set
      const response = await transport.post(process.env.BACK_HOST, {
        query: meQuery
      });
      expect(response.data.data).toEqual({
        me: {
          login,
          firstName,
          language
        }
      });
    });
  });
};
