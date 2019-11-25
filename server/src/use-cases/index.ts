import { makeAddUser, user } from "./addUser";
import { tubeDb } from "../data-access";

const addUser = makeAddUser(tubeDb);

const userService = Object.freeze({
  addUser
});

export { userService, user };
