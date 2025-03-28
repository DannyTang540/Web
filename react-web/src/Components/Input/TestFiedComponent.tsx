import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const TestFiedComponent = ({ value, setvalue, title, placeholder }) => {
  return (
    <TextField
      autoFocus
      placeholder={placeholder}
      margin="dense"
      id="name"
      label={title}
      type="text"
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      onChange={(e) => setvalue(e.target.value)}
      fullWidth
    />
  );
};

export default TestFiedComponent;
