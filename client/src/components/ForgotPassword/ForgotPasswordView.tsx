import React from "react";
import { Field, Formik, FormikErrors } from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
// import CustomButton from "../button/button.component";
import { Link } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { EmailValidation } from "../../common";

interface FormValues {
  email: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | any>;
  onFinish: () => void;
}

export default (props: Props) => {
  return (
    <Container maxWidth="sm" className="sign-up">
      <h2>I forgot my password</h2>
      <span>Enter your email your change your password</span>
      <Formik
        initialValues={{
          email: ""
        }}
        onSubmit={async (values, actions) => {
          // console.log("value", values);
          const errors = await props.submit(values);
          if (errors) {
            actions.setErrors(errors);
          } else {
            props.onFinish();
          }
        }}
        validationSchema={EmailValidation}
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Grid
            container
            justify="center"
            direction="column"
            style={{
              textAlign: "center"
            }}
          >
            <Field
              required
              name="email"
              type="text"
              label="Email"
              component={FieldInput}
            />
            <Grid item xs={12} container justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
              >
                {isSubmitting ? "Loading..." : "Reset my password"}
              </Button>
            </Grid>
            <span>
              Or <Link to="/login">Login</Link> |{" "}
              <Link to="/register">Register</Link>
            </span>
          </Grid>
        )}
      </Formik>
    </Container>
  );
};
