import React from "react";
import LoginView from "./LoginView";
import LoginController from "../../controller/LoginController";

const LoginConnector = (props: any) => {
  // console.log("state", props);

  const {
    history,
    location: { state }
  } = props;
  const onFinish = () => {
    if (state && state.next) {
      return history.push(state.next);
    }
    history.push("/movies");
  };

  return (
    <LoginController>
      {({ submit }) => <LoginView submit={submit} onFinish={onFinish} />}
    </LoginController>
  );
};

export default LoginConnector;
