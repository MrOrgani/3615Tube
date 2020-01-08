// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????
// A SUPPRIMER ????

import React from "react";
import {
  Grid,
  Box
  // Typography
} from "@material-ui/core";
import CommentList from "../comment-list-skeleton/CommentListSkel";
// import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

// import "./MoviesListSkeleton.styles.scss";
// import MovieItemSkeleton from "../../components/movie-skeleton/movie-skeleton.component";

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
      lg={9}
      md={5}
    >
      {Array.from(new Array(3)).map(() => (
        // index: number
        // <Box key={index} width={300} mx={5}>
        <Grid
          direction="row"
          alignItems="stretch"
          // justify="center"
          container
          // lg={9}
        >
          {/* <div> */}
          <div>Avatar</div>
          <div> Login </div>
          <div> Text </div>
          {/* </div> */}
        </Grid>
        // </Box>
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
            <CommentList loading nbOfItem={5} />
          )}
        </Box>
      ))}
      {/* // </div> */}
    </Grid>
  );
};

export default MovieComments;
