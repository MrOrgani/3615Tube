import React from "react";
import { TextField } from "@material-ui/core";
import { FieldProps } from "formik";

 const FieldInput: React.SFC<
 FieldProps<any> & {
   label?: string;
   useNumberComponent?: boolean;
 }
> = (
  {
  field,
  form: { touched, errors,
  }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  // useNumberComponent = false,
  ...props
}
) => {
  const errorMsg = touched[field.name] && errors[field.name];
  return (
    <TextField
      label={label}
      error={errorMsg ? true : false}
      helperText={errorMsg}
      variant='standard'
      {...field}
      style={errorMsg ? {color:"red"} : {color:"green"}}
      {...props}
      />
  );
};

export default FieldInput;
