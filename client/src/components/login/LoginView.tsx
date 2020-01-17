import React from "react";
import { Formik, FormikErrors, Field } from "formik";
import { SignInSchema } from "../../common";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Divider,
  Typography,
  Container
} from "@material-ui/core";
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
    <Container maxWidth="sm" className="sign-up">
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
        {({ isSubmitting, handleSubmit }) => (
          <Grid
            container
            justify="center"
            direction="column"
            style={{
              textAlign: "center"
            }}
          >
            <Typography variant="h4">Login</Typography>
            <Typography variant="h6">Please enter your creditials</Typography>
            <Field
              required
              label="Login"
              name="login"
              component={FieldInput}
              style={{ margin: "5px 0px" }}
            />
            <Field
              required
              type="password"
              label="Password"
              name="password"
              component={FieldInput}
              style={{ margin: "5px 0px" }}
            />
            <Grid item xs={12} container justify="center">
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Formik>
      <Divider variant="middle" style={{ margin: "10px 0" }} />
      <Grid container justify="space-evenly">
        <Grid item>
          <a href="http://127.0.0.1:4000/Oauth/42">
            <Button
              fullWidth
              variant="contained"
              style={{ backgroundColor: "black", color: "white" }}
            >
              42
            </Button>
          </a>
        </Grid>
        <Grid item>
          <a href={`http://127.0.0.1:4000/Oauth/google`}>
            <Button fullWidth variant="contained" color="secondary">
              Google
            </Button>
          </a>
        </Grid>
      </Grid>
      <Divider variant="middle" style={{ margin: "10px 0" }} />
      <span>
        Or <Link to="/register">Register</Link> |{" "}
        <Link to="/forgot-password">Forgot Password</Link>
      </span>
    </Container>
  );
};
