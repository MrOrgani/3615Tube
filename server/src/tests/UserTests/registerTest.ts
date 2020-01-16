import { User } from "../../entity/User";
import { request } from "graphql-request";

export const registerMutation = (
  login: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string
) => `mutation{
  register(firstName:"${firstName}", lastName:"${lastName}", email:"${email}", login:"${login}",password:"${password}")
  {path, msg}
}`;
export const registerTest = (
  login: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  id: string
) => {
  describe("register User", () => {
    test("Create user but only once", async () => {
      const response = await request(
        process.env.BACK_HOST,
        registerMutation(login, password, firstName, lastName, email)
      );
      expect(response).toEqual({ register: null });
      User.update({ email }, { id });
      const response2: any = await request(
        process.env.BACK_HOST,
        registerMutation(login, password, firstName, lastName, email)
      );
      expect(response2.register).toHaveLength(1);
      expect(response2.register[0].path).toEqual("email");
    });

    test("Information validation", async () => {
      const user: User = (await User.findOne({ where: { id } })) as User;
      expect(user.email).toEqual(email);
      expect(user.password).not.toEqual(password);
      expect(user.verified).toEqual(false);
      User.update({ email }, { verified: true });
    });

    test("Yup validation", async () => {
      const res: any = await request(
        process.env.BACK_HOST,
        registerMutation("aasdfaA*", "asdfa1Sdf", "q", lastName, email)
      );
      expect(res.register).toHaveLength(3);
      expect(res.register[0].path).toEqual("firstName");
      expect(res.register[1].path).toEqual("login");
      expect(res.register[2].path).toEqual("password");
    });
  });
};
