import { ResolverMap } from "../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { SignupSchema } from "../../common/yupSchemas/user";
import { User } from "../../entity/User";
import { createConfirmEmaiLink } from "../../utils/createConfirmEmailLink";
import { formatYupError, formatError } from "../../utils/formatErrors";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    register: async (_: any, args: any) => {
      // console.log("in the register resolver", args);
      try {
        console.log("args", args);
        await SignupSchema.validate(args, { abortEarly: false });
      } catch (error) {
        return await formatYupError(error);
      }

      const { firstName, lastName, login, email, password } = args;
      try {
        const userAlreadyExists = await User.findOne({
          where: { email },
          select: ["id"]
        });
        if (userAlreadyExists)
          return await formatError("email", "email is already taken");
        const hashedPwd = await bcrypt.hash(password, 10);
        const confirmLink = await createConfirmEmaiLink();
        const user = User.create({
          firstName,
          lastName,
          login,
          email,
          password: hashedPwd,
          confirmLink
        });
        await user.save();
        return null;
      } catch (error) {
        console.log("error in register resolver --> ", error);
        return false;
        // return error;
      }
    }
  }
};

export { resolvers };
