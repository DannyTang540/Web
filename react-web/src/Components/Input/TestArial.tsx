import { TextField } from "@mui/material";
import React from "react";

const TestArial = ({ title, value, setvalue }) => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label={title}
      type="text"
      value={value}
      onChange={(e) => setvalue(e.target.value)}
      fullWidth
      multiline
      rows={4}
    />
  );
};

export default TestArial;
