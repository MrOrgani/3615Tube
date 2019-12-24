import React from "react";
import { Field, Formik, FormikErrors } from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import CustomButton from "../button/button.component";
import { ChangePasswordSchema } from "../../common";
// import { Link } from "react-router-dom";

interface FormValues {
  newPassword?: string;
  token?: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  onFinish: () => void;
  token: string;
}

export default (props: Props) => {
  return (
    <div className="sign-up">
      <h2>Reset my password</h2>
      <span>Please enter a new password</span>
      <Formik
        initialValues={{
          newPassword: "",
          token: props.token
        }}
        onSubmit={async ({ newPassword, token }, { setErrors }) => {
          const errors = await props.submit({ newPassword, token: token });
          if (errors) {
            setErrors(errors);
          } else {
            props.onFinish();
          }
        }}
        validationSchema={ChangePasswordSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Field
              name="password"
              type="password"
              placeholder="New Password"
              component={FieldInput}
            />
            <div>
              <CustomButton
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Enregister"}
              </CustomButton>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
