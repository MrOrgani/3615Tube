import React from "react";
import { Field, Formik, FormikErrors, Form } from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import { SignupSchema } from "../../common";

import "./register.scss";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";

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
        {({ isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h2>I don't have an account</h2>
            <span>Fill these fields to sign up</span>
            <Grid container spacing={1} justify="center">
              <Field
                grid={{ xs: 12, sm: 6 }}
                required
                name="firstName"
                type="text"
                component={FieldInput}
                label="First Name"
              />
              <Field
                grid={{ xs: 12, sm: 6 }}
                required
                name="lastName"
                type="text"
                label="Last Name"
                component={FieldInput}
              />
              <Field
                required
                name="login"
                type="text"
                label="Login"
                component={FieldInput}
              />
              <Field
                required
                name="email"
                type="text"
                label="Email"
                component={FieldInput}
              />
              <Field
                required
                name="password"
                type="password"
                label="Password"
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
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} container justify="center">
                <Grid item xs>
                  Or
                </Grid>
                <Link to="/login">
                  <Button variant="contained" color="secondary">
                    <InputIcon /> Login
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};
