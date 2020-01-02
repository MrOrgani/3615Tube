import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { User } from "../../../entity/User";
import * as bcrypt from "bcryptjs";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    update: createMiddleware(
      verifyAndSetSession,
      async (_: any, args: any, { session }) => {
        // try {
        // console.log("args", args);
        // await SignupSchema.validate(args, { abortEarly: false });
        // } catch (error) {
        // return await formatYupError(error);
        // }
        if (args.password) {
          args.password = await bcrypt.hash(args.password, 10);
        } else args.password = session.user.password;
        User.update({ id: session.user.id }, args);
        session.user = args;
        return null;
      }
    )
  }
};

export { resolvers };