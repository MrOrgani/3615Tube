import { request } from "graphql-request";
import { User } from "../src/entity/User";
import { createConnection } from "typeorm";
import { getConnection } from "typeorm";

function sum(a: number, b: number) {
  return a + b;
}
test("sum", (): void => {
  expect(sum(1, 2)).toBe(3);
});

const firstName: string = "asdf";
const lastName: string = "asdf";
const login: string = "asdf";
const password: string = "Asdf1*";
const email: string = "asdf@gmail.com";
const mutation: string = `mutation{register(firstName:"${firstName}", lastName:"${lastName}", email:"${email}", login:"${login}",password:"${password}")}`;

test("register User", async () => {
  const response = await request("http://localhost:4000", mutation);
  expect(response).toEqual({ register: true });

  await createConnection();
  const users = await User.find({ where: { email } });
  // expect(users).toHaveLength(1);
  const user = users[0];
  console.log(user);
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
  expect(user.verified).toEqual(false);
  // users.delete();
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("email = :email", { email: user.email })
    .execute();
});

//use a test databse
//drop all data on the end of test
// run test on start ?
