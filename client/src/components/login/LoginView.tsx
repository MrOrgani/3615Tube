import React from "react";
import {
  // Field,
  Formik,
  FormikErrors,
  Form
} from "formik";
// import FieldInput from "../FiledInput/FieldInput.component";
// import CustomButton from "../button/button.component";
import { SignInSchema } from "../../common";
import { Link } from "react-router-dom";
import { Grid, TextField, Button } from "@material-ui/core";

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
        {({
          // handleSubmit,
          isSubmitting,
          handleChange
        }) => (
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  onChange={handleChange}
                  style={{ color: "white" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  // className={classes.submit}
                  disabled={isSubmitting}
                >
                  Log in
                </Button>
              </Grid>
              {/* <CustomButton
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Sign in."}
              </CustomButton> */}
              {/* </div> */}
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
