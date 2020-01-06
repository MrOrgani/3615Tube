import React from "react";
import { Grid, Box } from "@material-ui/core";
// import Skeleton from "@material-ui/lab/Skeleton";
// import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

import "./MoviesListSkeleton.styles.scss";
// import MovieItemSkeleton from "../../components/movie-skeleton/movie-skeleton.component";
import Skeleton from "@material-ui/lab/Skeleton";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
  history?: any;
}

const Media = (props: MediaProps) => {
  const { nbOfItem } = props;
  const result = Array.from(new Array(nbOfItem || 3));

  return (
    <Grid container item lg={12} md={5}>
      {Array.from(result).map((index: any) => (
        <Box key={index} width={185} mx={1}>
          <>
            <Skeleton
              variant="rect"
              width={185}
              height={278}
              style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
            />
            <Box pt={0.5}>
              <Skeleton
                style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
              />
              <Skeleton
                width="60%"
                style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
              />
            </Box>
          </>
        </Box>
      ))}
    </Grid>
  );
};

export default Media;
