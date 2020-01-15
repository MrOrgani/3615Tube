import React from "react";
import MovieOneConnector from "../../components/MovieOne/MovieOneConnector";

import "./movie.styles.scss";
import { MovieProvider } from "../../components/context";

const MoviePage = (props: any) => {
  const {
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    // DELETE,
    match: {
      params: { imdbId }
    }
  } = props;

  // console.log("MoviePage, key of movie :", imdbId);

  return (
    <div className="movie-page">
      <MovieProvider value={imdbId}>
        <MovieOneConnector />
      </MovieProvider>
    </div>
  );
};

export default MoviePage;
