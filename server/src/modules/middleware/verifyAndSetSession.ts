import { Resolver } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { formatError } from "../subModules/formatErrors";

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
  // console.log(info.returnType.name);
  // console.log(
  //   "in verify and setSession of type",
  //   info.fieldName,
  //   "the session is : ",
  //   session,
  //   session.userId
  // );
  if (!context.session.userId) {
    // console.log("we lack a cookie here", info.fieldName, info.returnType.name);
    if (info.returnType.name) return null;
    else return formatError("cookie", "no session cookie was detected");
  }
  const user = await User.findOne({ where: { id: session.userId } });
  if (user) session.user = user;
  // console.log("session . user = ", session.user);

  const result = await resolver(parent, args, context, info);
  // console.log("result from resolver", result);

  //afterware
  return result;
};
