import * as React from "react";
import { useMutation, useQuery } from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
    userInfo?: any;
    data?: any;
  }) => JSX.Element | null;
  userLogin?: string;
}

const profileMutation = gql`
  mutation Update(
    $firstName: String!
    $lastName: String!
    $login: String!
    $email: String!
    $password: String
    $avatar: String
  ) {
    update(
      firstName: $firstName
      lastName: $lastName
      login: $login
      email: $email
      password: $password
      avatar: $avatar
    ) {
      path
      msg
    }
  }
`;

const GET_MY_INFO = gql`
  query queryMe {
    me {
      id
      firstName
      lastName
      login
      email
      avatar
      language
    }
  }
`;

const GET_USER_INFO = gql`
  query findOne($login: String) {
    findOne(id: $login) {
      firstName
      lastName
      login
      avatar
    }
  }
`;

const UserProfileController = (props: Props) => {
  const [mutate, { error: errorMut }] = useMutation(profileMutation);
  const { data, loading, error: errorQuery } = useQuery(
    props.userLogin ? GET_USER_INFO : GET_MY_INFO,
    {
      variables: { id: props.userLogin }
    }
  );

  if (errorMut || errorQuery)
    return <p>{JSON.stringify(errorMut && errorQuery, null, 2)}</p>;
  if (loading) return <p>Loading...</p>;

  const submit = async (values: any) => {
    const {
      data: { profile }
    } = await mutate({
      variables: values
    });
    if (profile) {
      return normalizeErrors(profile);
    }
    return null;
  };

  const userInfo = data.findOne ? data.findOne : data.me;
  return props.children({
    submit,
    userInfo
  });
};

export default UserProfileController;
