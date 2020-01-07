import React from "react";
import MovieListConnector from "../../components/MovieList/MovieListConnector";

const MoviesPage = (props: any) => {
  // console.log("Movies Page Props, ", props);
  const { history } = props;
  return (
    <div className="homepage">
      {/* This is the Homepage */}
      <MovieListConnector history={history} />
    </div>
  );
};

export default MoviesPage;
