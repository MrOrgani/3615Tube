import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { formatError } from "../subModules/formatErrors";
import { SignInSchema } from "../../../common/yupSchemas/user";
import { formatYupError } from "../subModules/formatErrors";
import * as bcrypt from "bcryptjs";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    login: async (_: any, args: GQL.ILoginOnMutationArguments, { session }) => {
      // login: async (_: any, args: any, { session }) => {
      const { login, password } = args;
      try {
        await SignInSchema.validate(args, { abortEarly: false });
      } catch (error) {
        return await formatYupError(error);
      }
      const user = await User.findOne({ login: login.toLowerCase() });
      if (!user)
        return await formatError("login", "no such login in the database");
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return await formatError("password", "wrong password");
      else if (!user.verified)
        return await formatError(
          "login",
          "you must verify your account before you can login"
        );
      //LOGIN SUCCESSFULL
      session.userId = user.id;
      return null;
    }
  }
};

export { resolvers };
