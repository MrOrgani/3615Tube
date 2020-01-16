import React from "react";
import UserProfileController from "./../../controller/UserProfileController";
import UserProfileView from "./UserProfileView";

const UserProfileConnector = (props: any) => {
  const {
    match: {
      params: { userId }
    }
  } = props;

  return (
    <UserProfileController userId={userId}>
      {({ userInfo }) => <UserProfileView userInfo={userInfo} />}
    </UserProfileController>
  );
};

export default UserProfileConnector;
