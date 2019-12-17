import axios from "axios";
import { loginMutation } from "./loginTest";
import request from "graphql-request";

const meQuery: string = `
query{
me{
  login
  firstName
  language
}}`;

const logOutQuery: string = `
mutation{
  logout
}
`;

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

    test("login + me + logout + me", async () => {
      const transport = await axios.create({ withCredentials: true });

      //LOG INconnect to get the cookies
      let res = await transport.post(process.env.BACK_HOST, {
        query: loginMutation(login, password)
      });
      //set cookies we got from the login in the second request
      let [cookie] = res.headers["set-cookie"];
      transport.defaults.headers.Cookie = cookie;

      //ME QUERY verify we can login using the cookie we set
      let response = await transport.post(process.env.BACK_HOST, {
        query: meQuery
      });
      expect(response.data.data).toEqual({
        me: {
          login,
          firstName,
          language
        }
      });

      //LOG OUT
      const response2 = await request(process.env.BACK_HOST, logOutQuery);
      expect(response2).toEqual({ logout: true });

      //RETRY ME
      response = await axios.post(process.env.BACK_HOST, {
        query: meQuery
      });
      expect(response.data.data).toEqual({ me: null });
    });
  });
};
