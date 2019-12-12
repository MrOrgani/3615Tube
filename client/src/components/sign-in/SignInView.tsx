import React from "react";
import {
  Field,
  Formik,
  FormikErrors,
} from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
import { SignInSchema } from "../../common";
import { Form } from "antd";
import { Link } from "react-router-dom";

interface FormValues {
  login?: string;
  password?: string;
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
      login: "",
      password: "",
  }}
    onSubmit={async (values, actions) => {
    const errors = await props.submit(values);
      if (errors) {
        actions.setErrors(errors)
    }
  }}
  validateOnChange={false}
  validateOnBlur={false}
  validationSchema={SignInSchema}>
  {({handleSubmit, isSubmitting}) => (
    <Form style={{ display: 'flex', flexDirection: "column"}
    }>
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
          <div>
              <CustomButton type="submit" onClick={handleSubmit}>
          {isSubmitting ? 
              "Loading..."
              :
              "Sign In!"}
           </CustomButton>
            </div>
            Or <Link to="/forgot-password">Forgot password</Link>
            </Form>)}
    </Formik>
    </div>)
}