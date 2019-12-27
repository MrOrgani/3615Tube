import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

import { movieList } from "../../test.js";
import "./MoviesListSkeleton.styles.scss";

interface MediaProps {
  loading?: boolean;
}

const Media = (props: MediaProps) => {
  const { loading = false } = props;
  const result = !loading ? Array.from(new Array(3)) : movieList;

  // console.log("result", result);
  return (
    <Grid
      container
      item
      // zeroMinWidth
      // spacing={2}
      // justify={"center"}
      lg={12}
      md={5}
    >
      {Array.from(result).map((item: any, index: any) => (
        <Box key={index} width={185} mx={1}>
          {item ? (
            <div className="movie-box">
              <img
                style={{ width: 185, height: 278 }}
                alt={item.title}
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`}
                className="poster"
              />
              <div className="hover-info">
                <StarOutlinedIcon
                  fontSize={"large"}
                  style={{
                    color: "yellow",
                    position: "absolute",
                    zIndex: 5,
                    fontSize: "60px"
                  }}
                />
                <div
                  style={{
                    // position: "absolute",
                    // color: "green",
                    zIndex: 99999
                  }}
                >
                  {item.vote_average}
                </div>
              </div>
            </div>
          ) : (
            <Skeleton
              variant="rect"
              width={185}
              height={278}
              style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
            />
          )}
          {item ? (
            <Box pr={2}>
              <Typography
                // gutterBottom
                variant="body2"
                color="secondary"
                align="center"
              >
                {item.title}
              </Typography>
              {/* <Typography
                display="block"
                variant="caption"
                color="textSecondary"
              >
                {item.channel}
              </Typography> */}
              {/* <Typography variant="caption" color="textSecondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography> */}
            </Box>
          ) : (
            <Box pt={0.5}>
              <Skeleton
                style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
              />
              <Skeleton
                width="60%"
                style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
              />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
};

export default function YouTube() {
  return (
    <>
      <Media loading />
      <Media />
    </>
  );
}
