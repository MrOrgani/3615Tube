import React from "react";
// import MovieListSkeleton from "../MovieListSkeleton/MoviesListSkeleton.component";
// import MovieListView from "../MovieList/MovieListView";

import "./user-activity.styles.scss";
// import TabsComponent from "../Tabs/TabsComponent";

const UserActivity = ({ userInfo }: any) => {
  const { pathname } = window.location;

  return (
    <div className="user-activty">
      <h2 style={{ color: "white", fontSize: "30px" }}>
        {pathname === "/profile"
          ? "Your activity"
          : `${userInfo ? `${userInfo.login}'s activity` : "Loading..."} `}
      </h2>
      {/* <TabsComponent
        tabsNames={["Movies seen", "To watch list", "Rated movies"]}
        tabsToRender={[
          // ADD LOADING TO RENDER SKELETON
          <MovieListView loading />,
          <MovieListView loading />,
          <MovieListView loading />
        ]}
      /> */}
    </div>
  );
};

export default UserActivity;
