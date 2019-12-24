import React from "react";
import RegisterView from "./RegisterView";
import RegisterController from "../../controller/RegisterController";

const RegisterConnector = (props: any) => {
  const { history } = props;

  const onFinish = () => {
    history.push("/m/confirm-email", {
      message: "check your email to confirm your account"
    });
  };

  return (
    <RegisterController>
      {({ submit }) => <RegisterView submit={submit} onFinish={onFinish} />}
    </RegisterController>
  );
};

export default RegisterConnector;
