import { request } from "graphql-request";
import { setSessionAndTest } from "../setSessionAndTest";
import Axios, { AxiosInstance } from "axios";
import { pctAdd } from "../../utils/apiGlobals";

const findOneFilmMutation = (imdbId: string) => `
query{
  findOneFilm (imdbId:"${imdbId}")
{
  title
}}`;

export const findOneFilmTest = (
  login: string,
  password: string,
  imdbId: string
) => {
  describe("findOneFilm", () => {
    test("try to fetch a non existant movie", async () => {
      const findOneFilmTest = async () => {
        const response = (await Axios.post(process.env.BACK_HOST, {
          query: findOneFilmMutation("prout")
        })) as any;
        expect(response.data.data.findOneFilm).toEqual(null);
      };
      await setSessionAndTest(login, password, findOneFilmTest, true);
    });
    test("give me a movie", async () => {
      const findOneFilmTest = async () => {
        const response = (await Axios.post(process.env.BACK_HOST, {
          query: findOneFilmMutation(imdbId)
        })) as any;
        expect(response.data.data.findOneFilm).toEqual({
          title: "parasite"
        });
      };
      await setSessionAndTest(login, password, findOneFilmTest, true);
    });
  });
};
