import React from "react";
import { Field, Formik, FormikErrors } from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
import { SignupSchema } from "../../common";

import "./register.scss";
import { Link } from "react-router-dom";

interface FormValues {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  file?: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  onFinish: () => void;
}

export default (props: Props) => {
  return (
    <div className="sign-up">
      <h2>I don't have an account</h2>
      <span>Fill these fields to sign up</span>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          login: "",
          email: "",
          password: ""
          // avatar: "",
        }}
        onSubmit={async (values, actions) => {
          const errors = await props.submit(values);
          if (errors) {
            actions.setErrors(errors);
          } else {
            props.onFinish();
          }
        }}
        validationSchema={SignupSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Field
              name="firstName"
              type="text"
              component={FieldInput}
              placeholder="First Name"
            />
            <Field
              name="lastName"
              type="text"
              placeholder="Last Name"
              component={FieldInput}
            />
            <Field
              name="login"
              type="text"
              placeholder="Login"
              component={FieldInput}
            />
            <Field
              name="email"
              type="text"
              placeholder="Email"
              component={FieldInput}
            />
            <Field
              name="password"
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
                {isSubmitting ? "Loading ..." : "Sign Up!"}
              </CustomButton>
            </div>
            Or <Link to="/login">Login</Link>
            <span></span>
          </div>
        )}
      </Formik>
    </div>
  );
};
