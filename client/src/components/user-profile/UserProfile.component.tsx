import React from "react";
import { Formik, Form } from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
import { SignupSchema } from "../../common";

import "./user-profile.styles.scss";

const UserProfile = () => {
  return (
    <div className="user-profile-container">
      <h2>Profile Page</h2>
      <span>Upload your info</span>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstName: "",
          lastName: "",
          login: "",
          email: "",
          password: "",
          file: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <FieldInput placeholder="First Name" name="firstName" />
            <FieldInput placeholder="Last Name" name="lastName" />
            <FieldInput placeholder="Login" name="login" />
            <FieldInput placeholder="Email" name="email" />
            <FieldInput placeholder="Password" name="password" />
            <div>
              <CustomButton disabled={isSubmitting} type="submit">
                Modify
              </CustomButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfile;
