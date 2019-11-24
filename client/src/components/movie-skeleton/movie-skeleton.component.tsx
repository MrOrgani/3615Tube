import React, { useRef } from "react";

import { Grid, Paper } from "@material-ui/core";
import SkeletonItem from "../skeleton-item/skeletom-item.component";

// import useStyles from "./styles";

const MovieItemSkeleton = () => {
  // const '= useStyles(');
  const elementRef = useRef(null);

  return (
    <Grid item xs={12} sm={6} md={6} ref={elementRef}>
      <Paper className={"card"}>
        <SkeletonItem
          className={"cardMedia"}
          style={{ backgroundColor: "#8e8e8e", minWidth: "185px" }}
        />
        <div className={"cardContent"}>
          <div className={"cardDetails"}>
            <SkeletonItem
              style={{ height: "20px", width: "150px" }}
              className={""}
            />
            <SkeletonItem
              className={""}
              style={{ height: "18px", width: "100%", marginTop: "32px" }}
            />
            <SkeletonItem
              className={""}
              style={{ height: "18px", width: "50%", marginTop: "2px" }}
            />
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default MovieItemSkeleton;
