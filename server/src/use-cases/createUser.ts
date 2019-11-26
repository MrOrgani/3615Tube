// import { createUser, User } from "../user";

function makeUcCreateUser(tubeDb: any) {
  return async function UcCreateUser(userInfo: any) {
    const newUser: User = createUser(userInfo);
    console.log("in useCases, newUser, return of createUser", newUser);
    // const exists = await tubeDb.findById({ id: newUser.getId() });
    // if (exists) {
    //   return exists;
    // }

    return tubeDb.insertUser(newUser);
  };
}

export { makeUcCreateUser, User };
