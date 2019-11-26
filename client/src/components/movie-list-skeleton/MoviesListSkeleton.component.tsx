import React from "react";

import { Container, Grid } from "@material-ui/core";

import MovieItemSkeleton from "../movie-skeleton/movie-skeleton.component";

// import useStyles from "./styles";
import "./MoviesListSkeleton.styles.scss";

const MovieListSeleton = () => {
  //   const classes = useStyles();

  return (
    <Container className={"cardGrid"} maxWidth="md">
      {/* <Grid container spacing={4}> */}
      {[...Array(4)].map((movie, key) => (
        <MovieItemSkeleton key={key} />
      ))}
      {/* </Grid> */}
    </Container>
  );
};

export default MovieListSeleton;
