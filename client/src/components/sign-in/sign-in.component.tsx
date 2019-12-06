import React from "react";
import {
  Formik,
  // FieldAttributes, useField,
  Form
} from "formik";
// import { TextField, Button } from "@material-ui/core";
import { SignupSchema } from "../../common";
// import { useAuth0 } from "../../react-auth0-spa";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";

const SignIn = () => {
  // const {
  //   isAuthenticated,
  //   loginWithRedirect
  //   // logout
  // } = useAuth0();
  // console.log(useAuth0());
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your login and password</span>
      <Formik
        validateOnChange={true}
        initialValues={{
          login: "" as string,
          password: "" as string
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
            <FieldInput placeholder="Login" name="login" />
            <FieldInput placeholder="Password" name="password" />
            <div className="buttons">
              <CustomButton disabled={isSubmitting} type="submit">
                Submit
              </CustomButton>
              {/* {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
              )} */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
