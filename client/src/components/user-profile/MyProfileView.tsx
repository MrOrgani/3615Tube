import React from "react";
import { Formik, Form, Field, FormikErrors } from "formik";
import CustomButton from "../button/button.component";
import { SignupSchema } from "../../common";

import "./user-profile.styles.scss";
import FieldInput from "../FiledInput/FieldInput.component";
import Avatar from "../avatar/avatar.component";
import { Link } from "react-router-dom";

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
  userInfo?: any;
  userId?: string;
}

const UserProfile = (props: Props) => {
  const {
    userInfo: { me }
  } = props;

  return (
    <>
      <div className="user-profile-container">
        <h2>Profile Page</h2>
        <span>Upload your info</span>
        <Formik
          initialValues={me}
          onSubmit={async (values, actions) => {
            const errors = await props.submit(values);
            if (errors) {
              actions.setErrors(errors);
            }
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={SignupSchema}
        >
          {({ values, handleSubmit, isSubmitting, setFieldValue }) => {
            return (
              <Form style={{ display: "flex", flexDirection: "column" }}>
                <Link to="/logout">Logout</Link>
                <Avatar
                  values={values}
                  setFieldValue={setFieldValue}
                  uploadImg={true}
                />
                <Field
                  name="firstName"
                  label="First name"
                  type="text"
                  component={FieldInput}
                  placeholder="First Name"
                />
                <Field
                  name="lastName"
                  label="Last name"
                  type="text"
                  placeholder="Last Name"
                  component={FieldInput}
                />
                <Field
                  name="login"
                  label="Login"
                  type="text"
                  placeholder="Login"
                  component={FieldInput}
                />
                <Field
                  name="email"
                  email="Email"
                  type="text"
                  placeholder="Email"
                  component={FieldInput}
                />
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  component={FieldInput}
                />
                <div>
                  <CustomButton
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading ..." : "Modify"}
                  </CustomButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="user-activty">
        <h2>{"Your activty"}</h2>
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
