import React from "react";
import { Formik, FieldAttributes, useField, Form } from "formik";
import { TextField, Button } from "@material-ui/core";
import { SignupSchema } from "../sign-up/SignUp.component";
import { useAuth0 } from "../../react-auth0-spa";

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

const SignIn = () => {
  const {
    isAuthenticated,
    loginWithRedirect
    // logout
  } = useAuth0();
  console.log(useAuth0());
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your login and password</span>
      <Formik
        validateOnChange={true}
        initialValues={{
          login: "",
          password: ""
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
            <MyTextField placeholder="Login" name="login" />
            <MyTextField placeholder="Password" name="password" />
            <div className="buttons">
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
              {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
