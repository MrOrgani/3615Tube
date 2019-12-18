import React from "react";
import ConfirmAccountConnector from "../../components/ConfirmAccount/ConfirmAccountConnector";

const ConfirmAccountPage = (props: any) => {
  const {
    match: {
      params: { token }
    }
  } = props;
  return (
    <div className="sign-in-sign-up">
      <ConfirmAccountConnector token={token} />
    </div>
  );
};

export default ConfirmAccountPage;
