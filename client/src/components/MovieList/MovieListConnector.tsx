import React, { useState } from "react";

import MovieListView from "./MovieListView";
import MovieListController from "../../controller/MovieListController";
import { MovieListProvider } from "../context";

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

  const [filters, setFilters] = useState({
    page: 0,
    year: [1900, 2020],
    rating: [0, 100],
    genres: "All",
    keywords: "",
    orderKey: "rating",
    orderValue: "DESC"
  });

  return (
    <MovieListProvider value={[filters, setFilters]}>
      <MovieListController>
        {({ allMovies, loadMore }) => (
          <MovieListView
            history={history}
            data={allMovies}
            loadMore={loadMore}
          />
        )}
      </MovieListController>
    </MovieListProvider>
  );
};

export default MovieListConnector;
