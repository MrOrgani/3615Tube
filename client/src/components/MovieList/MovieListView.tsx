import React, { useContext } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

import "./MoviesListSkeleton.styles.scss";
import { UserContext } from "../context";
import MovieListFilters from "./MovieListFilters";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
  history?: any;
  filterList?: any;
  loadMore: () => void;
}

const MovieListView = ({ data, history, filterList }: MediaProps) => {
  const userIsConnected = useContext(UserContext);
  const { pathname } = window.location;

  return (
    <>
      <Grid item container lg={12} justify="center">
        {// ********************* FILTERS ********************************
        userIsConnected && pathname === "/movies" && (
          <MovieListFilters filterList={filterList} />
        )}
        {// IF !LOADING ---> RENDER DATA
        data &&
          Array.from(data).map((item: any, index: any) => (
            <Box
              key={index}
              width={185}
              mx={1}
              onClick={() => history.push(`/movie/${item.imdbId}`)}
            >
              <>
                <div className={`movie-box ${data[index].seen ? "seen" : ""}`}>
                  <img
                    style={{ width: 185, height: 278 }}
                    alt={item.title}
                    src={item.poster ? item.poster : null}
                    className="poster"
                  />
                  <Grid
                    container
                    className="hover-info"
                    direction="column"
                    style={{ width: "185px", height: "278px" }}
                  >
                    <Grid
                      item
                      container
                      justify="center"
                      alignItems="flex-start"
                      style={{ margin: "10px 0px" }}
                    >
                      <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        xs
                      >
                        <Grid item>
                          <StarOutlinedIcon
                            fontSize={"small"}
                            style={{
                              color: "yellow",
                              zIndex: 5,
                              fontSize: "20px"
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          style={{
                            zIndex: 99999
                          }}
                        >
                          {item.rating}
                        </Grid>
                      </Grid>
                      <Grid item xs style={{ textAlign: "center" }}>
                        {item.year}
                      </Grid>
                    </Grid>
                    <Grid item xl style={{ margin: "0 10px" }}>
                      <Typography
                        align="justify"
                        variant="caption"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 11,
                          WebkitBoxOrient: "vertical"
                        }}
                      >
                        {item.synopsis}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <Box pr={2}>
                  <Typography
                    variant="body2"
                    style={{ color: "white" }}
                    align="center"
                  >
                    {item.title}
                  </Typography>
                </Box>
              </>
            </Box>
          ))}
      </Grid>
    </>
  );
};

export default MovieListView;
