import { ResolverMap } from "../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) =>
      `${name || "You"} is a dummy`
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
