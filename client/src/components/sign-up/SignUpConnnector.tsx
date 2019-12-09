import React from "react";
import SignUpView from "./SignUp.component";
import SignUpController from "../../controller/SignUpController";

const SignUpConnector: React.FC = () => {
  return (
    <SignUpController>
      {({ submit }) => <SignUpView submit={submit} />}
    </SignUpController>
  );
};

export default SignUpConnector;
