import React from "react";
// import MyProfileView from "./MyProfileView";
import UserProfileController from "./../../controller/UserProfileController";
import UserProfileView from "./UserProfileView";

const UserProfileConnector = (props: any) => {
  const { history, userLogin } = props;

  const onFinish = () => {
    history.push("/profile");
  };

  return (
    <UserProfileController userLogin={userLogin}>
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
