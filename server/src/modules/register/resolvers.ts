import { ResolverMap } from "../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { SignupSchema } from "../../common/yupSchemas/user";
import { User } from "../../entity/User";

const resolvers: ResolverMap = {
  Query: {
    dummy: (_: any, { name }: any) => `${name || "You"} is a dummy`
  },
  Mutation: {
    register: async (_: any, args: GQL.IRegisterOnMutationArguments) => {
      try {
        console.log("args", args);
        await SignupSchema.validate(args, { abortEarly: false });
      } catch (error) {
        console.log("yup error", error.errors);
        // return error;
        return error;
      }

      const { firstName, lastName, login, email, password } = args;
      try {
        const userAlreadyExists = await User.findOne({
          where: { email },
          select: ["id"]
        });
        if (userAlreadyExists) {
          console.log("email already taken, resolver");
          throw Error("user already exists");
        }
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
      } catch (error) {
        console.log("error in register resolver --> ", error);
        return false;
        // return error;
      }
    }
  }
};

export { resolvers };
