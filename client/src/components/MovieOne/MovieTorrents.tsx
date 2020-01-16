import React, { useContext } from "react";
import { Typography, Grid, Paper, ButtonBase } from "@material-ui/core";
import { TorrentContext } from "../context";

const MovieTorrents = ({ parsedTorrents }: any) => {
  const [, setSrcTorrent] = useContext(TorrentContext) as any;

  console.log("MovieTorrents torrents", parsedTorrents);

  return (
    // <>
    <Grid container alignItems="flex-start">
      <Typography variant="h4" style={{ color: "white" }}>
        torrents
      </Typography>
      <Grid container justify="center" alignItems="flex-start" spacing={1}>
        {parsedTorrents.map((torrent: any, index: number) => {
          return (
            <Grid
              key={`torrent-index${index}`}
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ButtonBase
                style={{ minWidth: "-moz-available", height: "50px" }}
                onClick={() => setSrcTorrent(torrent.magnet)}
              >
                <Paper
                  style={{
                    // minWidth: "-moz-available",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // width: "20vw",
                    minWidth: "max-content"
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
                  | {torrent.quality} | {torrent.seed} seeds | {torrent.peer}{" "}
                  peer
                </Paper>
              </ButtonBase>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
    // </>
  );
};

export default MovieTorrents;
