import React from "react";

import { movieList } from "../../test.js";

import MovieListItem from "../MovieListItem/MovieListItem";
// import MovieListSkeleton from "../movie-list-skeleton/MoviesListSkeleton.component";
// import * as movieList from "../../test.json";

const MovieList = (props: any) => {
  const { history } = props;

  //   On execute la query pour fetch de la data
  //    const { error, data: { movies = {} }, loading } = useQuery(getMovies)

  //       if (error) {
  //         return <p>Error :(</p>;
  //       }

  const data = movieList;

  if (
    //   // loading ||
    !data
  )
    return <MovieListItem loading />;

  return <MovieListItem history={history} data={movieList} />;
};

export default MovieList;
