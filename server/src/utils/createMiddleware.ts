import { Resolver, middleware } from "../types/graphql-utils";

export const createMiddleware = (
  middlewareFunc: middleware,
  resolverFunc: Resolver
) => (parent: any, args: any, context: any, info: any) =>
  middlewareFunc(resolverFunc, parent, args, context, info);
