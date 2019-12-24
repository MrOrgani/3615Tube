import React from "react";
import ChangePasswordConnector from "../../components/ChangePassword/ChangePasswordConnector";

const ChangePasswordPage = (props: any) => {
  const {
    match: {
      params: { key }
    },
    history
  } = props;
  return (
    <div className="sign-in-sign-up">
      <ChangePasswordConnector token={key} history={history} />
    </div>
  );
};

export default ChangePasswordPage;
