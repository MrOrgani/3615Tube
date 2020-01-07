import React from "react";

const MovieInfo = ({ data }: any) => {
  return (
    <>
      <div className="player-info">{JSON.stringify(data, null, 2)}</div>
    </>
  );
};

export default MovieInfo;
