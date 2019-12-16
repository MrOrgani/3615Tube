import { loginTest } from "./loginTest";
import { registerTest } from "./registerTest";
import { findOneTest } from "./findOneTest";
// import { meTest } from "./meTest";

const login: string = "asdf";
const password: string = "Asdf1*";
const firstName: string = "asdf";
const lastName: string = "asdf";
const email: string = "gopilo6835@mail3tech.com";
const language: string = "English";

describe("sequentially run tests", () => {
  registerTest(login, password, firstName, lastName, email);
  loginTest(login, password);
  // meTest(login, firstName, language, password);
  findOneTest(login, firstName, language);
});
