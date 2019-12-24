import React from "react";
import RegisterConnector from "../../components/register/RegisterConnnector";

import "./sign-in-sign-up.styles.scss";

const RegisterPage = (props: any) => {
  const { history } = props;
  return (
    <div className="sign-in-sign-up">
      <RegisterConnector history={history} />
    </div>
  );
};

export default RegisterPage;
