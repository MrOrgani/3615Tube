import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Chip,
  Paper,
  Avatar,
  Container
} from "@material-ui/core";
import axios from "axios";
import image from "../../assets/images/avatar.png";

const MovieInfo = ({ movieInfo }: any) => {
  const [castInfo, setCastInfo] = useState([]) as any;
  const [crewInfo, setCrewInfo] = useState([]) as any;

  useEffect(() => {
    let isSubscribed = true;
    const getCastAndCrew = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieInfo.imdbId}/credits?api_key=7d2a25a20cce518da4384c007bd8cd69`
      );
      isSubscribed && setCastInfo(data.cast.slice(0, 8));
      isSubscribed && setCrewInfo(data.crew.slice(0, 8));
    };
    getCastAndCrew();
    return () => {
      isSubscribed = false;
    };
  }, [movieInfo.imdbId, setCrewInfo, setCastInfo]);

  return (
    <Container maxWidth="md">
      <Grid
        container
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(90, 92, 106, 0.24) 0%, rgba(32, 45, 58, 0.2) 81.3%)",
          borderRadius: "10px"
        }}
        justify="center"
        alignItems="center"
      >
        <Grid item container justify="center">
          {/***********  POSTER ********************/}
          <img
            style={{
              width: "200px",
              height: "auto"
            }}
            src={movieInfo.poster}
            alt="moviePoster"
          />
          <Grid item xl container style={{ padding: "0 14px" }}>
            {/***********  TITLE ********************/}
            <Grid item container justify="flex-start">
              <Typography variant="h2" style={{ color: "white" }}>
                {movieInfo.title}
              </Typography>
            </Grid>
            {/***********  INFOS ********************/}
            <Grid item container>
              <Typography variant="h6" style={{ color: "white" }}>
                {movieInfo.year} | ⭐️ {movieInfo.rating} |{" "}
                {movieInfo.genres.map((element: string, index: number) => (
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
                  fontStyle: "italic",
                  color: "white"
                }}
              >
                {movieInfo.synopsis}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xl>
          <Typography variant="h6" color="primary">
            Crew
          </Typography>
          <Grid item container justify="space-evenly">
            {crewInfo.map((pers: any, index: number) => (
              <Grid key={`${index}-Crew`} item>
                <Paper
                  style={{
                    height: "auto",
                    width: 100,
                    minHeight: "85px",
                    margin: "5px 0px"
                  }}
                >
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{ textAlign: "center" }}
                  >
                    <Grid item container xs={12} justify="center">
                      <Avatar
                        alt="Pict"
                        src={
                          pers.profile_path
                            ? `https://image.tmdb.org/t/p/w500${pers.profile_path}`
                            : image
                        }
                      />
                    </Grid>
                    <Grid item xs={12} style={{ fontSize: "12px" }}>
                      {pers.name}
                    </Grid>
                    <Grid item xs={12} style={{ fontSize: "10px" }}>
                      {pers.job}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" color="primary">
            Cast
          </Typography>
          <Grid item container justify="space-evenly">
            {castInfo.map((pers: any, index: number) => (
              <Grid key={`${index}-Cast`} item>
                <Paper
                  style={{
                    height: "auto",
                    width: 100,
                    minHeight: "85px",
                    margin: "5px 0px"
                  }}
                >
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{ textAlign: "center" }}
                    item
                  >
                    <Grid item container xs={12} justify="center">
                      <Avatar
                        alt="Pict"
                        src={
                          pers.profile_path
                            ? `https://image.tmdb.org/t/p/w500${pers.profile_path}`
                            : image
                        }
                      />
                    </Grid>
                    <Grid item xs={12} style={{ fontSize: "12px" }}>
                      {pers.name}
                    </Grid>
                    <Grid item xs={12} style={{ fontSize: "10px" }}>
                      {pers.character}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieInfo;
