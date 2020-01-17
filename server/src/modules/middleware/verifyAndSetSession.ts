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
  const { session, res } = context;
  res.header("Cache-Control", "no-cache, private");
  console.log("context.session", session);
  if (!session.userId) {
    if (info.returnType.name || info.returnType.ofType.name === "Film") {
      console.log("return error");
      return null;
    } else if (info.returnType.ofType.ofType.name === "Error")
      return formatError("cookie", "no session cookie was detected");
    else if (info.returnType.constructor.name === "GraphQLList") return [];
  }
  const user = await User.findOne({
    where: { id: session.userId, verified: true }
  });
  if (user) session.user = user;
  else return null;

  const result = await resolver(parent, args, context, info);

  //afterware
  return result;
};
