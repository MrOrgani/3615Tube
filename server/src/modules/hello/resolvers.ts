import { ResolverMap } from "../../types/graphql-utils";

const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  }
};

export { resolvers };
