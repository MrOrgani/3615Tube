// tslint:disable
// graphql typescript definitions

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
__typename: "Query";
hello: string;
dummy: string;
}

interface IHelloOnQueryArguments {
name?: string | null;
}

interface IDummyOnQueryArguments {
name?: string | null;
}

interface IMutation {
__typename: "Mutation";
login: Array<IError> | null;
register: Array<IError> | null;
}

interface ILoginOnMutationArguments {
login: string;
password: string;
}

interface IRegisterOnMutationArguments {
firstName: string;
lastName: string;
login: string;
email: string;
password: string;
}

interface IError {
__typename: "Error";
path: string;
msg: string;
}
}

// tslint:enable
