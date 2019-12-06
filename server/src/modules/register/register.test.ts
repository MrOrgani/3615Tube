import { User } from "../../entity/User";
import { request } from "graphql-request";
import { createConnection } from "typeorm";
import { getConnection } from "typeorm";

const firstName: string = "asdf";
const lastName: string = "asdf";
const login: string = "asdf";
const password: string = "Asdf1*";
const email: string = "asdf@gmail.com";
const mutation: string = `mutation{register(firstName:"${firstName}", lastName:"${lastName}", email:"${email}", login:"${login}",password:"${password}")}`;

test("register User", async () => {
  await createConnection();
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("email = :email", { email: email })
    .execute();
  const response = await request("http://localhost:4000", mutation);
  expect(response).toEqual({ register: true });
});

test("created user, info verif", async () => {
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
  expect(user.verified).toEqual(false);
});
