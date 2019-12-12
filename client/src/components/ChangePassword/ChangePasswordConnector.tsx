import React from "react";
import ChangePasswordView from "./ChangePasswordView";
import ChangePasswordController from "../../controller/ChangePasswordController";

const ChangePasswordConnector: React.FC = (props: any) => {
  // const {key} = props
  console.log('keykey', props)
  return (
      <ChangePasswordController>
      {({ submit }) => <ChangePasswordView submit={submit} />}
      </ChangePasswordController>
  );
};

export default ChangePasswordConnector;
