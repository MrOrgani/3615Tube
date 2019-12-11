import { loginTest } from "./loginTest";
import { registerTest } from "./registerTest";
import { findOneTest } from "./findOneTest";
// import "jest";

const login: string = "asdf";
const password: string = "Asdf1*";
const firstName: string = "asdf";
const lastName: string = "asdf";
const email: string = "asdf@gmail.com";

describe("sequentially run tests", () => {
  registerTest(login, password, firstName, lastName, email);
  findOneTest(login);
  loginTest(login, password);
});
