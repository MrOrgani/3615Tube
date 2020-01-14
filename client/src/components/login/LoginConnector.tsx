import React from "react";
import LoginView from "./LoginView";
import LoginController from "../../controller/LoginController";

const LoginConnector = (props: any) => {
  const {
    history,
    location: { state }
  } = props;

  const onFinish = () => {
    if (state && state.next) {
      return history.push(state.next);
    }
    history.push("/");
  };

  return (
    <LoginController>
      {({ submit }) => <LoginView submit={submit} onFinish={onFinish} />}
    </LoginController>
  );
};

export default LoginConnector;
