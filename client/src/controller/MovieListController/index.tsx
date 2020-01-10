import * as React from "react";
// import { useQuery } from "react-apollo";
// import gql from "graphql-tag";
// import { normalizeErrors } from "../../utils/normalizeErrors";
import { movieList } from "../../test.js";
import MovieListItem from "../../components/MovieList/MovieListView";

interface Props {
  children: (data: {
    // submit: (values: any) => Promise<any>;
    // data?: any;
    allMovies?: any;
  }) => JSX.Element | null;
  movieId?: string;
}

// const GET_MOVIES = gql`
//   query findMovie($id: String) {
//     findMovie(id: $id) {
//       id
//       firstName
//       lastName
//       login
//       email
//       avatar
//     }
//   }
// `;

const MovieListController = (props: Props) => {
  // const key = useContext(MovieContext) as any;
  // console.log("CommentController, key MovieContext waiting for a :key, ", key);

  // FIND A MOVIE
  //   On execute la query pour fetch de la data
  //    const { error, data: { movies = {} }, loading } = useQuery(getMovies)
  //           ||
  // const { data, loading, error } = useQuery(GET_MOVIE, {
  //   variables: { imdbId: key }
  // });
  //-----------> SI DES COMS, LES REDESIGNER
  const allMovies =
    // data ? data :
    movieList;

  // ECRIRE UN COMMENTAIRE
  // const [mutate, { error: errorMut }] = useMutation(POST_MOVIE_COMMENT);

  //SI ERREUR DE GRAPHQL RETURN THIS
  //   if (error || errorMut) return <p>{JSON.stringify(error, null, 2)}</p>;

  //SI LOADING JE RENVOIE UN -------SKELETON------- DES COMS
  if (
    // loading ||
    !allMovies
  )
    return <MovieListItem loading />;

  // const submit = async (values: any) => {
  //   const {
  //     data: { putCommentary }
  //   } = await mutate({
  //     variables: values
  //   });

  //   if (putCommentary) {
  //     return normalizeErrors(putCommentary);
  //   }
  //   return null;
  // };

  return props.children({
    // submit,
    allMovies
    //  onFinish
  });
};

export default MovieListController;
