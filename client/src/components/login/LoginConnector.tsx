import React from "react";
import LoginView from "./LoginView";
import LoginController from "../../controller/LoginController";

const LoginConnector = (props: any) => {
  const {
    history,
    location: { state }
  } = props;

  // console.log(
  //   "LoginConnector : I try to redirect a guy toward a movie when he is not connected",
  //   state
  // );

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
