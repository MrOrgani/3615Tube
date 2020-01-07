import React from "react";
import MovieController from "./../../controller/MovieController";
import MovieView from "./MovieView";

const MovieConnector = () => {
  // console.log("Movie Connector, ", props);

  return (
    <MovieController>
      {({ movieInfo }) => <MovieView movieInfo={movieInfo} />}
    </MovieController>
  );
};

export default MovieConnector;
