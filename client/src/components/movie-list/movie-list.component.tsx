import React from "react";

import { movieList } from "../../test.js";

// import MovieListBase from "../../components/Movie/List";
import MovieListSkeleton from "../movie-list-skeleton/MoviesListSkeleton.component";
// import * as movieList from "../../test.json";

const MovieList = (props: any) => {
  const { history } = props;

  //   On execute la query pour fetch de la data
  //    const { error, data: { movies = {} }, loading } = useQuery(getMovies)

  //       if (error) {
  //         return <p>Error :(</p>;
  //       }

  //       if (loading) {
  return <MovieListSkeleton history={history} data={movieList} />;
  //       }

  // return <MovieListBase movies={fromJS(movies.items)} limit={20} />;
  //     }}
  //   </Query>
};

export default MovieList;
