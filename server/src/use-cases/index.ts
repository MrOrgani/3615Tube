import { makeUcCreateUser, User } from "./createUser";
import { tubeDb } from "../data-access";

const UcCreateUser = makeUcCreateUser(tubeDb, User);

const userService = Object.freeze({
  UcCreateUser
});

export { userService, User, UcCreateUser };
