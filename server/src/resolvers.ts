import { ResolverMap } from "./types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { User } from "./entity/User";

// import { IResolvers } from "graphql-yoga";
// import { GraphQLBoolean } from "graphql";

const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  },
  Mutation: {
    register: async (
      _: any,
      {
        firstName,
        lastName,
        login,
        email,
        password
      }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPwd = await bcrypt.hash(password, 10);
      const user = User.create({
        firstName,
        lastName,
        login,
        email,
        password: hashedPwd,
        verified: false
      });
      await user.save();
      return true;
    }
  }
};

export { resolvers };
