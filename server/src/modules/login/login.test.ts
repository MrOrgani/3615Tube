import { request } from "graphql-request";
// import { createConnection } from "typeorm";
import { rmTestUser } from "../../utils/rmUser";

const login: string = "asdf";
const password: string = "Asdf1*";
const mutation: string = `mutation{
  login(login:"${login}",password:"${password}")
  {path, msg}
}`;
const wrongMutationLogin: string = `mutation{
  login(login:"AsDf",password:"${password}")
  {path, msg}
}`;
const wrongMutationPassword: string = `mutation{
  login(login:"${login}",password:"Asdf1**")
  {path, msg}
}`;

describe("login User", () => {
  test("login user", async () => {
    // await createConnection();
    console.log(process.env.BACK_HOST);
    const response = await request(process.env.BACK_HOST, mutation);
    expect(response).toEqual({ login: null });
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
    await rmTestUser(login);
  });

  //   test("Information validation", async () => {
  //     const users = await User.find({ where: { email } });
  //     expect(users).toHaveLength(1);
  //     const user = users[0];
  //     expect(user.email).toEqual(email);
  //     expect(user.password).not.toEqual(password);
  //     expect(user.verified).toEqual(false);
  //   });
});
