import React from "react";
// import {
// Formik,
// Form,
// Field
// , FormikErrors
// } from "formik";
// import FieldInput from "../FiledInput/FieldInput.component";
// import CustomButton from "../button/button.component";
// import { SignupSchema } from "../../common";

import "./user-profile.styles.scss";
import TextField from "@material-ui/core/TextField";
// import FieldInput from "../FiledInput/FieldInput.component";
import Avatar from "../avatar/avatar.component";

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   login: string;
//   email: string;
//   password: string;
//   avatar?: string;
// }

interface Props {
  // submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  userInfo: any;
  // userId: string;
}

const UserProfile = (props: Props) => {
  const {
    userInfo: { findOne }
  } = props;
  const { pathname } = window.location;

  return (
    <>
      <div
        className="user-profile-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2>Profile Page</h2>
        <Avatar values={findOne} uploadImg={false} />
        <TextField
          value={findOne.firstName}
          disabled={true}
          label={"First Name"}
        />
        <TextField
          value={findOne.lastName}
          disabled={true}
          label={"Last Name"}
        />
        <TextField value={findOne.login} disabled={true} label={"Login"} />
        <TextField value={findOne.email} disabled={true} label={"Email"} />
        {/* <span>Upload your info</span> */}
        {/* <Form style={{ display: "flex", flexDirection: "column" }}> */}
        {/* {JSON.stringify(props.userInfo, null, 2)} */}
      </div>
      <div className="user-activty">
        <h2>
          {pathname === "/profile" ? "Your" : `${findOne.login}'s`} activty
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
