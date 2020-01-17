import { User } from "../../entity/User";
import { request } from "graphql-request";
import jwt from "jsonwebtoken";
const sendForgotMutation = (email: string) => `mutation{
  sendForgotPasswordEmail(email:"${email}")
  {
    path
    msg
  }
}`;

const changeForgotMutation = (password: string, id: string) => `mutation{
  forgotPasswordChange(password:"${password}", id:"${id}")
  {
    path
    msg
  }
}`;

export const forgotTest = async (
  password: string,
  newPassword: string,
  email: string,
  id: string
) => {
  const token = jwt.sign({ id }, "alsjdvnewe");
  describe("forgot password", () => {
    test("send forgot password mail", async () => {
      const response = await request(
        process.env.BACK_HOST,
        sendForgotMutation(email)
      );
      expect(response).toEqual({ sendForgotPasswordEmail: null });
      const response2 = await request(
        process.env.BACK_HOST,
        sendForgotMutation("caca@gmail.com")
      );
      expect(response2.sendForgotPasswordEmail).toHaveLength(1);
      expect(response2.sendForgotPasswordEmail[0].path).toEqual("email");
    });

    test("change password ", async () => {
      let response = await request(
        process.env.BACK_HOST,
        changeForgotMutation(newPassword, token)
      );
      expect(response).toEqual({ forgotPasswordChange: null });
      expect(newPassword).not.toEqual(password);
    });

    test("Yup validation", async () => {
      const user: User = (await User.findOne({ where: { email } })) as User;
      let response = await request(
        process.env.BACK_HOST,
        changeForgotMutation("asdf1*", token)
      );
      expect(response.forgotPasswordChange[0].path).toEqual("password");
      expect(user.password).not.toEqual("asdf1*");
    });
  });
};
