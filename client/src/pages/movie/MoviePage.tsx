import React from "react";
import MovieConnector from "../../components/Movie/MovieConnector";

import "./movie.styles.scss";
import { MovieProvider } from "../context";

const MoviePage = (props: any) => {
  const {
    // history,
    match: {
      params: { key }
    }
  } = props;

  return (
    <div className="movie-page">
      <MovieProvider value={key ? key : null}>
        <MovieConnector
        // movieId={key}
        //   history={history}
        />
      </MovieProvider>
    </div>
  );
};

export default MoviePage;
