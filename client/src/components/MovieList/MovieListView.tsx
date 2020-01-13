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
    <Grid item container lg={12}>
      {// ********************* FILTERS ********************************
      userIsConnected && pathname.includes("/movie") && (
        <MovieListFilters filterList={filterList} />
      )}
      {// IF LOADING ---> SKELETON
      loading &&
        Array.from(new Array(20)).map((_, index: any) => (
          <Box key={index} width={185} mx={1}>
            {MovieSkeletonItem}
          </Box>
        ))}
      {// IF !LOADING ---> RENDER DATA
      data &&
        Array.from(data).map((item: any, index: any) => (
          <Box
            key={index}
            width={185}
            mx={1}
            onClick={() => history.push(`/movie/${item.imdbId}`)}
            // className="movie-box"
          >
            <>
              <div className="movie-box">
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
                      // noWrap
                      style={{
                        // width: "100%",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 12,
                        WebkitBoxOrient: "vertical"
                        // position: "absolute"
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
  );
};

export default MovieListView;
