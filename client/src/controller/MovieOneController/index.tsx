import * as React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import MovieOneView from "../../components/MovieOne/MovieOneView";

interface Props {
  children: (data: { data?: any; movieInfo?: any }) => JSX.Element | null;
  imdbId?: string;
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
  const imdbId = props.imdbId;

  const { data, loading, error } = useQuery(GET_ONE_MOVIE_INFO, {
    variables: { imdbId }
  });

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  if (loading) return <MovieOneView loading />;

  const movieInfo = data ? data.findOneFilm : null;

  // PARSING TORRENTS OF EACH SINGLE MOVIE
  if (movieInfo.torrents) {
    const parsedTorrents = () =>
      movieInfo.torrents.map((torrent: string) => JSON.parse(torrent));
    movieInfo.torrents = parsedTorrents();
  }
  //***************************************** */

  return props.children({
    movieInfo
  });
};

export default MovieController;
