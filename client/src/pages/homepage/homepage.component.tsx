import React from "react";
import "./homepage.styles.scss";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import InputIcon from "@material-ui/icons/Input";

const HomePage = () => {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          minWidth: "100%",
          minHeight: "100%",
          zIndex: -1
        }}
      >
        <source src="movie.mp4" type="video/mp4" />
      </video>
      <Container maxWidth="sm">
        <Grid
          container
          style={{ textAlign: "center", height: "50vh" }}
          alignItems="center"
        >
          <Grid container item alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h2"
                style={{
                  background: "-webkit-linear-gradient(#eee, #333)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                3615Tube
              </Typography>
            </Grid>

            <Grid item xs={12} container justify="space-evenly">
              <Link to="/login">
                <Button variant="contained" color="secondary">
                  <InputIcon /> Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="contained" color="secondary">
                  <InputIcon /> Register
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
