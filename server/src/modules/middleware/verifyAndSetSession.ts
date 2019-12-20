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
  if (!session.userId) {
    if (info.returnType.name !== "Error") return null;
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
