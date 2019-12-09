import { ResolverMap } from "../../types/graphql-utils";

const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: any) => `Hello ${name || "World"}`
  }
};

export { resolvers };
