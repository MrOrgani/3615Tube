// import Request from "express";

export interface Session {
  userId?: string;
}

export type Resolver = (
  parent: any,
  args: any,
  context: {
    session: Session;
  },
  info: any
) => any;

export type middleware = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: {
    session: Session;
  },
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
