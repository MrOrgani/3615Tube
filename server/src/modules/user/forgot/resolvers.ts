import { ResolverMap } from "../../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { PasswordSchema } from "../../../common/yupSchemas/user";
import { User } from "../../../entity/User";
import { formatYupError, formatError } from "../subModules/formatErrors";
import { sendMail } from "../subModules/sendMail";
import jwt from "jsonwebtoken";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    sendForgotPasswordEmail: async (_: any, { email }: { email: string }) => {
      // sendForgotPasswordEmail: async (_: any, args: any) => {
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
      // forgotPasswordChange: async (_: any, args: any) => {
      const { password, id } = args;
      try {
        await PasswordSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return await formatYupError(err, "password");
      }
      try {
        const verifiedId = (jwt.verify(id, process.env.SESSION_SECRET) as any)
          .id;
        const user = await User.findOne({
          where: { id: verifiedId },
          select: ["id"]
        });
        if (!user)
          return await formatError(
            "password",
            "there was an error with your identification"
          );
        const hashedPwd = await bcrypt.hash(password, 10);
        User.update({ id: verifiedId }, { password: hashedPwd });
        return null;
      } catch (err) {
        return await formatError("token", "you do not have a valid token");
      }
    }
  }
};

export { resolvers };
