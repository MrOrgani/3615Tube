import { createUser, user } from "../user";

function makeAddUser(tubeDb: any) {
  return async function addUser(userInfo: user) {
    const newUser = createUser(userInfo);
    const exists = await tubeDb.findById({ id: newUser.getId() }); // graphql goes here
    if (exists) {
      return exists;
    }

    return tubeDb.insert(newUser);
  };
}

export { makeAddUser, user };
