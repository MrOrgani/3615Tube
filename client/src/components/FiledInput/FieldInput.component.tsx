// import React from "react";
// import { TextField } from "@material-ui/core";
// import { FieldProps } from "formik";

//  const FieldInput: React.SFC<
//  FieldProps<any> & {
//    label?: string;
//    useNumberComponent?: boolean;
//  }
// > = (
//   {
//   field,
//   form: { touched, errors,
//   }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//   label,
//   // useNumberComponent = false,
//   ...props
// }
// ) => {
//   const errorMsg = touched[field.name] && errors[field.name];
//   return (
//     <TextField
//       label={label}
//       error={errorMsg ? true : false}
//       helperText={errorMsg}
//       variant='standard'
//       {...field}
//       style={errorMsg ? {color:"red"} : {color:"green"}}
//       {...props}
//       />
//   );
// };

// export default FieldInput;

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
      label={props.label}
      error={errorMsg ? true : false}
      helperText={errorMsg}
      {...props.field}
      {...props}
    />
  );
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputs);
