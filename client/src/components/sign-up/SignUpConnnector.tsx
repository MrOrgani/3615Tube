import React from "react";
import SignUpView from "./SignUp.component";
import SignUpController from "../../controller/SignUpController";

const SignUpConnector: React.FC = () => {
  // const submit = async (values: any) => {
  //   console.log("values are in Dub:", values);
  //   return null;
  // };

  return (
    <SignUpController>
      {({ submit }) => <SignUpView submit={submit} />}
    </SignUpController>
  );
};

export default SignUpConnector;
