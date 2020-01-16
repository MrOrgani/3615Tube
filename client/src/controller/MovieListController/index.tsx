import * as React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
// import { normalizeErrors } from "../../utils/normalizeErrors";
// import { movieList } from "../../test.js";
// import MovieListItem from "../../components/MovieList/MovieListView";
import { useContext } from "react";
import { MovieListContext } from "../../components/context";
import MovieListLoading from "../../components/MovieList/MovieListLoading";

interface Props {
  children: (data: {
    // submit: (values: any) => Promise<any>;
    // data?: any;
    allMovies?: any;
    loadMore: () => void;
    // filterList: () => void;
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
        console.log(fetchMoreResult.searchFilms);
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          searchFilms: [...prev.searchFilms, ...fetchMoreResult.searchFilms],
          variables: variables
        };
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

  // const [filterList, { data: filteredList }] = useLazyQuery(GET_MOVIES);

  // if (filteredList && filteredList.searchFilms) {
  //   allMovies = filteredList.searchFilms;
  // }

  // // -----------> SI DES COMS, LES REDESIGNER
  // if (filteredList && filteredList.searchFilms) {
  //   allMovies = filteredList.searchFilms;
  // }

  //SI ERREUR DE GRAPHQL RETURN THIS
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  //SI LOADING JE RENVOIE UN -------SKELETON------- DES COMS
  if (loading) return <MovieListLoading loading />;

  // console.log("allMovies, ", allMovies);

  return props.children({
    allMovies,
    // filterList,
    loadMore
  });
};

export default MovieListController;
