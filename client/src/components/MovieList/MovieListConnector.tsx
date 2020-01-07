import React from "react";

// import { movieList } from "../../test.js";
import MovieListItem from "../MovieListItem/MovieListItem";
import MovieListController from "../../controller/MovieListController";

const MovieListConnector = (props: any) => {
  // console.log("props of MovieList, ", props);
  const { history } = props;

  return (
    <MovieListController>
      {({
        allMovies
        // submit
      }) => <MovieListItem history={history} data={allMovies} />}
    </MovieListController>
  );
};

export default MovieListConnector;
