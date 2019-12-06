import React from "react";
import SignUpConnector from "../../components/sign-up/SignUpConnnector";
import SignIn from "../../components/sign-in/sign-in.component";

import "./sign-in-sign-up.styles.scss";

const SignInSignUpPage = () => (
  <div className="sign-in-sign-up">
    <SignIn />
    <SignUpConnector />
  </div>
);

export default SignInSignUpPage;
