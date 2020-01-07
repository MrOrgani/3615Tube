import React from "react";
import MovieConnector from "../../components/Movie/MovieConnector";

import "./movie.styles.scss";
import { MovieProvider } from "../context";

const MoviePage = (props: any) => {
  const {
    // history,
    match: {
      params: { imdbId }
    }
  } = props;

  // console.log("MoviePage, key of movie :", imdbId);

  return (
    <div className="movie-page">
      <MovieProvider value={imdbId}>
        <MovieConnector />
      </MovieProvider>
    </div>
  );
};

export default MoviePage;
