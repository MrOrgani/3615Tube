import React from "react";
import LoginView from "./LoginView";
import LoginController from "../../controller/LoginController";

const LoginConnector: React.FC = () => {
  return (
    <LoginController>
      {({ submit }) => <LoginView submit={submit} />}
    </LoginController>
  );
};

export default LoginConnector;
