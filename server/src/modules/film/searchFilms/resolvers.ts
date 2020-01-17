import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { Film } from "../../../entity/Films";
import { Between, Like, Raw } from "typeorm";
import { genreList } from "../../../common/globals";

const defaultValues: {
  page: number;
  rating: number[];
  year: number[];
  genres: string;
  keywords: string;
  order: Object;
} = {
  rating: [0, 100],
  page: 0,
  year: [0, 2021],
  genres: "all",
  keywords: "",
  order: { rating: "DESC" }
};

// const filterMovies = (a:Film, b:Film, order:any) => {
//   if(Object.keys(order)[0] === "rating")
//    return Object.values(order)[0] === "ASC" ? a.rating - b.rating
// }

//https://stackoverflow.com/questions/50705276/typeorm-postgres-where-any-or-in-with-querybuilder-or-find
const resolvers: ResolverMap = {
  Query: {
    searchFilms: createMiddleware(
      verifyAndSetSession,
      async (_: any, args: GQL.ISearchFilmsOnQueryArguments, { session }) => {
        try {
          if (!args.page || args.page < 0) args.page = defaultValues.page;
          if (!args.year) args.year = defaultValues.year;
          if (!args.rating) args.rating = defaultValues.rating;
          args.keywords = !args.keywords
            ? defaultValues.keywords
            : args.keywords.toLowerCase();
          if (!args.genres || !genreList.includes(args.genres))
            args.genres = defaultValues.genres;
          if (!args.order) args.order = defaultValues.order;
          let result = (await Film.find({
            where: {
              rating: Between(args.rating[0], args.rating[1]),
              year: Between(args.year[0], args.year[1]),
              title: Like(`%${args.keywords}%`),
              genres: Raw(
                alias =>
                  `'${(args.genres as string).toLowerCase()}' = ANY(${alias})`
              )
            },
            order: args.order as any,
            take: 1000
          })) as Film[];
          return result
            .slice(args.page * 50, (args.page + 1) * 50)
            .map((film: Film) => ({
              ...film,
              seen: session.user.seenFilms.includes(film.imdbId) ? true : false
            }));
        } catch (err) {
          console.log("error in the film fetching", err);
          return null;
        }
      }
    )
  }
};

export { resolvers };
