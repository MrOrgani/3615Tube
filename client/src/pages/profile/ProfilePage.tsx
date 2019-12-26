import React from "react";
// import { useAuth0 } from "../../react-auth0-spa";
import UserProfileConnector from "../../components/user-profile/UserProfileConnector";
// import UserActivy from "../../components/user-activity/user-activity.component";

import "./profile.styles.scss";

const ProfilePage = (props: any) => {
  console.log("profile page", props);

  const {
    history,
    match: {
      params: { key }
    }
  } = props;

  return (
    <div className="profile-page">
      <UserProfileConnector userId={key} history={history} />
    </div>
  );
};

export default ProfilePage;
