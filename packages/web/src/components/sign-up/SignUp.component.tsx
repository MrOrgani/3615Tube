import React from "react";
import {
  Formik,
  Form
  //  FormikErrors, FormikProps
} from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";

import { SignupSchema } from "@3615tube/common";

const SignUp: React.FC = () => {
  return (
    <div className="sign-up">
      <h2>I don't have an account</h2>
      <span>Fill these fields to sign up</span>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstName: "" as string,
          lastName: "" as string,
          login: "" as string,
          email: "" as string,
          password: "" as string,
          file: "" as string
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
