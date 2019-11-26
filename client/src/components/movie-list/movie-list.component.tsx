import React from "react";
// import { fromJS } from "immutable";

import { Query } from "react-apollo";

// import MovieListBase from "../../components/Movie/List";
// import { MOVIES } from "../../graphql/queries";
import MovieListSkeleton from "../../components/movie-list-skeleton/MoviesListSkeleton.component";

const MovieList = () => {
  //   <Query query={MOVIES} variables={{ page: 1 }}>
  //     {({ error, data: { movies = {} }, loading }) => {
  //       if (error) {
  //         return <p>Error :(</p>;
  //       }

  //       if (loading) {
  return <MovieListSkeleton />;
  //       }

  //       if (!movies.items) {
  //         return "";
  //       }

  //       return <MovieListBase movies={fromJS(movies.items)} limit={20} />;
  //     }}
  //   </Query>
};

export default MovieList;
