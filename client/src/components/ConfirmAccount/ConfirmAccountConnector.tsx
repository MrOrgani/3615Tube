import React from "react";
import ConfirmAccountView from "./ConfirmAccountView";

const ConfirmAccountConnector = (props: any) => {
  const {
    match: {
      params: { token }
    }
  } = props;
  return <ConfirmAccountView token={token} />;
};

export default ConfirmAccountConnector;
