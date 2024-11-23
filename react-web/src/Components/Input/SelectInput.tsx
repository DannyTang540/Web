import React, { useState } from "react";

const SelectInput = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <select
      value={selectedValue}
      onChange={(e) => setSelectedValue(e.target.value)}
    >
      <option value="" disabled></option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
