import React from "react";
import MovieConnector from "../../components/Movie/MovieConnector";

import "./movie.styles.scss";

const MoviePage = (props: any) => {
  const {
    // history,
    match: {
      params: { key }
    }
  } = props;

  return (
    <div className="movie-page">
      <MovieConnector
        movieId={key}
        //   history={history}
      />
    </div>
  );
};

export default MoviePage;
