import { request } from "graphql-request";

export const loginMutation = (login: string, password: string) => `mutation{
  login(login:"${login}",password:"${password}")
  {path, msg}
}`;
export const loginTest = (login: string, password: string) => {
  // const mutation: string = loginMutation(login, password);
  const wrongMutationLogin: string = `mutation{
  login(login:"AsDf",password:"${password}")
  {path, msg}
}`;
  const wrongMutationPassword: string = `mutation{
  login(login:"${login}",password:"Asdf1**")
  {path, msg}
}`;

  describe("login User", () => {
    // test("login unverified", async () => {
    //   //should not be able to log without verifiying the email
    //   const response = await request(process.env.BACK_HOST, mutation);
    //   expect(response).toEqual({ login: null });
    //   expect(response.login).toHaveLength(1);
    //   expect(response.login[0].path).toEqual("verified");
    //   await User.update({ login }, { verified: true });

    //   const responseOK = await request(process.env.BACK_HOST, mutation);
    //   expect(responseOK).toEqual({ login: null });
    // });

    test("login or password error", async () => {
      //THE BASIC LOGIN TEST IS NOW TESTED DIRECTLY IN ME TEST
      const response2: any = await request(
        process.env.BACK_HOST,
        wrongMutationLogin
      );
      expect(response2.login).toHaveLength(1);
      expect(response2.login[0].path).toEqual("login");
      const response3: any = await request(
        process.env.BACK_HOST,
        wrongMutationPassword
      );
      expect(response3.login).toHaveLength(1);
      expect(response3.login[0].path).toEqual("password");
    });

    test("Yup validation", async () => {
      const res: any = await request(
        process.env.BACK_HOST,
        loginMutation("aasdfaA*", "asdfa1Sdf")
      );
      expect(res.login).toHaveLength(2);
      expect(res.login[0].path).toEqual("login");
      expect(res.login[1].path).toEqual("password");
    });
  });
};
