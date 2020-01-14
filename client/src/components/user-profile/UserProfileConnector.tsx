import React from "react";
// import MyProfileView from "./MyProfileView";
import UserProfileController from "./../../controller/UserProfileController";
import UserProfileView from "./UserProfileView";

const UserProfileConnector = (props: any) => {
  const { userId } = props;

  // const onFinish = () => {
  //   history.push("/profile");
  // };

  return (
    <UserProfileController userId={userId}>
      {({ submit, userInfo }) => (
        <UserProfileView
          userInfo={userInfo}
          submit={submit}
          // onFinish={onFinish}
        />
      )}
    </UserProfileController>
  );
};

export default UserProfileConnector;
