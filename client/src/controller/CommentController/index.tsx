import * as React from "react";
import {
  // useMutation,
  useQuery
} from "react-apollo";
import gql from "graphql-tag";
import { useContext } from "react";
import { MovieContext } from "../../pages/context";
// import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    // submit: (values: any) => Promise<any>;
    // data?: any;
    movieInfo?: any;
  }) => JSX.Element | null;
  movieId?: string;
}

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

const CommentController = (props: Props) => {
  const [key] = useContext(MovieContext) as any;
  console.log(
    "CommentController, data from MovieContext waiting for a :key, ",
    key
  );
  const { data, loading, error } = useQuery(GET_MOVIE_INFO, {
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
  return props.children({
    // submit,
    movieInfo
    //  onFinish
  });
};

export default CommentController;
