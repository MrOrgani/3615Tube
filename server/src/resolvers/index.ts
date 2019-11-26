// controller/index takes all the imports from the the inner layers and translates them into
// the resolver && (Query + Mutation TypeDefs) Couple

// --> Data-access and Use-casses do their normal jobs using the entities
// --> Entities are based on the schemas
// --> Application layer is just an endpoint --> they need to match the typeDefs
import { IResolvers } from "graphql-tools";
import { UcCreateUser } from "../use-cases";
import makeResolveCreateUser from "./createUser";

const resolveCreateUser = makeResolveCreateUser(UcCreateUser);

const resolvers: IResolvers = {
  Query: {
    helloWorld: (_: void, args: void): string => {
      return `👋 Hello world! 👋`;
    }
    // users: async () => {
    // //   const usersList = await User.find();
    // //   console.log("userList", usersList);
    // //   return usersList;
    // }
  },
  Mutation: {
    createUser: async (_: void, args: { firstName: string }) => {
      // console.log(args);
      const result = resolveCreateUser(args);
      // console.log(result);
      return result;
    }
  }
};

export default resolvers;
export {};
