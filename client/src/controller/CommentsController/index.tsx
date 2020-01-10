import * as React from "react";
import {
  // useMutation,
  useQuery,
  useMutation
} from "react-apollo";
import gql from "graphql-tag";
import { useContext } from "react";
import { MovieContext } from "../../pages/context";
// import { normalizeErrors } from "../../utils/normalizeErrors";
import CommentsView from "../../components/Comments/CommentsView";
// import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
    data?: any;
    movieInfo?: any;
    allCommentary?: any;
  }) => JSX.Element | null;
  allCommentary?: any;
  movieId?: string;
}

const GET_MOVIE_COMMENTS = gql`
  query allCommentary($imdbId: String) {
    allCommentary(imdbId: $imdbId) {
      authorId {
        id
        login
        avatar
      }
      text
      createdAt
    }
  }
`;

const POST_MOVIE_COMMENT = gql`
  mutation putCommentary($text: String!, $imdbId: String!) {
    putCommentary(text: $text, imdbId: $imdbId) {
      authorId {
        login
        avatar
      }
      text
      createdAt
    }
  }
`;

const CommentController = (props: Props) => {
  const key = useContext(MovieContext) as any;

  // GET ALL COMMENTAIRE FROM A MOVIE
  const { data, loading, error } = useQuery(GET_MOVIE_COMMENTS, {
    variables: { imdbId: key }
  });
  //-----------> SI DES COMS, LES REDESIGNER
  const allCommentary = data ? data.allCommentary : [];

  // ECRIRE UN COMMENTAIRE
  const [mutate, { error: errorMut }] = useMutation(POST_MOVIE_COMMENT);

  //SI ERREUR DE GRAPHQL RETURN THIS
  if (error || errorMut) return <p>{JSON.stringify(error, null, 2)}</p>;

  //SI LOADING JE RENVOIE UN -------SKELETON------- DES COMS
  if (loading) return <CommentsView loading />;

  const submit = async (values: any) => {
    const {
      data: { putCommentary }
    } = await mutate({
      variables: values
    });

    return putCommentary;
  };

  return props.children({
    submit,
    allCommentary
    //  onFinish
  });
};

export default CommentController;
