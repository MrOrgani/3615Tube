import { pctAdd, ytsAdd } from "../../../utils/apiGlobals";
import Axios from "axios";

export const fetchRawData = async (args: any, source: string) => {
  try {
    const url = (await UrlBuilder(args, source)) as string;
    const result = (await Axios.get(url)) as any;
    return source === "pct" ? result.data : result.data.data.movies;
  } catch (err) {
    console.log(
      "error in the film fetching, with:",
      source,
      "and the error is:",
      err
    );
    return null;
  }
};
const UrlBuilder = async (
  { sort, order, keywords, page, genres }: any,
  source: string
) => {
  const genresString = typeof genres === "object" ? genres.join(", ") : "";
  console.log(order, sort, genres);

  if (source === "pct") {
    if (!sort) sort = "rating";
    const pctUrl =
      `${pctAdd}/movies/${page}` +
      `?sort=${sort}` +
      `&genre=${genresString}` +
      `&order=${order == "asc" ? 1 : -1}` +
      `&keywords=${keywords ? keywords.trim() : ""}`;
    return pctUrl;
  } else {
    if (!sort) sort = "ratings";
    const ytsUrl =
      `${ytsAdd}/list_movies.json?limit=50&page=${page}&quality=720p,1080p` +
      `?sort=${sort}` +
      `&genre=${genresString}` +
      `&order_by=${order === "asc" ? order : "des"}` +
      `&query_term=${keywords ? keywords.trim() : ""}`;
    console.log(ytsUrl);
    return ytsUrl;
  }
};
