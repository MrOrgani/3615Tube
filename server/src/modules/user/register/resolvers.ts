import { ResolverMap } from "../../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { SignupSchema } from "../../../common/yupSchemas/user";
import { User } from "../../../entity/User";
import { formatYupError, formatError } from "../../subModules/formatErrors";
import { v4 } from "uuid";
import { sendMail } from "../../subModules/sendMail";

export const saveUserInDb = async (
  password: string,
  login: string,
  email: string,
  firstName: string,
  lastName: string
) => {
  const hashedPwd = await bcrypt.hash(password, 10);
  const id: string = v4();
  const user = User.create({
    firstName,
    lastName,
    login,
    email,
    password: hashedPwd,
    id
  });
  await user.save();
  return user;
};

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
      const user = (await saveUserInDb(
        password,
        login,
        email,
        firstName,
        lastName
      )) as User;
      sendMail(firstName, email, user.id);
      return null;
    }
  }
};

export { resolvers };
