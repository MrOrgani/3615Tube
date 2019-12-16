import { loginTest } from "./loginTest";
import { registerTest } from "./registerTest";
import { findOneTest } from "./findOneTest";
// import { meTest } from "./meTest";

const login: string = "asdf";
const password: string = "Asdf1*";
const firstName: string = "asdf";
const lastName: string = "asdf";
const email: string = "raxije2580@tmail2.com";
const language: string = "English";

describe("sequentially run tests", () => {
  registerTest(login, password, firstName, lastName, email);
  loginTest(login, password);
  // meTest(login, firstName, language, password);
  findOneTest(login, firstName, language);
});
