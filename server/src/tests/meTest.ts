import axios, { AxiosInstance } from "axios";
import request from "graphql-request";
import { setSessionAndTest } from "./setSessionAndTest";

export const meQuery: string = `
query{
me{
  login
  firstName
  language
}}`;

export const logOutQuery: string = `
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
      //LOG INconnect to get the cookies
      const testMeLogOutMe = async function(transport: AxiosInstance) {
        //ARE YOU LOGGED IN PROPERLY
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

        // LOG OUT
        const response2 = await transport.post(process.env.BACK_HOST, {
          query: logOutQuery
        });
        expect(response2.data.data).toEqual({ logout: true });

        //RETRY ME
        const response3 = await transport.post(process.env.BACK_HOST, {
          query: meQuery
        });
        expect(response3.data.data).toEqual({ me: null });
      };
      await setSessionAndTest(login, password, testMeLogOutMe, false);
    });
  });
};
