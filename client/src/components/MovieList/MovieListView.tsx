import React, { useContext } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

import "./MoviesListSkeleton.styles.scss";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserContext } from "../../pages/context";
import MovieListFilters from "./MovieListFilters";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
  history?: any;
  filterList?: any;
}

const MovieSkeletonItem = (
  <>
    <Skeleton
      variant="rect"
      width={185}
      height={278}
      style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
    />
    <Box pt={0.5}>
      <Skeleton style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }} />
      <Skeleton
        width="60%"
        style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
      />
    </Box>
  </>
);

const MovieListView = ({ data, history, loading, filterList }: MediaProps) => {
  const userIsConnected = useContext(UserContext);
  const { pathname } = window.location;

  return (
    <Grid item container lg={12} md={5}>
      {// IF LOADING ---> SKELETON
      loading &&
        Array.from(new Array(20)).map((_, index: any) => (
          <Box key={index} width={185} mx={1}>
            {MovieSkeletonItem}
          </Box>
        ))}
      {// ********************* FILTERS ********************************
      userIsConnected && pathname.includes("/movie") && (
        <MovieListFilters filterList={filterList} />
      )}
      {// IF !LOADING ---> RENDER DATA
      data &&
        Array.from(data).map((item: any, index: any) => (
          <Box key={index} width={185} mx={1}>
            <>
              <div
                className="movie-box"
                onClick={() => history.push(`/movie/${item.imdbId}`)}
              >
                <img
                  style={{ width: 185, height: 278 }}
                  alt={item.title}
                  src={item.poster ? item.poster : null}
                  className="poster"
                />
                <div className="hover-info">
                  <div
                    style={{
                      zIndex: 99999
                    }}
                  >
                    {item.vote_average}
                    <StarOutlinedIcon
                      fontSize={"large"}
                      style={{
                        color: "yellow",
                        position: "absolute",
                        zIndex: 5,
                        fontSize: "60px"
                      }}
                    />
                  </div>
                </div>
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
  );
};

export default MovieListView;
