import { Resolver, middleware } from "../types/graphql-utils";

//good way to create middlewares in graphql
export const createMiddleware = (
  middlewareFunc: middleware,
  resolverFunc: Resolver
) => (parent: any, args: any, context: any, info: any) =>
  middlewareFunc(resolverFunc, parent, args, context, info);
