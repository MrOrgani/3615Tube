import { createUser, User } from "../user";

function makeUcCreateUser(tubeDb: any) {
  return async function UcCreateUser(userInfo: User) {
    const newUser = createUser(userInfo);
    console.log(tubeDb);
    // const exists = await tubeDb.findById({ id: newUser.getId() });
    // if (exists) {
    //   return exists;
    // }

    return tubeDb.insertUser(newUser);
  };
}

export { makeUcCreateUser, User };
