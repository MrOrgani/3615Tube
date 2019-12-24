import React from "react";
import LoginConnector from "../../components/login/LoginConnector";

import "./sign-in-sign-up.styles.scss";

const LoginPage = (props: any) => {
  const { history, location } = props;
  return (
    <div className="sign-in-sign-up">
      <LoginConnector history={history} location={location} />
    </div>
  );
};

export default LoginPage;
