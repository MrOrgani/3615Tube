import React from 'react'
import UserProfileView from "./UserProfileView"
import UserProfileController from "./../../controller/UserProfileController"

const UserProfileConnector = () => {
  return (
    <UserProfileController>
      {({ submit, data }) => <UserProfileView userInfo={data} submit={submit} />}
    </UserProfileController>
  );

}

export default UserProfileConnector