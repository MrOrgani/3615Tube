import { Resolver } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  //middleware
  const { session } = context;
  if (!session.userId) return null;
  const user = await User.findOne({ where: { id: session.userId } });
  if (user) session.user = user;
  const result = await resolver(parent, args, context, info);

  //afterware

  return result;
};
