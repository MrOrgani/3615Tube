import React from "react";
import { Field, Formik, FormikErrors } from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
// import CustomButton from "../button/button.component";
import { PasswordSchema } from "../../common";
import { Container, Grid, Typography, Button } from "@material-ui/core";
// import { Link } from "react-router-dom";

interface FormValues {
  password?: string;
  id?: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  onFinish: () => void;
  token: string;
}

export default (props: Props) => {
  return (
    <Container maxWidth="sm" className="sign-up">
      <Formik
        initialValues={{
          password: "",
          id: props.token
        }}
        onSubmit={async ({ password, id }, { setErrors }) => {
          const errors = await props.submit({ password, id });
          if (errors) {
            setErrors(errors);
          } else {
            props.onFinish();
          }
        }}
        validationSchema={PasswordSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Grid
            container
            justify="center"
            direction="column"
            style={{
              textAlign: "center"
            }}
          >
            <Typography variant="h5" >
              Reset my password
            </Typography>
            <Typography variant="h6" >
              Please enter a new password
            </Typography>
            <Grid container spacing={1} justify="center">
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
                  onClick={() => handleSubmit()}
                >
                  {isSubmitting ? "Loading..." : "Enregister"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Container>
  );
};
