import React from "react";
import MovieController from "../../controller/MovieOneController";
import MovieView from "./MovieOneView";

const MovieOneConnector = () => {
  // console.log("Movie Connector, ", props);

  return (
    <MovieController>
      {({ movieInfo }) => <MovieView movieInfo={movieInfo} />}
    </MovieController>
  );
};

export default MovieOneConnector;