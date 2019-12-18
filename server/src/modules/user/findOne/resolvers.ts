import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

const resolvers: ResolverMap = {
  Query: {
    findOne: async (_: any, { id }: GQL.IFindOneOnQueryArguments) => {
      const user = await User.findOne({ where: { id: id } });
      return user;
    }
  }
};

export { resolvers };
