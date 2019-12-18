import React from "react";
// import { Link } from "react-router-dom";

// interface FormValues {
//   email: string;
// }

interface Props {
  status: {
    loading: any;
    data: any;
  };
  token: string;
}

export default (props: Props) => {
  const { loading, data } = props.status;

  return (
    <div className="sign-up">
      <h2>Validating your account</h2>
      <div>{loading ? "Loading..." : data}</div>
    </div>
  );
};
