import React from "react";
import MovieController from "../../controller/MovieOneController";
import MovieOneView from "./MovieOneView";

const MovieOneConnector = () => {
  // console.log("Movie Connector, ", props);

  return (
    <MovieController>
      {({ movieInfo }) => <MovieOneView movieInfo={movieInfo} />}
    </MovieController>
  );
};

export default MovieOneConnector;
