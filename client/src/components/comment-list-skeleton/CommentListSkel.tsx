import React from "react";
import { Grid, Box, Card, CardHeader } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import "./MoviesListSkeleton.styles.scss";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
  history?: any;
}

const CommentListSkeleton = (props: MediaProps) => {
  const {
    loading = false,
    data,
    nbOfItem
    // history
  } = props;
  const result = !loading && data ? data : Array.from(new Array(nbOfItem || 5));

  return (
    <Grid container item lg={12} md={5} direction="column">
      {Array.from(result).map((item: any, index: any) => (
        <Box key={index} my={0.5}>
          <Card style={{ backgroundColor: "rgba(177, 177, 177, 0.2)" }}>
            <CardHeader
              avatar={
                loading || !item ? (
                  <Skeleton variant="circle" width={40} height={40} />
                ) : (
                  item.avatar
                )
              }
              title={
                loading || !item ? (
                  <Skeleton
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                ) : (
                  item.login
                )
              }
              subheader={
                loading || !item ? (
                  <Skeleton height={10} width="40%" />
                ) : (
                  "5 hours ago"
                )
              }
            />
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default CommentListSkeleton;
