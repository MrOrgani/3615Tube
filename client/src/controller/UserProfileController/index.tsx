import * as React from "react";
import { useMutation, useQuery } from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { useContext } from "react";
import { UserContext } from "../../pages/context";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
    userInfo?: any;
    data?: any;
  }) => JSX.Element | null;
  userId?: string;
}

const profileMutation = gql`
  mutation Update(
    $firstName: String!
    $lastName: String!
    $login: String!
    $email: String!
    $password: String
    $avatar: String!
    $language: String!
  ) {
    update(
      firstName: $firstName
      lastName: $lastName
      login: $login
      email: $email
      password: $password
      avatar: $avatar
      language: $language
    ) {
      path
      msg
    }
  }
`;

// const GET_MY_INFO = gql`
//   query queryMe {
//     me {
//       id
//       firstName
//       lastName
//       login
//       email
//       avatar
//       language
//     }
//   }
// `;

const GET_USER_INFO = gql`
  query findOne($login: String) {
    findOne(id: $login) {
      id
      firstName
      lastName
      login
      avatar
    }
  }
`;

const UserProfileController = ({ userId, children }: Props) => {
  const [myInfo] = useContext(UserContext) as any;

  const [mutate, { error: errorMut }] = useMutation(profileMutation);
  const { data, loading, error: errorQuery } = useQuery(GET_USER_INFO, {
    variables: { id: userId }
  });

  if (errorMut || errorQuery)
    return <p>{JSON.stringify(errorMut && errorQuery, null, 2)}</p>;

  if (loading) return <p>Loading...</p>;
  const userInfo = data ? data.findOne : myInfo;

  console.log("data.findOne", data, userInfo);

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

  return children({
    submit,
    userInfo
  });
};

export default UserProfileController;
