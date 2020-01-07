import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { User } from "../../../entity/User";
import * as bcrypt from "bcryptjs";
import { PasswordSchema, ProfileSchema } from "../../../common";
import { formatYupError, formatError } from "../subModules/formatErrors";
import { pictureSecurtiy } from "../subModules/pictureSecurity";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    update: createMiddleware(
      verifyAndSetSession,
      async (_: any, args: any, { session }) => {
        try {
          // console.log("args", args);
          await ProfileSchema.validate(args, { abortEarly: false });
        } catch (error) {
          return await formatYupError(error);
        }
        if (args.password) {
          // try {
          //   await PasswordSchema.validate(args, { abortEarly: false });
          // } catch (error) {
          //   return await formatYupError(error);
          // }
          args.password = await bcrypt.hash(args.password, 10);
        }
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
