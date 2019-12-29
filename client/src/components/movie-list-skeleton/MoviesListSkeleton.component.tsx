import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
// import Skeleton from "@material-ui/lab/Skeleton";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

import "./MoviesListSkeleton.styles.scss";
import MovieItemSkeleton from "../../components/movie-skeleton/movie-skeleton.component";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
}

const Media = (props: MediaProps) => {
  const { loading = false, data, nbOfItem } = props;
  const result = !loading && data ? data : Array.from(new Array(nbOfItem || 3));

  return (
    <Grid container item lg={12} md={5}>
      {Array.from(result).map((item: any, index: any) => (
        <Box key={index} width={185} mx={1}>
          {item ? (
            <>
              <div className="movie-box">
                <img
                  style={{ width: 185, height: 278 }}
                  alt={item.title}
                  src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`}
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
                  {/* <div>{item.overview}</div> */}
                </div>
              </div>
              <Box pr={2}>
                <Typography
                  // gutterBottom
                  variant="body2"
                  // color="white"
                  style={{ color: "white" }}
                  align="center"
                >
                  {item.title}
                </Typography>
              </Box>
            </>
          ) : (
            <MovieItemSkeleton />
          )}
        </Box>
      ))}
    </Grid>
  );
};

export default Media;
