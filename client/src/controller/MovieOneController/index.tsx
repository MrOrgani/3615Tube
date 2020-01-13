import * as React from "react";
import {
  // useMutation,
  useQuery
} from "react-apollo";
import gql from "graphql-tag";
import { MovieContext } from "../../pages/context";
import { useContext } from "react";
import MovieOneView from "../../components/MovieOne/MovieOneView";
// import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    // submit: (values: any) => Promise<any>;
    data?: any;
    movieInfo?: any;
  }) => JSX.Element | null;
  movieId?: string;
}

const GET_ONE_MOVIE_INFO = gql`
  query findOneFilm($imdbId: String) {
    findOneFilm(imdbId: $imdbId) {
      title
      year
      synopsis
      rating
      genres
      poster
      torrents
    }
  }
`;

const MovieController = (props: Props) => {
  const imdbId = useContext(MovieContext) as any;

  const { data, loading, error } = useQuery(GET_ONE_MOVIE_INFO, {
    variables: { imdbId }
  });
  const movieInfo = data ? data.findOneFilm : null;

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  if (loading) return <MovieOneView loading />;

  // const parsedTorrents = async (movieInfo: any) => {
  //   return await JSON.parse(movieInfo.torrents[0]);
  // };
  // console.log("torrents, ", parsedTorrents(movieInfo));
  console.log("torrents, ", movieInfo.torrents.join(","));

  return props.children({
    movieInfo
  });
};

export default MovieController;
