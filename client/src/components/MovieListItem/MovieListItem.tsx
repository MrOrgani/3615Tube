import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
// import Skeleton from "@material-ui/lab/Skeleton";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

import "./MoviesListSkeleton.styles.scss";
import Skeleton from "@material-ui/lab/Skeleton";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
  history?: any;
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

const MovieListItem = (props: MediaProps) => {
  const { data, history, loading = false, nbOfItem = 40 } = props;

  const result = !data && loading ? new Array(nbOfItem) : data;

  // console.log("result", result);
  return (
    <Grid item container lg={12} md={5}>
      {Array.from(result).map((item: any, index: any) => (
        <Box key={index} width={185} mx={1}>
          {result ? (
            <>
              <div
                className="movie-box"
                onClick={() => history.push(`/movie/${item.imdb_id}`)}
              >
                <img
                  style={{ width: 185, height: 278 }}
                  alt={item.title}
                  src={item.images ? item.images.poster : null}
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
          ) : (
            MovieSkeletonItem
          )}
        </Box>
      ))}
    </Grid>
  );
};

export default MovieListItem;
