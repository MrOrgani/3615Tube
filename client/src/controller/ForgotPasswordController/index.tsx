import * as React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
  }) => JSX.Element | null;
}

export const forgotPasswordMutation = gql`
  mutation sendForgotPasswordEmail($email: String!) {
    sendForgotPasswordEmail(email: $email) {
      path
      msg
    }
  }
`;

const ForgotPasswordController = (props: Props) => {
  const [mutate, { error }] = useMutation(forgotPasswordMutation);

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const {
      data: { sendForgotPasswordEmail }
    } = await mutate({
      variables: values
    });

    if (sendForgotPasswordEmail) {
      return normalizeErrors(sendForgotPasswordEmail);
    }

    return null;
  };

  return props.children({
    submit
  });
};

export default ForgotPasswordController;
