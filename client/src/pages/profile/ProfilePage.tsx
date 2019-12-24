import React from "react";
// import { useAuth0 } from "../../react-auth0-spa";
import UserProfileConnector from "../../components/user-profile/UserProfileConnector";
// import UserActivy from "../../components/user-activity/user-activity.component";

import "./profile.styles.scss";

const ProfilePage = (props: any) => {
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
  const {
    match: {
      params: { key }
    }
  } = props;

  console.log("profile page", props);
  return (
    <div className="profile-page">
      <UserProfileConnector userId={key} />
      {/* <UserActivy /> */}
    </div>
  );
};

export default ProfilePage;
