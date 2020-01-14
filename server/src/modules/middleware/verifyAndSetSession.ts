import { Resolver } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { formatError } from "../user/subModules/formatErrors";

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  //middleware
  const { session } = context;
  // console.log("context in the middleware", parent, args, info);
  // console.log(info.returnType);
  // console.log(
  //   "in verify and setSession of type",
  //   info.fieldName,
  //   "the session is : ",
  //   session,
  //   session.userId
  // );
  if (!context.session.userId) {
    console.log("we lack a cookie here", info.returnType);
    if (info.returnType.name || info.returnType.ofType.name === "Film")
      return null;
    else if (info.returnType.ofType.ofType.name === "Error")
      return formatError("cookie", "no session cookie was detected");
    else if (info.returnType.constructor.name === "GraphQLList") return [];
  }
  const user = await User.findOne({ where: { id: session.userId } });
  if (user) session.user = user;
  else return null;

  const result = await resolver(parent, args, context, info);
  // console.log("result from resolver", result);

  //afterware
  return result;
};
