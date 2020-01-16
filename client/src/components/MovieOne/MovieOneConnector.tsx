import React from "react";
import MovieController from "../../controller/MovieOneController";
import MovieOneView from "./MovieOneView";
import { MovieProvider } from "../context";

const MovieOneConnector = (props: any) => {
  const {
    match: {
      params: { imdbId }
    }
  } = props;

  return (
    <MovieProvider value={imdbId}>
      <MovieController>
        {({ movieInfo, parsedTorrents }) => (
          <MovieOneView movieInfo={movieInfo} parsedTorrents={parsedTorrents} />
        )}
      </MovieController>
    </MovieProvider>
  );
};

export default MovieOneConnector;
