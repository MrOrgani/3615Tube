import React from "react";
import ChangePasswordView from "./ChangePasswordView";
import ChangePasswordController from "../../controller/ChangePasswordController";

const ChangePasswordConnector = (props: any) => {
  const {
    match: {
      params: { key }
    },
    history
  } = props;

  const onFinish = () => {
    history.push("/login");
  };

  return (
    <ChangePasswordController>
      {({ submit }) => (
        <ChangePasswordView token={key} submit={submit} onFinish={onFinish} />
      )}
    </ChangePasswordController>
  );
};

export default ChangePasswordConnector;
