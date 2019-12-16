import React from "react";
import ChangePasswordView from "./ChangePasswordView";
import ChangePasswordController from "../../controller/ChangePasswordController";



const ChangePasswordConnector = (props:any) => {
  const {token} = props
  return (
      <ChangePasswordController>
      {({ submit }) => <ChangePasswordView token={token} submit={submit} />}
      </ChangePasswordController>
  );
};

export default ChangePasswordConnector;
