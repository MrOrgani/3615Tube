import React from "react";
import { Formik, FieldAttributes, useField, Form } from "formik";
import { TextField, Button } from "@material-ui/core";
import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .matches(/^[a-zA-Z-_]+$/, "Only letters!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .matches(/^[a-zA-Z-_]+$/, "Only letters!")
    .required("Required"),
  login: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .matches(/^[a-zA-Z0-9-_]+$/, "Only letters & digits!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .matches(/[0-9]/, "It must contain at least 1 digit")
    .matches(/[a-z]/, "It must contain at least 1 letter")
    .matches(/[A-Z]/, "It must contain at least 1 capital letter")
    .matches(
      /[§!@#$%^&*()]/,
      "It must contain one of these chars: '§!@#$%^&*()"
    )
    .min(6, "Too Short! Min 6 chars")
    .required("Required")
});

const initialValues = {
  firstName: "",
  lastName: "",
  login: "",
  email: "",
  password: "",
  file: ""
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div>
      <TextField
        placeholder={placeholder}
        {...field}
        helperText={errorText}
        error={!!errorText}
        type={placeholder === "Password" ? "password" : ""}
        autoComplete={placeholder === "Password" ? "on" : ""}
      />
    </div>
  );
};

const SignUp = () => {
  return (
    <div className="sign-up">
      <h2>I don't have an account</h2>
      <span>Fill these fields to sign up</span>
      <Formik
        validateOnChange={true}
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            {/* <input accept="image/*" id="raised-button-file" type="file" />
            <label htmlFor="raised-button-file">
              <Button component="span">Upload</Button>
            </label> */}
            <MyTextField placeholder="First Name" name="firstName" />
            <MyTextField placeholder="Last Name" name="lastName" />
            <MyTextField placeholder="Login" name="login" />
            <MyTextField placeholder="Email" name="email" />
            <MyTextField placeholder="Password" name="password" />
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
