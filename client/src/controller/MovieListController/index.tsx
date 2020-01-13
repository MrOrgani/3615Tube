import * as React from "react";
import { useQuery, useLazyQuery } from "react-apollo";
import gql from "graphql-tag";
// import { normalizeErrors } from "../../utils/normalizeErrors";
// import { movieList } from "../../test.js";
import MovieListItem from "../../components/MovieList/MovieListView";
import { useContext } from "react";
import { MovieListContext } from "../../pages/context";

interface Props {
  children: (data: {
    // submit: (values: any) => Promise<any>;
    // data?: any;
    allMovies?: any;
    loadMore: () => void;
    filterList: () => void;
  }) => JSX.Element | null;
  movieId?: string;
  variables?: any;
}

const GET_MOVIES = gql`
  query searchFilms(
    $page: Int!
    $order: OrderInput
    $rating: [Int]
    $year: [Int]
    $genres: String
    $keywords: String
  ) {
    searchFilms(
      page: $page
      order: $order
      rating: $rating
      year: $year
      genres: $genres
      keywords: $keywords
    ) {
      imdbId
      title
      year
      synopsis
      rating
      poster
    }
  }
`;

const MovieListController = (props: Props) => {
  const { children, variables } = props;

  const filters = useContext(MovieListContext) as any;

  console.log("props of MovieListController", props);
  console.log("filters in MovieListController", filters);
  // const key = useContext(MovieContext) as any;
  // console.log("CommentController, key MovieContext waiting for a :key, ", key);

  // FIND A MOVIE
  //   On execute la query pour fetch de la data
  //  const { error, data: { movies = {} }, loading } = useQuery(GET_MOVIES)
  //           ||
  const { data, loading, error, fetchMore } = useQuery(GET_MOVIES, {
    variables: filters
  });
  let allMovies: any = [];

  if (data && data.searchFilms) {
    allMovies = data.searchFilms;
  }

  const [filterList, { data: filteredList }] = useLazyQuery(GET_MOVIES);

  if (filteredList && filteredList.searchFilms) {
    allMovies = filteredList.searchFilms;
    console.log("ALL MOVIES CHANGED", allMovies);
  }

  // console.log("data fitlered", result);
  // -----------> SI DES COMS, LES REDESIGNER

  // ECRIRE UN COMMENTAIRE
  // const [mutate, { error: errorMut }] = useMutation(POST_MOVIE_COMMENT);

  //SI ERREUR DE GRAPHQL RETURN THIS
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  //SI LOADING JE RENVOIE UN -------SKELETON------- DES COMS
  if (loading) return <MovieListItem loading />;

  // const submit = async (values: any) => {
  //   const {
  //     data: { searchFilms }
  //   } = (await useQuery(GET_MOVIES, {
  //     variables: values
  //   })) as any;

  //   if (putCommentary) {
  //     return normalizeErrors(putCommentary);
  //   }
  //   return searchFilms;
  // };

  console.log("allMovies, ", allMovies);

  return children({
    // hasMoreListings,
    allMovies,
    // loading,
    filterList,
    loadMore: () => {
      fetchMore({
        variables: {
          ...variables,
          offset: allMovies.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            ...prev,
            searchListings: [
              ...prev.searchListings,
              ...fetchMoreResult.searchListings
            ]
          };
        }
      });
    }
  });
};

export default MovieListController;
