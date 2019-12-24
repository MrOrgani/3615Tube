import React from "react";
import LogoutConnector from "../../components/Logout/LogoutConnector";

const LogoutPage = (props: any) => {
  const { history } = props;
  return <LogoutConnector history={history} />;
};

export default LogoutPage;
