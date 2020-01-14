import React, { useContext } from "react";
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
  TextField,
  Button
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { genreList, orderKeyList, orderValueList } from "../../common";
import { Formik, Form } from "formik";
import { MovieListContext } from "../../pages/context";

interface FilmOptionType {
  firstLetter: string;
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

const MovieListFilters = ({ filterList }: any) => {
  const classes = useStyles();
  const [filters] = useContext(MovieListContext) as any;

  // console.log("filters are : ", filters);

  return (
    <Grid item container xl={12}>
      <Paper className="filters-box">
        <Formik
          initialValues={filters}
          onSubmit={async (values, actions) => {
            values.order = { [values.orderKey]: values.orderValue };
            filterList({ variables: values });
          }}
          validateOnChange={false}
          validateOnBlur={false}
          //   validationSchema={ProfileSchema}
        >
          {({ isSubmitting, values, setFieldValue }) => {
            return (
              <Form>
                <Grid container justify="space-evenly" alignItems="center">
                  <Grid item>
                    <Typography id="range-slider" gutterBottom>
                      Year release
                    </Typography>
                    <Slider
                      value={values.year}
                      onChange={(_, value) => setFieldValue("year", value)}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={1900}
                      max={2020}
                      name={"year"}
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
                        name="keywords"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput
                        }}
                        inputProps={{ "aria-label": "search" }}
                        onChange={event =>
                          setFieldValue("keywords", event.target.value)
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item>
                    <Autocomplete
                      id="combo-box-genres"
                      options={genreList}
                      getOptionLabel={(option: FilmOptionType) => option + ""}
                      style={{ width: 200 }}
                      defaultValue={values.genres}
                      onChange={(_: any, value: string) =>
                        setFieldValue("genres", value)
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Genre"
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Typography id="range-slider" gutterBottom>
                      Rating
                    </Typography>
                    <Slider
                      name="rating"
                      value={values.rating}
                      onChange={(_, value) => setFieldValue("rating", value)}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={100}
                      // getAriaValueText={valuetext}
                    />
                  </Grid>
                  <Grid item>
                    <Autocomplete
                      id="combo-box-orderKey"
                      options={orderKeyList}
                      getOptionLabel={(option: FilmOptionType) => option + ""}
                      style={{ width: 200 }}
                      defaultValue={values.orderKey}
                      onChange={(_: any, value: string) =>
                        setFieldValue("orderKey", value)
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Combo box"
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Autocomplete
                      id="combo-box-orderValue"
                      options={orderValueList}
                      getOptionLabel={(option: FilmOptionType) => option + ""}
                      style={{ width: 200 }}
                      defaultValue={values.orderValue}
                      onChange={(_: any, value: string) =>
                        setFieldValue("orderValue", value)
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Combo box"
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      // className={classes.submit}
                      disabled={isSubmitting}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default MovieListFilters;
