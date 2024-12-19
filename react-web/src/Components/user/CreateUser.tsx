import { useState } from "react";
import UserDetails from "./UserDetails";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import {useDispatch} from "react-redux";
import {CreateUserAmin} from "../Redux/UserSlice.tsx";

const CreateUser: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
}> = ({ open, onClose, onSave }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [fullname, setfullname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
const dispatch=useDispatch()
  const handleSave = async () => {
    const user = {
      username,
      password,
      email,
      phonenumber,
      fullname,
      gender,
      dob,
    };
    await dispatch(CreateUserAmin(user));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Phone Number"
          value={phonenumber}
          onChange={(e) => setphonenumber(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Full Name"
          value={fullname}
          onChange={(e) => setfullname(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Gender"
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </TextField>
        <TextField
          label="Date of Birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="dense"
        />
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
