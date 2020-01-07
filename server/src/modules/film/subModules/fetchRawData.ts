import { pctAdd, ytsAdd } from "../../../utils/apiGlobals";
import Axios from "axios";

const UrlBuilder = async (
  { sort, order, keywords, page, genres }: any,
  source: string
) => {
  if (!sort) sort = "rating";
  const genresString = typeof genres === "object" ? genres.Join(", ") : "";

  if (source === "pct") {
    const pctUrl =
      `${pctAdd}/movies/${page}` +
      `?sort=${sort}` +
      `&genre=${genresString}` +
      `&order=${order == "asc" ? 1 : -1}` +
      `&keywords=${keywords ? keywords.trim() : ""}`;
    return pctUrl;
  } else {
    const pctUrl =
      `${ytsAdd}/list_movies.json?limit=50&page=${page}&quality=720p,1080p` +
      `?sort_by=${sort}` +
      `&genre=${genresString}` +
      `&order_by=${order === "asc" ? order : "des"}` +
      `&query_term=${keywords ? keywords.trim() : ""}`;
    return pctUrl;
  }
};

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
