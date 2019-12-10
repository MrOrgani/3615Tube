import * as React from 'react'
import { useMutation, useQuery, ChildMutateProps } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<null>;
  }) => JSX.Element | null;
}
const signupMutation = gql`
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
    )
  }
`;

const SignUpController = props => {
  const [mutate, {loading, error}] = useMutation(signupMutation);
  console.log("sign up mustation", useMutation(signupMutation))
  if (loading) return (<div>loading</div>);
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async values => {
    console.log("In SignUpController, values are: ", values);
    const { data } = await mutate({
      variables: values
    });
    if (data) {
      console.log("In SignUpController, return of Register Mutation", data);
      return data.signup;
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
