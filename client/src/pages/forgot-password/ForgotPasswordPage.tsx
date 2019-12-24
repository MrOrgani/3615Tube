import React from "react";
import ForgotPasswordConnector from "../../components/ForgotPassword/ForgotPasswordConnector";

const ForgotPasswordPage = (props: any) => {
  const { history } = props;
  return (
    <div className="sign-in-sign-up">
      <ForgotPasswordConnector history={history} />
    </div>
  );
};

export default ForgotPasswordPage;
