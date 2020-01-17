import * as React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { useContext } from "react";
import { MovieListContext } from "../../components/context";
import MovieListLoading from "../../components/MovieList/MovieListLoading";

interface Props {
  children: (data: {
    allMovies?: any;
    loadMore: () => void;
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
      seen
    }
  }
`;

const MovieListController = (props: Props) => {
  const [filters] = useContext(MovieListContext) as any;

  const { data, loading, error, fetchMore } = useQuery(GET_MOVIES, {
    variables: filters
  });
  let allMovies: any = [];

  const loadMore = React.useCallback(() => {
    fetchMore({
      variables: {
        ...filters,
        page: ++filters.page
      },
      updateQuery: (prev, { fetchMoreResult, variables }) => {
        if (!fetchMoreResult || !fetchMoreResult.searchFilms) return prev;
        return (
          prev && {
            ...prev,
            searchFilms: [...prev.searchFilms, ...fetchMoreResult.searchFilms],
            variables: variables
          }
        );
      }
    });
  }, [fetchMore, filters]);

  React.useEffect(() => {
    const setScrollListener = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      else loadMore();
    };
    window.addEventListener("scroll", setScrollListener);
    return () => window.removeEventListener("scroll", setScrollListener);
  }, [loadMore]);

  if (data && data.searchFilms) {
    allMovies = data.searchFilms;
  }

  //SI ERREUR DE GRAPHQL RETURN THIS
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  //SI LOADING JE RENVOIE UN -------SKELETON------- DES COMS
  if (loading) return <MovieListLoading loading />;

  return props.children({
    allMovies,
    loadMore
  });
};

export default MovieListController;
