export const formatFilmResult = (film: any) => {
  // console.log(film);
  const { imdb_id: imdbId, title, synopsis, released, rating, images } = film;
  return {
    imdbId,
    title,
    synopsis,
    released,
    rating: rating.percentage,
    image: images.poster || images.fanart || images.banner
  };
};
