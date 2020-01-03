import React from "react";
// import { useAuth0 } from "../../react-auth0-spa";
import UserProfileConnector from "../../components/user-profile/UserProfileConnector";
// import UserActivy from "../../components/user-activity/user-activity.component";

import "./profile.styles.scss";

const ProfilePage = (props: any) => {
  const {
    history,
    match: {
      params: { login }
    }
  } = props;

  // console.log("profile page", login);
  return (
    <div className="profile-page">
      <div className="page-title">Profile Page</div>
      <UserProfileConnector userLogin={login} history={history} />
    </div>
  );
};

export default ProfilePage;
