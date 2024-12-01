import React, { useState } from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const SelectInput = ({
    options,
    title,
                     }) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    /*<select
      value={selectedValue}
      onChange={(e) => setSelectedValue(e.target.value)}
    >
      <option value="" disabled></option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>*/
      <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{title}</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={title}
/*
                  onChange={handleChange}
*/
              >
                  {
                      options.map((option, index) => (
                          <MenuItem key={index} value={option}>
                              {option}
                          </MenuItem>
                      ))
                  }
              </Select>
          </FormControl>
      </Box>
  );
};

export default SelectInput;
