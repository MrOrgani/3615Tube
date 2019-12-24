import React from "react";
import ChangePasswordView from "./ChangePasswordView";
import ChangePasswordController from "../../controller/ChangePasswordController";

const ChangePasswordConnector = (props: any) => {
  const { token, history } = props;

  const onFinish = () => {
    history.push("/login");
  };

  return (
    <ChangePasswordController>
      {({ submit }) => (
        <ChangePasswordView token={token} submit={submit} onFinish={onFinish} />
      )}
    </ChangePasswordController>
  );
};

export default ChangePasswordConnector;
