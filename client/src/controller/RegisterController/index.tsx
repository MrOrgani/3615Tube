import * as React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
  }) => JSX.Element | null;
}

export const registerMutation = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $login: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      login: $login
      email: $email
      password: $password
    ) {
      path
      msg
    }
  }
`;

const SignUpController = (props: Props) => {
  const [mutate, { error }] = useMutation(registerMutation);

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const {
      data: { register }
    } = await mutate({
      variables: values
    });

    if (register) {
      return normalizeErrors(register);
    }
    return null;
  };

  // function onFinish() {
  //   props.history.push("/");
  // }

  return props.children({
    submit
    //  onFinish
  });
};

export default SignUpController;
