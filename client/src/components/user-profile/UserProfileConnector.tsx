import React from "react";
import MyProfileView from "./MyProfileView";
import UserProfileController from "./../../controller/UserProfileController";
import UserProfileView from "./UserProfileView";

const UserProfileConnector = (props: any) => {
  const { userId } = props;
  console.log("userProfileConnector, userId : ", userId);
  return (
    <UserProfileController userId={userId}>
      {({ submit, data }) => {
        return !userId ? (
          <MyProfileView userInfo={data} submit={submit} />
        ) : (
          <UserProfileView userInfo={data} />
        );
      }}
    </UserProfileController>
  );
};

export default UserProfileConnector;
