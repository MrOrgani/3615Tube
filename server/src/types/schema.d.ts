// tslint:disable
// graphql typescript definitions
//GQL2TS plugin

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: "query";
    hello: string;
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
  }

  interface IMutation {
    __typename: "mutation";
    register: boolean | null;
  }

  interface IRegisterOnMutationArguments {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
  }
}

// tslint:enable
