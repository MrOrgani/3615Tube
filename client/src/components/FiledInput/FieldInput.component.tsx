import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    background: "none"
  },
  input: {
    color: "white"
  }
};

function CustomizedInputs(props: any) {
  const { classes } = props;
  const errorMsg = props.form.touched[props.field.name] && props.form.errors[props.field.name];
  return (
    <TextField
      className={classes.root}
      InputProps={{
        className: classes.input
      }}
      input={props.input}
      label={props.placeholder}
      error={errorMsg ? true : false}
      helperText={errorMsg}
      {...props.field}
      // {...props}
      // placeholder={props.placeholder}
    />
  );
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputs);
