import React from "react";
import ConfirmAccountView from "./ConfirmAccountView";
import ConfirmAccountController from "../../controller/ConfirmAccountController";

// interface Params {
//   loading: boolean;
//   data: string;
// }

const ConfirmAccountConnector = (props: any) => {
  const { token } = props;
  return (
    <ConfirmAccountController>
      {({ loading, data }: any) => (
        <ConfirmAccountView
          token={token}
          status={{
            loading,
            data
          }}
        />
      )}
    </ConfirmAccountController>
  );
};

export default ConfirmAccountConnector;
