import { User } from "../entity/User";
import { request } from "graphql-request";
import { createConnection } from "typeorm";
import { rmTestUser } from "../utils/rmUser";

export const registerTest = (
  login: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string
) => {
  const mutation: string = `mutation{
  register(firstName:"${firstName}", lastName:"${lastName}", email:"${email}", login:"${login}",password:"${password}")
  {path, msg}
}`;

  describe("register User", () => {
    test("Create user", async () => {
      await createConnection();
      await rmTestUser(login);
      // console.log(mutation);
      const response = await request(process.env.BACK_HOST, mutation);
      expect(response).toEqual({ register: null });
      const response2: any = await request(process.env.BACK_HOST, mutation);
      expect(response2.register).toHaveLength(1);
      expect(response2.register[0].path).toEqual("email");
    });

    test("Information validation", async () => {
      const users = await User.find({ where: { email } });
      expect(users).toHaveLength(1);
      const user = users[0];
      expect(user.email).toEqual(email);
      expect(user.password).not.toEqual(password);
      expect(user.verified).toEqual(false);
      // await rmTestUser(); // commented it to make it work with login test
    });
  });
};
