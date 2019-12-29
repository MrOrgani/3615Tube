import React from "react";
// import MovieController from "./../../controller/MovieController";
import MovieView from "./MovieView";

const MovieConnector = (props: any) => {
  console.log("Movie Connector, ", props);
  // console.log("MovieConnector, userId : ", props);
  //   const { history } = props;

  //   const onFinish = () => {
  //     history.push(
  //       "/profile"
  //       // {
  //       // message: "check your email to confirm your account"
  //       // }
  //     );
  //   };

  //   const { movieId } = props;
  return (
    // <MovieController movieId={movieId}>
    //   {({ movieInfo }) => (
    <MovieView
    //   movieInfo={movieInfo}
    //  submit={submit} onFinish={onFinish}
    />
    //   )}
    // </MovieController>
  );
};

export default MovieConnector;
