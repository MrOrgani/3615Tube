import * as React from "react";
import {
  // useMutation,
  useQuery
} from "react-apollo";
import gql from "graphql-tag";
// import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    // submit: (values: any) => Promise<any>;
    // data?: any;
    movieInfo?: any;
  }) => JSX.Element | null;
  movieId?: string;
}

// const profileMutation = gql`
//   mutation Profile(
//     $firstName: String!
//     $lastName: String!
//     $login: String!
//     $email: String!
//     $password: String!
//     $avatar: String
//   ) {
//     profile(
//       firstName: $firstName
//       lastName: $lastName
//       login: $login
//       email: $email
//       password: $password
//       avatar: $avatar
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

const GET_MOVIE_INFO = gql`
  query findMovie($id: String) {
    findMovie(id: $id) {
      id
      firstName
      lastName
      login
      email
      avatar
    }
  }
`;

const MovieController = (props: Props) => {
  const { data: movieInfo, loading, error } = useQuery(GET_MOVIE_INFO, {
    variables: { id: props.movieId }
  });

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  if (loading) return <p>Loading...</p>;

  //   const submit = async (values: any) => {
  //     const {
  //       data: { profile }
  //     } = await mutate({
  //       variables: values
  //     });

  //     if (profile) {
  //       return normalizeErrors(profile);
  //     }
  //     return null;
  //   };

  // function onFinish() {
  //   props.history.push("/");
  // }
  //   const userInfo = data.findOne ? data.findOne : data.me;
  return props.children({
    // submit,
    movieInfo
    //  onFinish
  });
};

export default MovieController;
