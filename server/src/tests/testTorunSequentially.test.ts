import { loginTest } from "./UserTests/loginTest";
import { registerTest } from "./UserTests/registerTest";
import { findOneTest } from "./UserTests/findOneTest";
import { meTest } from "./UserTests/meTest";
import { forgotTest } from "./UserTests/forgotTest";
import { updateTest } from "./UserTests/updateTest";
import { createConnection } from "typeorm";
import { rmTestUser } from "../modules/user/subModules/rmUser";
import { findOneFilmTest } from "./FilmTests/findOneFilmTest";

const login: string = "asdf";
const password: string = "Asdf1*";
const newPassword = "AAsdf1*";
const firstName: string = "asdf";
const newFirstName: string = "sdfg";
const lastName: string = "asdf";
const email: string = "jonex43795@mail3.top";
const language: string = "en";
const newLanguage: string = "es";
const id: string = "71c14b08-2d11-4f8c-ba0c-5a2739bdf762";
const avatar: string = "asdf";
const imdbId: string = "tt6751668";

beforeAll(async () => {
  try {
    await createConnection();
    rmTestUser(login);
  } catch (err) {
    console.log("linking to db ERROR --> ", err);
  }
});

describe("user Creation, modification and query", () => {
  registerTest(login, password, firstName, lastName, email, id);
  loginTest(login, password);
  meTest(login, firstName, language, password);
  findOneTest(login);
  updateTest(
    login,
    password,
    newFirstName,
    newLanguage,
    email,
    avatar,
    lastName
  );
  forgotTest(password, newPassword, email, id);
});

afterAll(() => {
  rmTestUser(login);
});
