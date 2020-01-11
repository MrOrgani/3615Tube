import React from "react";
import MovieListConnector from "../../components/MovieList/MovieListConnector";
import "./movies.styles.scss";
import { MovieListProvider } from "../context";

const MoviesPage = (props: any) => {
  const { history } = props;

  const filters = {
    page: 0,
    year: [1900, 2020],
    rating: [0, 100],
    genres: "All",
    keywords: "",
    orderKey: "rating",
    orderValue: "DESC"
  };

  return (
    <div className="moviesPage">
      <MovieListProvider value={filters}>
        <MovieListConnector history={history} />
      </MovieListProvider>
    </div>
  );
};

export default MoviesPage;
