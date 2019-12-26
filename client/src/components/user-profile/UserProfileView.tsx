import React from "react";
import { FormikErrors } from "formik";

import "./user-profile.styles.scss";
import TextField from "@material-ui/core/TextField";
import FutureModale from "./FutureModale";
import image from "../../assets/images/avatar.png";

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
  console.log("user view", props, userInfo);
  const { pathname } = window.location;

  return (
    <>
      <div
        className="user-profile-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2>Profile Page</h2>
        {pathname === "/profile" && (
          <FutureModale
            userInfo={userInfo}
            submit={submit}
            onFinish={onFinish}
          />
        )}
        <div className="avatar-container">
          <img
            src={!userInfo.avatar ? image : userInfo.avatar}
            className="image"
            alt="avatar"
          />
        </div>
        <TextField
          value={userInfo.firstName}
          disabled={true}
          label={"First Name"}
        />
        <TextField
          value={userInfo.lastName}
          disabled={true}
          label={"Last Name"}
        />
        <TextField value={userInfo.login} disabled={true} label={"Login"} />
        <TextField value={userInfo.email} disabled={true} label={"Email"} />
        {/* <span>Upload your info</span> */}
        {/* <Form style={{ display: "flex", flexDirection: "column" }}> */}
        {/* {JSON.stringify(props.userInfo, null, 2)} */}
      </div>
      <div className="user-activty">
        <h2>
          {pathname === "/profile" ? "Your" : `${userInfo.login}'s`} activty
        </h2>
        <div className="movie-list">
          Movies seen
          {/* <MovieListSkeleton /> */}
        </div>
        <div className="movie-list">
          To watch list
          {/* <MovieListSkeleton /> */}
        </div>
        <div className="movie-list">
          Rated movies
          {/* <MovieListSkeleton /> */}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
