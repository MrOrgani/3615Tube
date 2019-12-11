import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";

const resolvers: ResolverMap = {
  Query: {
    findOne: async (_: any, { id }: GQL.IFindOneOnQueryArguments) => {
      console.log("in the resolver findOne", id);
      const user = await User.findOne({ where: { id } });
      return user;
    }
  }
};

export { resolvers };
