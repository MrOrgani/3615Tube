import React from "react";
import SignInView from "./SignInView";
import SignInController from "../../controller/SignInController";

const SignInConnector: React.FC = () => {
  return (
    <SignInController>
      {({ submit }) => <SignInView submit={submit} />}
    </SignInController>
  );
};

export default SignInConnector;
