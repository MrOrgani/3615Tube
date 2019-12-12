import React from 'react'
import UserProfileView from "./UserProfileView"
import UserProfileController from "./../../controller/UserProfileController"

const UserProfileConnector: React.FC = () => {
  return (
    <UserProfileController>
      {({ submit }) => <UserProfileView submit={submit} />}
    </UserProfileController>
  );

}

export default UserProfileConnector