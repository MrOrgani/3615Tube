import { request } from "graphql-request";

const findOneMutation = (id: string, parameter: string) => `
query{
  findOne (id:"${id}")
{login
  firstName
  language
}}`;

export const findOneTest = (id: string) => {
  describe("findOne", () => {
    test("can't find a user if not logged in", () => {
      const findOneTest = async () => {
        let response = await request(
          process.env.BACK_HOST,
          findOneMutation(id, "")
        );
        expect(response).toEqual({
          findOne: null
        });
      };
      findOneTest();
    });
  });
};
