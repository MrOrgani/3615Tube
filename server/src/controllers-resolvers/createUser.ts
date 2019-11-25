export default function makeResolveCreateUser(UcCreateUser: Function) {
  return async function resolveCreateUser(graphArgs: any) {
    try {
      console.log("graphArgs", graphArgs);
      const { ...userInfo } = graphArgs;
      const newPlayer = await UcCreateUser(userInfo);
      //here maybe some treating to make sure it fits our res requirements
      // ex statusCode, body
      return newPlayer;
    } catch (err) {
      console.log("err in resolveCreateUser", err);
      //   return error res
    }
  };
}
