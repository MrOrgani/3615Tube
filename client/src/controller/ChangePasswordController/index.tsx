import * as React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
  }) => JSX.Element | null;
}

export const changePasswordMutation = gql`
  mutation forgotPasswordChange($password: String!, $id: String!) {
    forgotPasswordChange(password: $password, id: $id) {
      path
      msg
    }
  }
`;

const ChangePasswordController = (props: Props) => {
  const [mutate, { error }] = useMutation(changePasswordMutation);

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const {
      data: { forgotPasswordChange }
    } = await mutate({
      variables: values
    });

    if (forgotPasswordChange) {
      return normalizeErrors(forgotPasswordChange);
    }

    return null;
  };

  return props.children({
    submit
  });
};

export default ChangePasswordController;
