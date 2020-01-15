import React from "react";
// import MyProfileView from "./MyProfileView";
import UserProfileController from "./../../controller/UserProfileController";
import UserProfileView from "./UserProfileView";

const UserProfileConnector = (props: any) => {
  const { userId } = props;

  return (
    <UserProfileController userId={userId}>
      {({ submit, userInfo }) => (
        <UserProfileView userInfo={userInfo} submit={submit} />
      )}
    </UserProfileController>
  );
};

export default UserProfileConnector;
