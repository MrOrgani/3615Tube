import { ResolverMap } from "../../types/graphql-utils";

const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: GQL.IHelloOnQueryArguments) => {
      console.log(name);
      return `Hello ${name || "World"}`;
    }
  }
};

export { resolvers };
