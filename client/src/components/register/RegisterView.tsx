import React from "react";
import {
  Field,
  Formik,
  FormikErrors,
} from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
import { SignupSchema } from "../../common";

import "./register.scss"
import { Link } from "react-router-dom";

interface FormValues {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  file?: string;
}

interface Props {
  submit: (values: FormValues, action?: any) => Promise<FormikErrors<FormValues> | null>;
  validationSchema?: (
    values: FormValues
  ) => Promise<FormikErrors<FormValues> | null>;
}


export default (props : Props) => {
  return (
  <div className="sign-up" >
        <h2>I don't have an account</h2>
         <span>Fill these fields to sign up</span>
  <Formik
  initialValues = {{
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    password: "",
    // file: "",
  }}

    onSubmit={async (values, actions) => {
    const errors = await props.submit(values);
      if (errors) {
        actions.setErrors(errors)
    }
  }}
  validationSchema={SignupSchema}>
  {(
    {handleSubmit, isSubmitting}
    ) => (
    <div style={{ display: 'flex', flexDirection: "column"}
    }>
    <Field
              name="firstName"
              type="text"
              component={FieldInput}
              placeholder="First Name"
              />
        <Field
              name="lastName"
              type="text"
              placeholder="Last Name"
              component={FieldInput}
              />
        <Field
              name="login"
              type="text"
              placeholder="Login"
              component={FieldInput}
              />
      <Field
            name="email"
            type="text"
            placeholder="Email"
            component={FieldInput}
            />
      <Field
            name="password"
            type="password"
            placeholder="Password"
            component={FieldInput}
          />
          <div>
              <CustomButton type="submit" onClick={handleSubmit}>
          {isSubmitting ? 
             "Loading ..."
              :
              "Sign Up!"}
           </CustomButton>
            </div>
            <span>
            Or <Link to="/login">Login</Link>
            </span>
            </div>)}
    </Formik>
    </div>)
}