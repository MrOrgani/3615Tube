import React from "react";
import {
  Field,
  Formik,
  FormikErrors,
} from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
import { ChangePasswordSchema } from "../../common";
import { Form } from "antd";
// import { Link } from "react-router-dom";


interface FormValues {
  newPassword: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | any>;
  validationSchema?: (
    values: FormValues
  ) => Promise<FormikErrors<FormValues> | null>;
}


export default (props : Props) => {
  return (
  <div className="sign-up" >
        <h2>Reset my password</h2>
         <span>Please enter a new password</span>
  <Formik
  initialValues = {{
    newPassword: "",
  }}
  onSubmit={async (values, {setErrors}) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors)
    }
  }}
  validationSchema={ChangePasswordSchema}
  >
  {({
    handleSubmit,
   isSubmitting}) => (
    <Form style={{ display: 'flex', flexDirection: "column"}}>
      <Field
        name="password"
        type="password"
        placeholder="New Password"
        component={FieldInput}
      />
      <div>
        <CustomButton type="submit" onClick={handleSubmit}>
          {isSubmitting ? 
              "Loading..."
              :
              "Enregister"}
        </CustomButton>          
      </div>
    </Form>)}
  </Formik>
</div>)
}