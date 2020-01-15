import React from "react";
import RegisterView from "./RegisterView";
import RegisterController from "../../controller/RegisterController";

const RegisterConnector = ({ history }: any) => {
  return (
    <RegisterController history={history}>
      {({ submit, onFinish }) => (
        <RegisterView submit={submit} onFinish={onFinish} />
      )}
    </RegisterController>
  );
};

export default RegisterConnector;
