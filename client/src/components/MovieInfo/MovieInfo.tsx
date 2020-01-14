import React, { useState, useEffect, useContext } from "react";
import { Typography, Grid, Chip, Paper, Avatar } from "@material-ui/core";
import axios from "axios";
import { MovieContext } from "../../pages/context";
import image from "../../assets/images/avatar.png";

const MovieInfo = ({ data }: any) => {
  const imdbId = useContext(MovieContext);
  const [castInfo, setCastInfo] = useState([]) as any;
  const [crewInfo, setCrewInfo] = useState([]) as any;

  useEffect(() => {
    const getCastAndCrew = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${imdbId}/credits?api_key=7d2a25a20cce518da4384c007bd8cd69`
      );
      setCastInfo(data.cast.slice(0, 8));
      setCrewInfo(data.crew.slice(0, 8));
    };
    getCastAndCrew();
  }, [imdbId, setCrewInfo, setCastInfo]);

  console.log("castInfo", castInfo);
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
<<<<<<< HEAD
          src={data.poster}
=======
          src={poster}
>>>>>>> 5230dccb96b3d1d58db2a24d43ada4bf33f1b576
          alt="moviePoster"
        />
        <Grid item xl container style={{ padding: "0 14px" }}>
          {/***********  TITLE ********************/}
          <Grid item container justify="flex-start">
<<<<<<< HEAD
            <Typography variant="h2">{data.title}</Typography>
=======
            <Typography variant="h2">{title}</Typography>
>>>>>>> 5230dccb96b3d1d58db2a24d43ada4bf33f1b576
          </Grid>
          {/***********  INFOS ********************/}
          <Grid item container>
            <Typography variant="h6">
<<<<<<< HEAD
              {data.year} | ⭐️ {data.rating} |{" "}
              {data.genres.map((element: string, index: number) => (
=======
              {year} | ⭐️ {rating} |{" "}
              {genres.map((element: string, index: number) => (
>>>>>>> 5230dccb96b3d1d58db2a24d43ada4bf33f1b576
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
<<<<<<< HEAD
              {data.synopsis}
=======
              {synopsis}
>>>>>>> 5230dccb96b3d1d58db2a24d43ada4bf33f1b576
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xl>
<<<<<<< HEAD
        <div>Crew</div>
        <Grid item container justify="space-evenly">
          {crewInfo.map((pers: any, index: number) => (
            <Grid key={`${index}-Crew`} item>
              <Paper style={{ height: 80, width: 100 }}>
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
        <div>Cast</div>
        <Grid item container justify="space-evenly">
          {castInfo.map((pers: any, index: number) => (
            <Grid key={`${index}-Cast`} item>
              <Paper style={{ height: 80, width: 100 }}>
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
=======
        <Grid item container xs={12}>
          Crew
          {/* {crew.map((value: any) => (
            <Grid key={value} item>
              <Paper style={{ height: 140, width: 100 }} />
            </Grid>
          ))} */}
        </Grid>
        <Grid item container xs={12}>
          Cast
>>>>>>> 5230dccb96b3d1d58db2a24d43ada4bf33f1b576
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieInfo;
