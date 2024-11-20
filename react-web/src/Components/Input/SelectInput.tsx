import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectInput = ({title}) => {
  return (
    <FormControl fullWidth margin="dense">
      <InputLabel id="age-select-label">{title}</InputLabel>
      <Select
        labelId="age-select-label"
        // id="age-select"
        // value={age}
        // onChange={handleAgeChange}
        label="Category"
        size="medium" // Kích thước
        required // Bắt buộc chọn
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectInput;
