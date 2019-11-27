import { ResolverMap } from "./types/graphql-utils";

// import { IResolvers } from "graphql-yoga";
// import { GraphQLBoolean } from "graphql";

const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  },
  Mutation: {
    register: (_: any, { firstName }: GQL.IRegisterOnMutationArguments) => {
      return firstName;
    }
  }
};

export { resolvers };
