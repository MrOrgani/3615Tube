import React from "react"; // , { useRef }
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

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
    <>
      <Skeleton
        variant="rect"
        width={300}
        height={100}
        style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
      />
      {/* <Box pt={0.5}>
        <Skeleton style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }} />
        <Skeleton
          width="60%"
          style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
        />
      </Box> */}
    </>
  );
  return (
    // <Box key={index} width={185} mx={1}>
    <>{typeOfSkel === "movie" ? MovieSkel : ComSkel}</>
  );
};

export default MovieItemSkeleton;
