import { request } from "graphql-request";
import { User } from "../entity/User";

export const findOneTest = (
  login: string,
  firstName: string,
  language: string
) => {
  describe("findOne", () => {
    test("finding One user by Id", async () => {
      const users = await User.find({ login });
      const user = users[0];
      const mutation: string = `query{findOne(id:"${user.id}"){
        login
        firstName
        language
      }}`;
      const response = await request(process.env.BACK_HOST, mutation);
      // console.log("response in findOnetest", response);
      expect(response).toEqual({
        findOne: { login, firstName, language }
      });
    });
  });
};
