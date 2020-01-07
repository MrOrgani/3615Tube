// A SUPPRIMER

import React from "react"; // , { useRef }
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import { Card, CardHeader } from "@material-ui/core";

// import useStyles from "./styles";
interface Props {
  typeOfSkel: string;
}

const MovieItemSkeleton = (props: Props) => {
  const { typeOfSkel } = props;
  // const '= useStyles(');
  // const elementRef = useRef(null);
  const MovieSkel = (
    <>
      <Skeleton
        variant="rect"
        width={185}
        height={278}
        style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
      />
      <Box pt={0.5}>
        <Skeleton style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }} />
        <Skeleton
          width="60%"
          style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
        />
      </Box>
    </>
  );
  const ComSkel = (
    <Card>
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        title={
          // loading ?
          <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
          // : 'Ted'
        }
        subheader={
          // loading ?
          <Skeleton height={10} width="40%" />
          // : '5 hours ago'
        }
      />
    </Card>
  );
  return <>{typeOfSkel === "movie" ? MovieSkel : ComSkel}</>;
};

export default MovieItemSkeleton;
