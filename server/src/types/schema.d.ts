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
findOne: IUser | null;
dummy: string;
hello: string;
me: IUser | null;
}

interface IFindOneOnQueryArguments {
id?: string | null;
}

interface IDummyOnQueryArguments {
name?: string | null;
}

interface IHelloOnQueryArguments {
name?: string | null;
}

interface IUser {
__typename: "User";
id: string;
firstName: string;
lastName: string;
login: string;
email: string;
password: string | null;
avatar: string | null;
description: string;
language: string;
}

interface IMutation {
__typename: "Mutation";
sendForgotPasswordEmail: Array<IError> | null;
forgotPasswordChange: Array<IError> | null;
login: Array<IError> | null;
logout: boolean | null;
register: Array<IError> | null;
}

interface ISendForgotPasswordEmailOnMutationArguments {
email: string;
}

interface IForgotPasswordChangeOnMutationArguments {
password: string;
id: string;
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
