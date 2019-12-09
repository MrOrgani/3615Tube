import React from "react";
import {
  // Formik,
  Form,
  FormikErrors,
  // FormikValues,
  withFormik
  //  FormikErrors, FormikProps
} from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
import * as SVGLoaders from "svg-loaders-react";

import { SignupSchema } from "../../common";

interface FormValues {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  file: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  // validationSchema: (
  //   values: FormValues
  // ) => Promise<FormikErrors<FormValues> | null>;
}

const SU: React.FC = props => {
  // console.log("SU props: ", props);
  const { isSubmitting } = props as any;
  return (
    <div className="sign-up">
      <h2>I don't have an account</h2>
      <span>Fill these fields to sign up</span>
      <Form>
        <FieldInput placeholder="First Name" name="firstName" />
        <FieldInput placeholder="Last Name" name="lastName" />
        <FieldInput placeholder="Login" name="login" />
        <FieldInput placeholder="Email" name="email" />
        <FieldInput placeholder="Password" name="password" />
        <div>
          <CustomButton type="submit">
            {isSubmitting ? <SVGLoaders.Circles /> : "Sign Up!"}
          </CustomButton>
        </div>
      </Form>
    </div>
  );
};

const SignUpView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    password: "",
    file: ""
  }),
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema: SignupSchema,

  handleSubmit: async (values, { props, setErrors }) => {
    console.log("handle submit props are:", props);
    const errors = await props.submit(values);
    console.log("errors SU: ", errors);
    // if (errors) {
    //   setErrors(errors);
    // }
    // else {
    //   props.onFinish()
    // }
  }
})(SU);

export default SignUpView;
