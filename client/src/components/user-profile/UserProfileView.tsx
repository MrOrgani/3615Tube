import React from "react";
import { FormikErrors } from "formik";

import "./user-profile.styles.scss";
// import TextField from "@material-ui/core/TextField";
import MyProfileView from "./MyProfileView";
import image from "../../assets/images/avatar.png";
import UserActivity from "../user-activity/user-activity.component";

interface FormValues {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  avatar?: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  onFinish: () => void;
  userInfo: any;
  // userId: string;
}

const UserProfile = (props: Props) => {
  const { userInfo, submit, onFinish } = props;
  // console.log("user view", props, userInfo);
  const { pathname } = window.location;

  return (
    <>
      <div className="user-profile-container">
        <div className="avatar-container">
          <img
            src={!userInfo.avatar ? image : userInfo.avatar}
            className="image"
            alt="avatar"
          />
        </div>
        {userInfo.firstName} {userInfo.lastName} | 👤 {userInfo.login} | ✉️{" "}
        {userInfo.email}
        {pathname === "/profile" && (
          <MyProfileView
            userInfo={userInfo}
            submit={submit}
            onFinish={onFinish}
          />
        )}
      </div>
      <UserActivity />
    </>
  );
};

export default UserProfile;
