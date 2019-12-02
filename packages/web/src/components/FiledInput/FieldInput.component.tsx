import React from "react";
import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";

const FieldInput: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div>
      <TextField
        placeholder={placeholder}
        {...field}
        helperText={errorText}
        error={!!errorText}
        type={placeholder === "Password" ? "password" : ""}
        autoComplete={placeholder === "Password" ? "on" : ""}
      />
    </div>
  );
};

export default FieldInput;
