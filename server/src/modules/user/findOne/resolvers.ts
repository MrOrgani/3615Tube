import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";

const resolvers: ResolverMap = {
  Query: {
    findOne: createMiddleware(
      verifyAndSetSession,
      async (_: any, { id }: { id: string }) => {
        const user = (await User.findOne({ where: { id: id } })) as User;
        if (!user) return null;
        delete user.password && delete user.email;
        return user;
      }
    )
  }
};

export { resolvers };
