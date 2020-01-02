import { loginTest } from "./loginTest";
import { registerTest } from "./registerTest";
import { findOneTest } from "./findOneTest";
import { meTest } from "./meTest";
import { forgotTest } from "./forgotTest";
import { updateTest } from "./updateTest";
import { createConnection } from "typeorm";
import { rmTestUser } from "../modules/subModules/rmUser";
// import { User } from "../entity/User";

const login: string = "asdf";
const password: string = "Asdf1*";
const newPassword = "AAsdf1*";
const firstName: string = "asdf";
const newFirstName: string = "sdfg";
const lastName: string = "asdf";
const email: string = "jonex43795@mail3.top";
const language: string = "English";
const newLanguage: string = "Spanish";
const id: string = "71c14b08-2d11-4f8c-ba0c-5a2739bdf762";

beforeAll(async () => {
  try {
    await createConnection();
    rmTestUser(login);
  } catch (err) {
    console.log("initializing db ERROR --> ", err);
  }
});

describe("sequentially run tests", () => {
  registerTest(login, password, firstName, lastName, email, id);
  // loginTest(login, password);
  meTest(login, firstName, language, password);
  // findOneTest(login, firstName, language);
  // updateTest(login, password, newFirstName, newLanguage, email);
  // forgotTest(password, newPassword, email, id);
});

afterAll(() => {
  rmTestUser(login);
});
