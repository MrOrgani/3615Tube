import * as React from 'react'
import { useMutation, 
} from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from '../../utils/normalizeErrors';

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
  }) => JSX.Element | null;
}
const signupMutation = gql`
  mutation Profile(
    $firstName: String!
    $lastName: String!
    $login: String!
    $email: String!
    $password: String!
    $avatar: String
  ) {
    profile(
      firstName: $firstName
      lastName: $lastName
      login: $login
      email: $email
      password: $password
      avatar: $avatar
    )
    {
      path
      msg
    }
  }
`;

const UserProfileController = (props: Props) => {
  const [mutate, {error}] = useMutation(signupMutation);
  
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const { data: {profile} } = await mutate({
      variables: values
    });
    
    if (profile) {
      return normalizeErrors(profile);
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

export default UserProfileController;