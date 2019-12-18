import { User } from "../entity/User";
import { request } from "graphql-request";
import Mail = require("nodemailer/lib/mailer");

export const registerTest = (
  login: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  id: string
) => {
  const mutation: string = `mutation{
  register(firstName:"${firstName}", lastName:"${lastName}", email:"${email}", login:"${login}",password:"${password}")
  {path, msg}
}`;

  describe("register User", () => {
    test("Create user", async () => {
      // console.log(mutation);
      const response = await request(process.env.BACK_HOST, mutation);
      expect(response).toEqual({ register: null });
      User.update({ email }, { id });
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
    });
  });
};
