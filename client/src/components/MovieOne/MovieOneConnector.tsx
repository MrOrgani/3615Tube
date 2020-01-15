import React from "react";
import MovieController from "../../controller/MovieOneController";
import MovieOneView from "./MovieOneView";

const MovieOneConnector = (props: any) => {
  const {
    match: {
      params: { imdbId }
    }
  } = props;

  return (
    <MovieController imdbId={imdbId}>
      {({ movieInfo }) => <MovieOneView movieInfo={movieInfo} />}
    </MovieController>
  );
};

export default MovieOneConnector;
