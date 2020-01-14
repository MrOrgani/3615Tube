import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

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

export default FieldInput;
