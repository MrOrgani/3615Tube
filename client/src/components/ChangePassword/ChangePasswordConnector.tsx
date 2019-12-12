import React from "react";
import ChangePasswordView from "./ChangePasswordView";
import ChangePasswordController from "../../controller/ChangePasswordController";

const SignInConnector: React.FC = () => {
  return (
      <ChangePasswordController>
      {({ submit }) => <ChangePasswordView submit={submit} />}
      </ChangePasswordController>
  );
};

export default SignInConnector;
