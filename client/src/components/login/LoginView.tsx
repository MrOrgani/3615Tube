import React from "react";
import { Field, Formik, FormikErrors } from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
import { SignInSchema } from "../../common";
import { Link } from "react-router-dom";

// import dotenv from "dotenv";
// dotenv.config();

interface FormValues {
  login?: string;
  password?: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  onFinish: () => void;
}

export default (props: Props) => {
  return (
    <div className="sign-up">
      <h2>I have an account</h2>
      <span>Please enter your creditials</span>
      <Formik
        initialValues={{
          login: "",
          password: ""
        }}
        onSubmit={async (values, actions) => {
          const errors = await props.submit(values);
          if (errors) {
            actions.setErrors(errors);
          } else {
            props.onFinish();
          }
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SignInSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Field
              name="login"
              type="text"
              placeholder="Login"
              component={FieldInput}
            />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              component={FieldInput}
            />
            {/* <div> */}
            <CustomButton
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Sign in."}
            </CustomButton>
            {/* </div> */}
          </div>
        )}
      </Formik>
      <div>
        <div>
          <a href={`http://localhost:4000/42`}>42</a>
        </div>
      </div>
      <span>
        Or <Link to="/register">Register</Link> |{" "}
        <Link to="/forgot-password">Forgot Password</Link>
      </span>
    </div>
  );
};
