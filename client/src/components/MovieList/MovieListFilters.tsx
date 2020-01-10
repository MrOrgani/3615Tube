import React from "react";
import {
  Grid,
  Typography,
  Slider,
  Paper,
  makeStyles,
  Theme,
  createStyles,
  fade,
  InputBase,
  TextField
} from "@material-ui/core";
import classes from "*.module.css";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { genreList } from "../../common";

interface FilmOptionType {
  title: string;
  year: number;
}

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200
        }
      }
    }
  });
});

const MovieListFilters = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([1900, 2020]);

  const handleChange = (_: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Grid item container xl={12}>
      <Paper className="filters-box">
        <Grid container>
          <Grid item>
            <Typography id="range-slider" gutterBottom>
              Year release
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={1900}
              max={2020}
              // getAriaValueText={valuetext}
            />
          </Grid>
          <Grid item>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
          <Grid item>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={genreList}
              getOptionLabel={(option: FilmOptionType) => option.title}
              defaultValue={genreList[0]}
              filterSelectedOptions
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="filterSelectedOptions"
                  placeholder="Favorites"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MovieListFilters;
