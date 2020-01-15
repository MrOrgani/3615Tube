import * as React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { useContext } from "react";
import { UserContext } from "../../components/context";

interface Props {
  children: (data: {
    // submit: (values: any) => Promise<any>;
    userInfo?: any;
    data?: any;
  }) => JSX.Element | null;
  userId?: string;
}

// const profileMutation = gql`
//   mutation Update(
//     $firstName: String!
//     $lastName: String!
//     $login: String!
//     $email: String!
//     $password: String
//     $avatar: String!
//     $language: String!
//   ) {
//     update(
//       firstName: $firstName
//       lastName: $lastName
//       login: $login
//       email: $email
//       password: $password
//       avatar: $avatar
//       language: $language
//     ) {
//       path
//       msg
//     }
//   }
// `;

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

const UserProfileController = (props: Props) => {
  const myInfo = useContext(UserContext) as any;
  console.log("UserProfileController: myInfo", myInfo);

  // const [mutate, { error: errorMut }] = useMutation(profileMutation);
  const { data, loading, error: errorQuery } = useQuery(GET_USER_INFO, {
    variables: { id: props.userId }
  });

  if (errorQuery) return <p>{JSON.stringify(errorQuery, null, 2)}</p>;

  if (loading) return <p>Loading...</p>;

  let userInfo;

  if (props.userId) userInfo = myInfo;

  console.log("data.findOne", data, userInfo);

  return props.children({
    userInfo
  });
};

export default UserProfileController;
