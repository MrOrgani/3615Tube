import React from "react";
import { Formik, FormikErrors, Form, Field } from "formik";
import { SignInSchema } from "../../common";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import FieldInput from "../FiledInput/FieldInput.component";

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
        {({ isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h2>I have an account</h2>
            <span>Please enter your creditials</span>
            <Grid container spacing={2} justify="center">
              <Field
                required
                label="Login"
                name="login"
                component={FieldInput}
              />
              <Field
                required
                type="password"
                label="Password"
                name="password"
                component={FieldInput}
              />
              <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Form>
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
