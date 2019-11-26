import React from "react";
import {
  Formik,
  // FieldAttributes, useField,
  Form
} from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";

import { SignupSchema } from "../../utils/SchemaProfile";

// export const SignupSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "Too Short!")
//     .max(30, "Too Long!")
//     .matches(/^[a-zA-Z-_]+$/, "Only letters!")
//     .required("Required"),
//   lastName: Yup.string()
//     .min(2, "Too Short!")
//     .max(30, "Too Long!")
//     .matches(/^[a-zA-Z-_]+$/, "Only letters!")
//     .required("Required"),
//   login: Yup.string()
//     .min(2, "Too Short!")
//     .max(30, "Too Long!")
//     .matches(/^[a-zA-Z0-9-_]+$/, "Only letters & digits!")
//     .required("Required"),
//   email: Yup.string()
//     .email("Invalid email")
//     .required("Required"),
//   password: Yup.string()
//     .matches(/[0-9]/, "It must contain at least 1 digit")
//     .matches(/[a-z]/, "It must contain at least 1 letter")
//     .matches(/[A-Z]/, "It must contain at least 1 capital letter")
//     .matches(
//       /[§!@#$%^&*()]/,
//       "It must contain one of these chars: '§!@#$%^&*()"
//     )
//     .min(6, "Too Short! Min 6 chars")
//     .required("Required")
// });

const SignUp = () => {
  return (
    <div className="sign-up">
      <h2>I don't have an account</h2>
      <span>Fill these fields to sign up</span>
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
                Submit
              </CustomButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
