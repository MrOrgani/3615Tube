import * as React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
  }) => JSX.Element | null;
}

export const loginMutation = gql`
  mutation login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      path
      msg
    }
  }
`;

const LoginController = (props: Props) => {
  const [mutate, { error, client }] = useMutation(loginMutation);

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const {
      data: { login }
    } = await mutate({
      variables: values
    });

    if (login) {
      return normalizeErrors(login);
    }
    // if (sessionId) {
    //   return sessionId;
    // }

    await client!.resetStore();
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

export default LoginController;
