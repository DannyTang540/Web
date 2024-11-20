import { TextField } from "@mui/material";
import React from "react";

const TestFiedComponent = ({ value, setvalue,title,placeholder }) => {
  return (
    <TextField
      autoFocus
      placeholder={placeholder}
      margin="dense"
      id="name"
      label={title}
      type="text"
      value={value}
      onChange={(e) => setvalue(e.target.value)}
      fullWidth
    />
  );
};

export default TestFiedComponent;
