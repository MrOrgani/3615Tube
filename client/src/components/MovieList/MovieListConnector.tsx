import React from "react";

import MovieListView from "./MovieListView";
import MovieListController from "../../controller/MovieListController";

const MovieListConnector = (props: any) => {
  const { history } = props;

  return (
    <MovieListController>
      {({
        allMovies,
        filterList
        // submit
      }) => (
        <MovieListView
          history={history}
          data={allMovies}
          filterList={filterList}
        />
      )}
    </MovieListController>
  );
};

export default MovieListConnector;
