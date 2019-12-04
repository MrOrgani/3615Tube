// function sum(a, b) {
//   return a + b;
// }
// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });

// import startServer from "./index.ts";

const mutation = `mutation {
    register(
  firstName: "asdf"
  lastName: "asdf"
  login: "asdf"
  email: "asdf@gmail.com"
  password: "Asdf1*"
  ): Boolean
  }`;
const host = "http://192.168.99.100:4000/";

test("register User", async () => {
  // await startServer();
  import { request } from "graphql-request";
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
});
