import React from "react";
import { FormikErrors } from "formik";
import MyProfileView from "./MyProfileView";
import image from "../../assets/images/avatar.png";
import UserActivity from "../user-activity/user-activity.component";

import "./user-profile.styles.scss";
import Skeleton from "@material-ui/lab/Skeleton";

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
  userInfo?: any;
  userLogin?: any;
}

const UserProfile = ({ userInfo, submit, onFinish }: Props) => {
  const { pathname } = window.location;
  console.log("userInfo: ", userInfo);

  return (
    <>
      {!userInfo ? (
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
      )}
      <UserActivity userInfo={userInfo} />
    </>
  );
};

export default UserProfile;
