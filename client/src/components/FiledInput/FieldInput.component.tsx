import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

// const styles = {
//   // root: {
//   //   background: "none"
//   // },
//   input: {
//     color: "white"
//   }
// };

function FieldInput(props: any) {
  const { grid } = props;
  const errorMsg =
    props.form.touched[props.field.name] && props.form.errors[props.field.name];
  return (
    <Grid item xs={12} sm={grid ? grid.sm : 12}>
      <TextField
        variant="outlined"
        input={props.input}
        fullWidth
        label={props.label}
        error={errorMsg ? true : false}
        helperText={errorMsg}
        name={props.name}
        {...props.field}
        {...props}
      />
    </Grid>
  );
}

// FieldInput.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default FieldInput;
