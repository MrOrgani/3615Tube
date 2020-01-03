import React from "react";
import {
  Grid,
  Box
  // Typography
} from "@material-ui/core";
// import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

// import "./MoviesListSkeleton.styles.scss";
import MovieItemSkeleton from "../../components/movie-skeleton/movie-skeleton.component";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
}

const MovieComments = (props: MediaProps) => {
  const { loading = false, data, nbOfItem } = props;
  const result = !loading && data ? data : Array.from(new Array(nbOfItem || 3));

  return (
    <Grid
      direction="column"
      alignItems="stretch"
      justify="flex-start"
      container
      item
      lg={2}
      md={5}
    >
      {Array.from(new Array(3)).map((index: number) => (
        <Box key={index} width={185} mx={1}>
          <>
            <div className="movie-box">
              <div>Avatar de l'auteur du comment</div>
              <div> Login </div>
              <div> Text </div>
            </div>
          </>
        </Box>
      ))}
      {Array.from(result).map((item: any, index: any) => (
        <Box key={index} width={185} mx={1}>
          {item ? (
            <>
              <div className="movie-box">
                <div>Avatar de l'auteur du comment</div>
                <div> Login</div>
                <div> Text </div>
              </div>
              {/* <Box pr={2}>
                <Typography
                  variant="body2"
                  style={{ color: "white" }}
                  align="center"
                >
                  {item.title}
                </Typography>
              </Box> */}
            </>
          ) : (
            <MovieItemSkeleton typeOfSkel="comment" />
          )}
        </Box>
      ))}
    </Grid>
  );
};

export default MovieComments;
