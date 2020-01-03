import React from "react";
// import MovieController from "./../../controller/MovieController";
import MovieView from "./MovieView";

const MovieConnector = (props: any) => {
  // console.log("Movie Connector, ", props);
  return (
    // <MovieController movieId={movieId}>
    //   {({ movieInfo }) => (
    <MovieView
    //   movieInfo={movieInfo}
    />
    //   )}
    // </MovieController>
  );
};

export default MovieConnector;
