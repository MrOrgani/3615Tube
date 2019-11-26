export default function makeResolveCreateUser(UcCreateUser: Function) {
  return async function resolveCreateUser(graphArgs: any) {
    try {
      console.log("graphArgs in controller", graphArgs);
      const { ...userInfo } = graphArgs;
      const newPlayer = await UcCreateUser(userInfo);
      console.log("newuser in controller", newPlayer);
      //here maybe some treating to make sure it fits our res requirements
      // ex statusCode, body
      return newPlayer;
    } catch (err) {
      console.log("err in resolveCreateUser", err);
      //   return error res
    }
  };
}