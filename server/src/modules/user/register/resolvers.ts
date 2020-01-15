import { ResolverMap } from "../../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { SignupSchema } from "../../../common/yupSchemas/user";
import { User } from "../../../entity/User";
import { formatYupError, formatError } from "../subModules/formatErrors";
import { v4 } from "uuid";
import { sendMail } from "../subModules/sendMail";

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
      try {
        await SignupSchema.validate(args, { abortEarly: false });
      } catch (error) {
        return await formatYupError(error);
      }
      const { firstName, lastName, login, email, password } = args;
      if (
        await User.findOne({
          where: { email: email.toLowerCase() },
          select: ["id"]
        })
      )
        return await formatError("email", "email is already taken");
      else if (
        await User.findOne({
          where: { login: login.toLowerCase() },
          select: ["id"]
        })
      )
        return await formatError("login", "login is already taken");
      const user = (await saveUserInDb(
        password,
        login.toLowerCase(),
        email.toLowerCase(),
        firstName,
        lastName
      )) as User;
      sendMail(firstName, email, user.id);
      return null;
    }
  }
};

export { resolvers };
