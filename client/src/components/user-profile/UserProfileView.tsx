import React from "react";
import { FormikErrors } from "formik";
import MyProfileView from "./MyProfileView";
import image from "../../assets/images/avatar.png";
import UserActivity from "../user-activity/user-activity.component";

import "./user-profile.styles.scss";
import Skeleton from "@material-ui/lab/Skeleton";
import { Avatar } from "@material-ui/core";

interface FormValues {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  avatar?: string;
}

interface Props {
  submit?: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  // onFinish?: () => void;
  userInfo?: any;
  userLogin?: any;
  loading?: boolean;
}

const UserProfile = ({ userInfo, submit, loading }: Props) => {
  // console.log("userinfo UserProfile, ", userInfo);
  const { pathname } = window.location;

  return (
    <>
      {loading ? (
        <div className="user-profile-container">
          <Skeleton
            variant="circle"
            width={50}
            height={50}
            style={{ margin: "0 5px" }}
          />
          <Skeleton
            variant="text"
            height={10}
            width={"5em"}
            style={{ margin: "0 5px" }}
          />{" "}
          <Skeleton
            variant="text"
            height={10}
            width={"5em"}
            style={{ margin: "0 5px" }}
          />{" "}
          | 👤{" "}
          <Skeleton
            variant="text"
            height={10}
            width={"5em"}
            style={{ margin: "0 5px" }}
          />{" "}
          | ✉️{" "}
          <Skeleton
            variant="text"
            height={10}
            width={"5em"}
            style={{ margin: "0 5px" }}
          />
        </div>
      ) : (
        <div className="user-profile-container">
          <div className="avatar-container">
            <Avatar
              alt="MyAvatar"
              src={!userInfo.avatar ? image : userInfo.avatar}
              sizes="large"
            />
          </div>
          {userInfo.firstName} {userInfo.lastName} | {userInfo.language} | 👤{" "}
          {userInfo.login} | ✉️ {userInfo.email}
          {pathname === "/profile" && (
            <MyProfileView
              userInfo={userInfo}
              submit={submit}
              // onFinish={onFinish}
            />
          )}
        </div>
      )}
      <UserActivity userInfo={userInfo} />
    </>
  );
};

export default UserProfile;
