import React from "react";

import { Grid, Paper, Typography, Button } from "@material-ui/core";

interface Movie {
  title: string
  image: string
  date: string
  summary: string
}

const MovieItem = ({ title, image, date, summary }: Movie) => {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Paper className={"card"}>
        <img className={"cardMedia"} src={image} alt={title} />
        <div className={"cardContent"}>
          <div className={"cardDetails"}>
            <Typography gutterBottom component="h1" className={"cardTitle"}>
              {title}
            </Typography>
            <Typography className={"textDate"}>{date}</Typography>
            <Typography className={"textSummary"}>{summary}</Typography>
          </div>
          <Button size="small" className={"buttonMore"}>
            More Info
          </Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default MovieItem;
