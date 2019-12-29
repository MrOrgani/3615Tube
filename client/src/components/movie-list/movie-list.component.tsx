import React from "react";

import { movieList } from "../../test.js";

// import MovieListBase from "../../components/Movie/List";
import MovieListSkeleton from "../movie-list-skeleton/MoviesListSkeleton.component";
// import * as movieList from "../../test.json";

const MovieList = () => {
  //   On execute la query pour fetch de la data
  //    const { error, data: { movies = {} }, loading } = useQuery(getMovies)

  //       if (error) {
  //         return <p>Error :(</p>;
  //       }

  //       if (loading) {
  return <MovieListSkeleton data={movieList} />;
  //       }

  // return <MovieListBase movies={fromJS(movies.items)} limit={20} />;
  //     }}
  //   </Query>
};

export default MovieList;
