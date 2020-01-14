import React from "react";
// import { useAuth0 } from "../../react-auth0-spa";
import UserProfileConnector from "../../components/user-profile/UserProfileConnector";
// import UserActivy from "../../components/user-activity/user-activity.component";

import "./profile.styles.scss";

const ProfilePage = (props: any) => {
  const {
    history,
    match: {
      params: { id }
    }
  } = props;

  console.log("profile page", id);
  return (
    <div className="profile-page">
      <div className="page-title">Profile Page</div>
      <UserProfileConnector userId={id} history={history} />
    </div>
  );
};

export default ProfilePage;
