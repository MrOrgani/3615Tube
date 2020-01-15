import React, { useContext } from "react";
import { Grid, Box } from "@material-ui/core";
// import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

import "./MoviesListSkeleton.styles.scss";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserContext } from "../context";
import MovieListFilters from "./MovieListFilters";
// import { MovieListContext } from "../../pages/context";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
  history?: any;
  filterList?: any;
}

const MovieSkeletonItem = (
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

const MovieListLoading = ({ loading, filterList }: MediaProps) => {
  const userIsConnected = useContext(UserContext);
  const { pathname } = window.location;
  // let [filters] = useContext(MovieListContext) as any;
  // const [load, setLoad] = useState(false);

  return (
    <>
      <Grid item container lg={12} id={"infinite-list"}>
        {// ********************* FILTERS ********************************
        userIsConnected && pathname.includes("/movie") && (
          <MovieListFilters filterList={filterList} />
        )}
        {// IF LOADING ---> SKELETON
        loading &&
          Array.from(new Array(20)).map((_, index: any) => (
            <Box key={index} width={185} mx={1}>
              {MovieSkeletonItem}
            </Box>
          ))}
      </Grid>
    </>
  );
};

export default MovieListLoading;
