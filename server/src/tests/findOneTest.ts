// import { request } from "graphql-request";
// import { User } from "../entity/User";

// export const findOneTest = (
//   login: string,
//   firstName: string,
//   language: string
// ) => {
//   describe("findOne", () => {
//     test("finding One user by Id", async () => {
//       const users = await User.find({ login });
//       const user = users[0];
//       const mutation: string = `query{findOne(id:"${user.id}"){
//         login
//         firstName
//         language
//       }}`;
//       const response = await request(process.env.BACK_HOST, mutation);
//       // console.log("response in findOnetest", response);
//       expect(response).toEqual({
//         findOne: { login, firstName, language }
//       });
//     });
//   });
// };

// import { request } from "graphql-request";
// import { setSessionAndTest } from "./setSessionAndTest";
// import { AxiosInstance } from "axios";

// const findOneMutation = (id: string, parameter: string) => `
// query{
//   findOne (id:"${id}")
// {login
//   firstName
//   language
// }}`;

// export const findOneTest = (
//   login: string,
//   password: string,
//   firstName: string,
//   language: string,
//   id: string
// ) => {
//   const mutation: string = `query{findOne(id:"${id}"){
//     login
//     firstName
//     language
//   }}`;
//   describe("findOne", () => {
//     test("finding One user by Id", () => {
//       const findOneTest = async (transport: AxiosInstance) => {
//         let response = await request(process.env.BACK_HOST, mutation);
//         // console.log(findOneMutation(id, ""));
//         expect(response).toEqual({
//           findOne: { login, firstName, language }
//         });
//         // response = await transport.post(
//         //   process.env.BACK_HOST,
//         //   await findOneMutation(id, "password")
//         // );
//         // // console.log(response.data.data);
//         // expect(response.data.data.findOne).toEqual(null);
//       };
//       setSessionAndTest(login, password, findOneTest);
//     });
//   });
// };
