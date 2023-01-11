import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ name, label, error, ...rest }) => {
  // console.log("{ ...rest }", { ...rest });

  return (
    <TextField
      {...rest}
      name={name}
      label={label}
      error={error}
      id={name}
      variant="outlined"
      fullWidth
    />
  );
};

export default InputField;
