import axios from "axios";
import { request } from "graphql-request";
import { loginMutation } from "./loginTest";

export const meTest = (
  login: string,
  firstName: string,
  language: string,
  password: string
) => {
  describe("me", () => {
    //     test("can't get user if not logged in", async () => {});
    test("get current user", async () => {
      //firstConnect to get the cookie we want (axios does it better than graphql-request)
      const meMutation: string = `query{me{
          id
          login
          firstName
          language
        }}`;
      const data = await axios.post(
        process.env.BACK_HOST,
        {
          query: loginMutation(login, password)
        },
        {
          withCredentials: true
        }
      );
      const user = data.data.data;
      console.log("in the me test received data from login: ", user);
      const response = await axios.post(
        process.env.BACK_HOST,
        {
          query: meMutation
        },
        {
          withCredentials: true
        }
      );
      expect(response.data.data).toEqual({
        me: {
          id: user.id,
          login,
          firstName,
          language
        }
      });
    });
  });
};
