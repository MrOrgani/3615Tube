import React from "react";
// import MyProfileView from "./MyProfileView";
import UserProfileController from "./../../controller/UserProfileController";
import UserProfileView from "./UserProfileView";

const UserProfileConnector = (props: any) => {
  // console.log("userProfileConnector, userId : ", props);
  const { history } = props;

  const onFinish = () => {
    history.push(
      "/profile"
      // {
      // message: "check your email to confirm your account"
      // }
    );
  };

  const { userId } = props;
  return (
    <UserProfileController userId={userId}>
      {({ submit, userInfo }) => (
        <UserProfileView
          userInfo={userInfo}
          submit={submit}
          onFinish={onFinish}
        />
      )}
    </UserProfileController>
  );
};

export default UserProfileConnector;
