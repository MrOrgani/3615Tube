import { ResolverMap } from "../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { SignupSchema } from "../../common/yupSchemas/user";
import { User } from "../../entity/User";
import { formatYupError, formatError } from "../../utils/formatErrors";
import { v4 } from "uuid";
import { sendMail } from "../../subModules/confirmEmail";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    register: async (_: any, args: GQL.IRegisterOnMutationArguments) => {
      // register: async (_: any, args: any) => {
      // console.log("in the register resolver", args);
      try {
        // console.log("args", args);
        await SignupSchema.validate(args, { abortEarly: false });
      } catch (error) {
        return await formatYupError(error);
      }

      const { firstName, lastName, login, email, password } = args;
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });
      if (userAlreadyExists) {
        // console.log("not creating the user");
        return await formatError("email", "email is already taken");
      }
      const hashedPwd = await bcrypt.hash(password, 10);
      const id = v4();
      const user = User.create({
        firstName,
        lastName,
        login,
        email,
        password: hashedPwd,
        id
      });
      console.log("sending a mail", await sendMail(email, id));
      await user.save();
      return null;
    }
  }
};

export { resolvers };
