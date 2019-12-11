import React from "react";
import SignUpConnector from "../../components/sign-up/SignUpConnnector";
import SignInConnector from "../../components/sign-in/SignInConnnector";

import "./sign-in-sign-up.styles.scss";

const SignInSignUpPage = () => (
  <div className="sign-in-sign-up">
    <SignInConnector />
    <SignUpConnector />
  </div>
);

export default SignInSignUpPage;
