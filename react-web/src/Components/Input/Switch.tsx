import * as React from 'react';
import Switch from '@mui/material/Switch';
import { FormControlLabel, FormGroup } from '@mui/material';

const ControlledSwitches=({checked,setChecked,lable})=> {
console.log(lable)
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormGroup>
  <FormControlLabel control={
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />} label={lable} />
</FormGroup>

  );
}
export default ControlledSwitches;
