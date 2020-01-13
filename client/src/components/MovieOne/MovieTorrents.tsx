import React, { useEffect, useRef } from "react";
import { Typography, Grid, Paper, ButtonBase } from "@material-ui/core";

const MovieTorrents = ({ data: { torrents } }: any) => {
  return (
    <>
      <Typography variant="h4" style={{ color: "white" }}>
        torrents
      </Typography>
      <Grid
        container
        style={{
          maxHeight: "20vh",
          overflow: "auto"
        }}
      >
        {torrents.map((torrent: any, index: number) => {
          return (
            <ButtonBase
              key={`torrent-index${index}`}
              style={{ minWidth: "-moz-available", height: "50px" }}
            >
              <Paper
                style={{
                  minWidth: "-moz-available",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                audio:{" "}
                {torrent.language === "fr" ? (
                  <span role="img" aria-label="france">
                    🇫🇷
                  </span>
                ) : (
                  <span role="img" aria-label="UK">
                    🇬🇧
                  </span>
                )}{" "}
                | {torrent.quality} | {torrent.seed} seeds | {torrent.peer} peer
              </Paper>
            </ButtonBase>
          );
        })}
      </Grid>
    </>
  );
};

export default MovieTorrents;
