import React from "react";
import LogoutController from "../../controller/Logout";
import LogoutExec from "./LogoutExec";

const LogoutConnector = (props: any) => {
  const { history } = props;

  const onFinish = () => {
    history.push("/login");
  };
  return (
    <LogoutController>
      {({ logout }) => <LogoutExec logout={logout} onFinish={onFinish} />}
    </LogoutController>
  );
};

export default LogoutConnector;
