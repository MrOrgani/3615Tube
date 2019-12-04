import React from "react";
// import { useAuth0 } from "../../react-auth0-spa";
import UserProfile from "../../components/user-profile/UserProfile.component";
import UserActivy from "../../components/user-activity/user-activity.component";

import "./profile.styles.scss";

const Profile = () => {
  // const { loading, user } = useAuth0();

  // if (loading || !user) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <Fragment>
  //     <img src={user.picture} alt="Profile" />

  //     <h2>{user.name}</h2>
  //     <p>{user.email}</p>
  //     <code>{JSON.stringify(user, null, 2)}</code>
  //   </Fragment>
  // );

  return (
    <div className="profile-page">
      <UserProfile />
      <UserActivy />
    </div>
  );
};

export default Profile;
