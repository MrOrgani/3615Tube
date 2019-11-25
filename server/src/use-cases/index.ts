import { makeUcCreateUser, user } from "./createUser";
import { tubeDb } from "../data-access";

const UcCreateUser = makeUcCreateUser(tubeDb);

const userService = Object.freeze({
  UcCreateUser
});

export { userService, user, UcCreateUser };
