import React from "react";
import MovieList from "../../components/MovieList/movie-list.component";

// import "./homepage.styles.scss";

const MoviesPage = (props: any) => {
  // console.log("Movies Page Props, ", props);
  const { history } = props;
  return (
    <div className="homepage">
      {/* This is the Homepage */}
      <MovieList history={history} />
    </div>
  );
};

export default MoviesPage;
