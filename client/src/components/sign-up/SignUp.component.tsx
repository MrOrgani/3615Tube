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
  return (
    <div className="sign-up">
      <h2>I don't have an account</h2>
      <span>Fill these fields to sign up</span>
      {/* <Formik
        validateOnChange={true}
        initialValues={{
          firstName: "" as string,
          lastName: "" as string,
          login: "" as string,
          email: "" as string,
          password: "" as string,
          file: "" as string
        }}
        validationSchema={SignupSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // props.submit(data)
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => ( */}
      <Form>
        <FieldInput placeholder="First Name" name="firstName" />
        <FieldInput placeholder="Last Name" name="lastName" />
        <FieldInput placeholder="Login" name="login" />
        <FieldInput placeholder="Email" name="email" />
        <FieldInput placeholder="Password" name="password" />
        <div>
          <CustomButton type="submit">Submit</CustomButton>
        </div>
      </Form>
      {/* )}
      </Formik> */}
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

  validationSchema: SignupSchema,

  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
    // else {
    //   props.onFinish()
    // }
  }
})(SU);

export default SignUpView;
