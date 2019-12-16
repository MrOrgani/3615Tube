import React from "react";
import {
  Field,
  Formik,
  FormikErrors,
} from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
// import { SignupSchema } from "../../common";
import { Form } from "antd";
import { Link } from "react-router-dom";


interface FormValues {
  email: string;
}

interface Props {
  submit: (values: FormValues, action?: any) => Promise<FormikErrors<FormValues> | any>;
  validationSchema?: (
    values: FormValues
  ) => Promise<FormikErrors<FormValues> | null>;
}


export default (props : Props) => {
  return (
  <div className="sign-up" >
        <h2>I forgot my password</h2>
         <span>Enter your email your change your password</span>
  <Formik
  initialValues = {{
    email: "",
  }}
  onSubmit={async (values, actions) => {
    const errors = await props.submit(values);
    if (errors) {
      actions.setErrors(errors)
    }
  }}
  // validationSchema={SignupSchema}
  >
  {({
    handleSubmit,
   isSubmitting}) => (
    <Form style={{ display: 'flex', flexDirection: "column"}}>
      <Field
        name="email"
        type="text"
        placeholder="Email"
        component={FieldInput}
      />
      <div>
        <CustomButton type="submit" onClick={handleSubmit}>
          {isSubmitting ? 
              "Loading..."
              :
              "Reset my password"}
        </CustomButton>          
      </div>
      <span>
        Or <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </span>  
    </Form>)}
  </Formik>
</div>)
}