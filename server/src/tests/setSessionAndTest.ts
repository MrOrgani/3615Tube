import axios from "axios";
import { loginMutation } from "./loginTest";
import { logOutQuery } from "./meTest";

export const setSessionAndTest = async function name(
  login: string,
  password: string,
  function2Test: Function,
  logOutAfterTest = true
) {
  try {
    const transport = await axios.create({ withCredentials: true });
    let res = await transport.post(process.env.BACK_HOST, {
      query: loginMutation(login, password)
    });
    //set cookies we got from the login in the second request
    let [cookie] = res.headers["set-cookie"];
    // console.log("cookie in login and test", cookie);
    transport.defaults.headers.Cookie = cookie;

    //ME QUERY verify we can login using the cookie we set
    await function2Test(transport);
    logOutAfterTest &&
      transport.post(process.env.BACK_HOST, { query: logOutQuery });
  } catch (e) {
    console.log(e);
  }
};
