export const formatSearch = (
  rawFilmArray: Array<any>,
  source: string,
  pctRawResult: Array<any>
) =>
  rawFilmArray
    .map(elem => {
      return source === "pct"
        ? pctFormatFilmResult(elem)
        : ytsFormatFilmResult(elem, pctRawResult);
    })
    .filter(e => e != null);

export const pctFormatFilmResult = ({
  imdb_id: imdbId,
  title,
  synopsis,
  year,
  rating,
  images,
  genres,
  torrents
}: any) => {
  // console.log(film);
  // const  = film;
  torrents = torrents.en;
  const image =
    images.poster || images.fanart || images.bannerimage || images.banner;
  if (!image) {
    console.log("pas d'image pct");
    return null;
  }
  return {
    imdbId,
    title,
    synopsis,
    year,
    rating: rating.percentage,
    image,
    genres,
    torrents
  };
};
export const ytsFormatFilmResult = (
  {
    imdb_code: imdbId,
    id: ytsId,
    title_english: title,
    synopsis,
    year,
    genres,
    rating,
    medium_cover_image,
    small_cover_image,
    large_cover_image,
    torrents
  }: any,
  pctRawResult: Array<any>
) => {
  if (pctRawResult.includes(imdbId)) {
    console.log("DOUBLON");
    return null;
  }
  const image = medium_cover_image || small_cover_image || large_cover_image;
  if (!image) console.log("pas d'image yts");
  return {
    imdbId,
    ytsId,
    title,
    synopsis,
    year,
    rating: rating *= 10,
    image,
    genres,
    torrents
  };
};
