import * as React from "react";
import {
  // useMutation,
  useQuery
} from "react-apollo";
import gql from "graphql-tag";
import { MovieContext } from "../../pages/context";
import { useContext } from "react";
import MovieOneView from "../../components/MovieOne/MovieOneView";
import axios from "axios";
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
      imdbId
      title
      year
      synopsis
      rating
      genres
      poster
      torrents
      seen
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

  // PARSING TORRENTS OF EACH SINGLE MOVIE
  if (movieInfo.torrents) {
    const parsedTorrents = () =>
      movieInfo.torrents.map((torrent: string) => JSON.parse(torrent));
    movieInfo.torrents = parsedTorrents();
  }
  //***************************************** */

  // GETTING THE CAST AND CREW FROM IMDB
  const getCastAndCrew = async () => {
    const {
      data: { cast, crew }
    } = await axios.get(
      `https://api.themoviedb.org/3/movie/${imdbId}/credits?api_key=7d2a25a20cce518da4384c007bd8cd69`
    );
    movieInfo.cast = cast.slice(0, 8);
    movieInfo.crew = crew.slice(0, 8);
  };
  getCastAndCrew();

  console.log("movie info,", movieInfo);

  return props.children({
    movieInfo
  });
};

export default MovieController;
