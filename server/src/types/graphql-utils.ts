import { User } from "../entity/User";

export interface Session extends Express.Session {
  userId?: string;
  cookie: any;
  user: User;
}

export type Resolver = (
  parent: any,
  args: any,
  context: {
    session: Session;
    req: any;
  },
  info: any
) => any;

export type middleware = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: {
    session: Session;
    req: any;
  },
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
