import { ResolverMap } from "../../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { PasswordSchema } from "../../../common/yupSchemas/user";
import { User } from "../../../entity/User";
import { formatYupError, formatError } from "../subModules/formatErrors";
import { sendMail } from "../subModules/sendMail";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    sendForgotPasswordEmail: async (
      _: any,
      args: GQL.ISendForgotPasswordEmailOnMutationArguments
    ) => {
      // sendForgotPasswordEmail: async (_: any, args: any) => {
      // console.log(args);
      const { email } = args;
      const user = await User.findOne({
        where: { email }
      });
      if (user === undefined)
        return await formatError("email", "email does not exist");
      sendMail(user.firstName, email, user.id, false);
      return null;
    },
    forgotPasswordChange: async (
      _: any,
      args: GQL.IForgotPasswordChangeOnMutationArguments
    ) => {
      const { password, id } = args;
      try {
        await PasswordSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return await formatYupError(err, "password");
      }
      const user = await User.findOne({
        where: { id },
        select: ["id"]
      });
      if (!user)
        return await formatError(
          "id",
          "there was an error with your identification"
        );
      const hashedPwd = await bcrypt.hash(password, 10);
      User.update({ id }, { password: hashedPwd });
      return null;
    }
  }
};

export { resolvers };
