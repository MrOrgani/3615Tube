import React from "react";
// import MovieListSkeleton from "../movie-list-skeleton/MoviesListSkeleton.component";

import "./user-activity.styles.scss";

const UserActivity = () => {
  const { pathname } = window.location;
  return (
    <div className="user-activty">
      <h2>{pathname === "/profile" ? "Your" : `${pathname}'s`} activty</h2>
      <div className="movie-list">
        Movies seen
        {/* <MovieListSkeleton /> */}
      </div>
      <div className="movie-list">
        To watch list
        {/* <MovieListSkeleton /> */}
      </div>
      <div className="movie-list">
        Rated movies
        {/* <MovieListSkeleton /> */}
      </div>
    </div>
  );
};

export default UserActivity;
