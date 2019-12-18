import React from "react";
import ForgotPasswordView from "./ForgotPasswordView";
import ForgotPasswordController from "../../controller/ForgotPasswordController";

const ForgotPasswordConnector: React.FC = () => {
  return (
    <ForgotPasswordController>
      {({ submit }) => <ForgotPasswordView submit={submit} />}
    </ForgotPasswordController>
  );
};

export default ForgotPasswordConnector;
