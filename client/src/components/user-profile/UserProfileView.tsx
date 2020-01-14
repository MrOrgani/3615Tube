import React, { useContext } from "react";
import { FormikErrors } from "formik";
import MyProfileView from "./MyProfileView";
import image from "../../assets/images/avatar.png";
import UserActivity from "../user-activity/user-activity.component";

import "./user-profile.styles.scss";
import Skeleton from "@material-ui/lab/Skeleton";
import { Avatar } from "@material-ui/core";
import { UserContext } from "../../pages/context";

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

const SkeletonProfile = (
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
);

const UserProfile = ({ userInfo, submit, loading }: Props) => {
  const { pathname } = window.location;
  const [myInfo] = useContext(UserContext) as any;
  const userInfoToDiplay = pathname === "/profile" ? myInfo : userInfo;
  console.log(userInfoToDiplay);

  return (
    <>
      {loading ? (
        SkeletonProfile
      ) : (
        <div className="user-profile-container">
          <div className="avatar-container">
            <Avatar
              alt="MyAvatar"
              src={!userInfoToDiplay.avatar ? image : userInfoToDiplay.avatar}
              sizes="large"
            />
          </div>
          {userInfoToDiplay.firstName} {userInfoToDiplay.lastName} |{" "}
          {userInfoToDiplay.language} | 👤 {userInfoToDiplay.login} | ✉️{" "}
          {userInfoToDiplay.email}
          {pathname === "/profile" && (
            <MyProfileView
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
