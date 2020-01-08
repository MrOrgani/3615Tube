import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { cpus } from "os";

const MovieInfo = ({
  data: { title, year, synopsis, rating, genres, image }
}: any) => {
  return (
    <>
      <Grid
        item
        xl={2}
        container
        justify="center"
        direction="column"
        alignItems="flex-start"
      >
        <Grid item sm container justify="center">
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item xl>
          <img
            style={{
              maxWidth: "inherit",
              padding: "30px",
              width: "-webkit-fill-available"
            }}
            src={image}
            alt="moviePoster"
          />
        </Grid>
        <Grid item xl>
          {JSON.stringify(data, null, 2)}
        </Grid>
      </Grid>
    </>
  );
};

export default MovieInfo;
