import React from "react";
// import MovieListSkeleton from "../MovieListSkeleton/MoviesListSkeleton.component";
import MovieListItem from "../MovieListItem/MovieListItem";

import "./user-activity.styles.scss";
import TabsComponent from "../Tabs/TabsComponent";

const UserActivity = (props: any) => {
  const { pathname } = window.location;
  const { userInfo } = props;
  return (
    <div className="user-activty">
      <h2 style={{ color: "white", fontSize: "30px" }}>
        {pathname === "/profile"
          ? "Your activity"
          : `${userInfo ? `${userInfo.login}'s activity` : "Loading..."} `}
      </h2>
      <TabsComponent
        tabsNames={["Movies seen", "To watch list", "Rated movies"]}
        tabsToRender={[
          // ADD LOADING TO RENDER SKELETON
          <MovieListItem loading />,
          <MovieListItem loading />,
          <MovieListItem loading />
        ]}
      />
    </div>
  );
};

export default UserActivity;
