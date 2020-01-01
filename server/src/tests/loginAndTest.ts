import axios from "axios";
import { loginMutation } from "./loginTest";
import { logOutQuery } from "./meTest";

export const loginAndTest = async function name(
  login: string,
  password: string,
  function2Test: Function
  // loggedOut = false
) {
  const transport = await axios.create({ withCredentials: true });
  let res = await transport.post(process.env.BACK_HOST, {
    query: loginMutation(login, password)
  });
  //set cookies we got from the login in the second request
  let [cookie] = res.headers["set-cookie"];
  // console.log("cookie in login and test", cookie);
  transport.defaults.headers.Cookie = cookie;

  // !loggedOut && axios.post(process.env.BACK_HOST, { query: logOutQuery });
  //ME QUERY verify we can login using the cookie we set
  // if (!loggedOut) console.log("no need to log me out");
  await function2Test(transport);
};
