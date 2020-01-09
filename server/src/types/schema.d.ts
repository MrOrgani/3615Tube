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
allCommentary: Array<ICommentary> | null;
findOneFilm: IFilm | null;
searchFilms: Array<IFilm | null> | null;
findOne: IUser | null;
dummy: string;
hello: string;
me: IUser | null;
}

interface IAllCommentaryOnQueryArguments {
imdbId?: string | null;
}

interface IFindOneFilmOnQueryArguments {
imdbId?: string | null;
}

interface ISearchFilmsOnQueryArguments {
page: number;
order?: IOrderInput | null;
rating?: Array<number | null> | null;
year?: Array<number | null> | null;
genres?: string | null;
keywords?: string | null;
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

interface ICommentary {
__typename: "Commentary";
id: string;
film_id: string;
authorId: IUser;
createdAt: string;
text: string;
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

interface IFilm {
__typename: "Film";
imdbId: string | null;
ytsId: string | null;
title: string;
year: number;
synopsis: string;
rating: number;
poster: string;
torrents: Array<string> | null;
genres: Array<string> | null;
}

interface IOrderInput {
rating?: string | null;
year?: string | null;
title?: string | null;
}

interface IMutation {
__typename: "Mutation";
putCommentary: ICommentary | null;
removeCommentary: ICommentary | null;
sendForgotPasswordEmail: Array<IError> | null;
forgotPasswordChange: Array<IError> | null;
login: Array<IError> | null;
logout: boolean | null;
register: Array<IError> | null;
update: Array<IError> | null;
}

interface IPutCommentaryOnMutationArguments {
text: string;
imdbId: string;
}

interface IRemoveCommentaryOnMutationArguments {
id: number;
imdbId: string;
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

interface IUpdateOnMutationArguments {
firstName?: string | null;
lastName?: string | null;
login?: string | null;
email?: string | null;
password?: string | null;
avatar?: string | null;
description?: string | null;
language?: string | null;
}

interface IError {
__typename: "Error";
path: string;
msg: string;
}

interface ITorrent {
__typename: "Torrent";
fileSize: string;
quality: string;
language: string;
peer: number;
seed: number;
url: string;
provider: string;
}
}

// tslint:enable
