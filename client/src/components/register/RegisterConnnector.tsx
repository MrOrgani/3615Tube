import React from "react";
import RegisterView from "./RegisterView";
import RegisterController from "../../controller/RegisterController";

const RegisterConnector: React.FC = () => {
  return (
    <RegisterController>
      {({ submit }) => <RegisterView submit={submit} />}
    </RegisterController>
  );
};

export default RegisterConnector;
