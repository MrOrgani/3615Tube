const makeTubeDb = ({ makeDb, userModel }: any) => {
  async function insertUser(newUserInfo: User) {
    // const firstName = await (() => )newUserInfo.getFirstName();
    const db = await makeDb();
    // console.log("makeDb alias la db", db);
    // const userModel = await db.model("User", { firstName: String }); // pas a sa place devrait arriver avec index.ts
    const newUser = new userModel(newUserInfo);
    await newUser.save();
    // console.log("newUser", newUser);
    return newUser;
    // console.log(result);
    // const result = await db
    //   .collection("comments")
    //   .insertOne({ _id, ...commentInfo });
    // const { _id: id, ...insertedInfo } = result.ops[0];
    // return result;
  }
  return Object.freeze({
    insertUser
  });
};

export { makeTubeDb };
