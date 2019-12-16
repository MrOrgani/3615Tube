import React from "react";
import { Formik, Form, Field, FormikErrors } from "formik";
// import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
 import { SignupSchema } from "../../common";

import "./user-profile.styles.scss";
import FieldInput from "../FiledInput/FieldInput.component";

interface FormValues {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
    avatar?: string;
}
  
interface Props {
    submit: (values: FormValues, action?: any) => Promise<FormikErrors<FormValues> | null>;
    userInfo: any;
    validationSchema?: (
      values: FormValues
    ) => Promise<FormikErrors<FormValues> | null>;
  }

const UserProfile = (props : Props) => {
  const {userInfo: {me}} = props
  // console.log('Props of user', userInfo)

  return (
    <div className="user-profile-container">
      <h2>Profile Page</h2>
      <span>Upload your info</span>
      <Formik
  // initialValues = {{
  //   firstName: "",
  //   lastName: "",
  //   login: "",
  //   email: "",
  //   password: "",
  //   avatar: "",
  // }}
  initialValues = {me}

    onSubmit={async (values, actions) => {
        const errors = await props.submit(values);
        if (errors) {
            actions.setErrors(errors)
        }
    }}
  validateOnChange={false}
  validateOnBlur={false}
  validationSchema={SignupSchema}
  >
  {({handleSubmit, isSubmitting}) => (
    <Form style={{ display: 'flex', flexDirection: "column"}}>
        <Field
            name="firstName"
            label="First name"
            type="text"
            component={FieldInput}
            placeholder="First Name"
        />
        <Field
            name="lastName"
            label="Last name"
            type="text"
            placeholder="Last Name"
            component={FieldInput}
        />
        <Field
            name="login"
            label="Login"
            type="text"
            placeholder="Login"
            component={FieldInput}
        />
        <Field
            name="email"
            email="Email"
            type="text"
            placeholder="Email"
            component={FieldInput}
        />
        <Field
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            component={FieldInput}
        />
        <div>
            <CustomButton type="submit" onClick={handleSubmit}>
                {isSubmitting ? "Loading ..." : "Sign Up!"}
            </CustomButton>
        </div>
    </Form>)}
    </Formik>
    </div>
  );
};

export default UserProfile;
