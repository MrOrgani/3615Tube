import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { User } from "../../../entity/User";
import * as bcrypt from "bcryptjs";
import { ProfileSchema, languageList } from "../../../common";
import { formatYupError, formatError } from "../subModules/formatErrors";
import { Not } from "typeorm";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    update: createMiddleware(
      verifyAndSetSession,
      async (_: any, args: any, { session }) => {
        // console.log("in update", args);
        if (!args.password && args.password.length == 0) {
          delete args.password;
        }
        try {
          await ProfileSchema.validate(args, { abortEarly: false });
        } catch (error) {
          return await formatYupError(error);
        }
        const { login, email } = args;
        if (
          await User.findOne({
            where: { email: email.toLowerCase(), id: Not(session.user.id) }
          })
        )
          return await formatError("email", "email is already taken");
        else if (
          await User.findOne({
            where: { login: login.toLowerCase(), id: Not(session.user.id) }
          })
        )
          return await formatError("login", "login is already taken");
        else if (args.language && !languageList.includes(args.language))
          return await formatError(
            "language",
            "this language is not available"
          );

        if (args.password) args.password = await bcrypt.hash(args.password, 10);
        // if (args.avatar && !(await pictureSecurtiy(args.avatar)))
        //   return await formatError(
        //     "picture",
        //     "image must be of type png or jpeg for real"
        //   );
        User.update({ id: session.user.id }, args);
        session.user = args;
        return null;
      }
    )
  }
};

export { resolvers };
