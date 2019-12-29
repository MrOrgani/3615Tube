import React from "react";
import MovieListSkeleton from "../movie-list-skeleton/MoviesListSkeleton.component";

import "./user-activity.styles.scss";
import TabsComponent from "../Tabs/TabsComponent";

const UserActivity = (props: any) => {
  const { pathname } = window.location;
  const { userInfo } = props;

  return (
    <div className="user-activty">
      <h2 style={{ color: "white", fontSize: "30px" }}>
        {pathname === "/profile" ? "Your" : `${userInfo.login}'s`} activity
      </h2>
      <TabsComponent
        tabsNames={["Movies seen", "To watch list", "Rated movies"]}
        tabsToRender={[
          <MovieListSkeleton nbOfItem={10} />,
          <MovieListSkeleton />,
          <MovieListSkeleton />
        ]}
      />
    </div>
  );
};

export default UserActivity;
