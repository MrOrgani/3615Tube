import React from "react";
import MovieListSkeleton from "../../components/movie-list-skeleton/MoviesListSkeleton.component";

const UserActivity = () => {
  const { pathname } = window.location;
  return (
    <div className="user-activty">
      <h2>{pathname === "/profile" ? "Your" : `${pathname}'s`} activty</h2>
      <div>
        Movies seen
        <MovieListSkeleton />
      </div>
      <div>
        To watch list
        <MovieListSkeleton />
      </div>
      <div>
        Rated movies
        <MovieListSkeleton />
      </div>
    </div>
  );
};

export default UserActivity;
