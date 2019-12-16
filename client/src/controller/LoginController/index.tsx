import * as React from "react";
import { useMutation, useQuery } from "react-apollo";
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
export const queryMe = gql`
  query meQuery {
    me {
      lastName
      login
      firstName
      password
      language
    }
  }
`;

const LoginController = (props: Props) => {
  const [
    mutate
    // { error }
  ] = useMutation(loginMutation);
  const { loading, error, data } = useQuery(queryMe);
  console.log("GIVE ME THE DATA JOHN, ", loading, error, data);

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const {
      data: { login }
    } = await mutate({
      variables: values
    });

    console.log(login);
    if (login) {
      // if (errors) {
      // return normalizeErrors(errors);
      return normalizeErrors(login);
    }
    // if (sessionId) {
    //   return sessionId;
    // }

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
