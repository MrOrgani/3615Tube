import React from "react";
import ForgotPasswordView from "./ForgotPasswordView";
import ForgotPasswordController from "../../controller/ForgotPasswordController";

const ForgotPasswordConnector = (props: any) => {
  const { history } = props;

  const onFinish = () => {
    history.push("/m/reset-password", {
      message: "check your email to reset your password"
    });
  };
  return (
    <ForgotPasswordController>
      {({ submit }) => (
        <ForgotPasswordView submit={submit} onFinish={onFinish} />
      )}
    </ForgotPasswordController>
  );
};

export default ForgotPasswordConnector;
