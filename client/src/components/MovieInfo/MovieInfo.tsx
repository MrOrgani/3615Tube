import React from "react";
import { Typography, Grid, Chip } from "@material-ui/core";

const MovieInfo = ({
  data: {
    title,
    year,
    synopsis,
    // rating,
    genres,
    poster
  }
}: any) => {
  return (
    <Grid
      container
      style={{
        // minHeight: "-webkit-fill-available",
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(90, 92, 106, 0.24) 0%, rgba(32, 45, 58, 0.2) 81.3%)",
        borderRadius: "10px"
        // flexGrow: 1
      }}
      justify="center"
      alignItems="center"
    >
      <Grid item container justify="flex-start">
        {/***********  POSTER ********************/}
        <img
          style={{
            width: "200px",
            height: "auto"
          }}
          src={poster}
          alt="moviePoster"
        />
        <Grid item xl container style={{ padding: "0 14px" }}>
          {/***********  TITLE ********************/}
          <Grid item container justify="flex-start">
            <Typography variant="h2">{title}</Typography>
          </Grid>
          {/***********  INFOS ********************/}
          <Grid item container>
            <Typography variant="h6">
              {year} | ⭐️ -fake- 9.5 |{" "}
              {genres.map((element: string, index: number) => (
                <Chip key={index} label={element} />
              ))}
            </Typography>
          </Grid>
          {/***********  SYNOPSIS ********************/}
          <Grid item>
            <Typography
              variant="body2"
              style={{
                // padding: "0 10px",
                textAlign: "justify",
                fontStyle: "italic"
              }}
            >
              {synopsis}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* <Typography variant="h6">{rating}</Typography> */}
    </Grid>
  );
};

export default MovieInfo;
