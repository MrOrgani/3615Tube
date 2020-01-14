import React from "react";

import MovieListView from "./MovieListView";
import MovieListController from "../../controller/MovieListController";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
  history?: any;
  filterList?: any;
  loadMore?: () => void;
}

const MovieListConnector = (props: MediaProps) => {
  const { history } = props;

  return (
    <MovieListController>
      {({
        allMovies,
        filterList,
        loadMore
        // submit
      }) => (
        <MovieListView
          history={history}
          data={allMovies}
          filterList={filterList}
          loadMore={loadMore}
        />
      )}
    </MovieListController>
  );
};

export default MovieListConnector;
