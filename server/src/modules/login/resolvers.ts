import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { formatError } from "../../utils/formatErrors";
import * as bcrypt from "bcryptjs";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    login: async (_: any, args: GQL.ILoginOnMutationArguments) => {
      // login: async (_: any, args: any) => {
      // console.log("in the login resolver", args);
      // try {
      //   await SignupSchema.validate(args, { abortEarly: false });
      // } catch (error) {
      //   return await formatYupError(error);
      // }
      const { login, password } = args;
      const user = await User.findOne({ where: { login } });
      if (!user)
        return await formatError("login", "no such login in the database");
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return await formatError("password", "wrong password");
      return null;
    }
  }
};

export { resolvers };
