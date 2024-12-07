import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

type UserUpdateProps = {
  open: boolean;
  onClose: () => void;
  user: {
    Name: string;
    Email: string;
    Phone: string;
    Status: string;
    Role: string;
    Country: string;
    City: string;
    State: string;
    Address: string;
    ZipCode: string;
  } | null; // Allow user to be null
  onUpdate: (updatedUser: any) => void;
};

const UserUpdate: React.FC<UserUpdateProps> = ({ open, onClose, user, onUpdate }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  // Cập nhật trạng thái chỉ khi user không phải là null
  React.useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    } else {
      setUpdatedUser(null); // Đảm bảo updatedUser là null nếu user là null
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (updatedUser) {
        setUpdatedUser({ ...updatedUser, [name]: value });
    }
  };

  const updateUser = (userData: any) => {
    // Logic to update the user, e.g., API call
    console.log("User updated:", userData);
  };

  const handleSubmit = () => {
    updateUser(updatedUser);
    onUpdate(updatedUser);
    onClose();
  };

  // If user is null, return null or a loading state
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Quick Update</DialogTitle>
      <DialogContent>
        <TextField
          name="Name"
          label="Full name"
          value={updatedUser ? updatedUser.Name : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="Email"
          label="Email address"
          value={updatedUser ? updatedUser.Email : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="Phone"
          label="Phone number"
          value={updatedUser ? updatedUser.Phone : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          name="Status"
          label="Status"
          value={updatedUser ? updatedUser.Status : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Banned">Banned</MenuItem>
        </TextField>
        <TextField
          name="Role"
          label="Role"
          value={updatedUser ? updatedUser.Role : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="Country"
          label="Country"
          value={updatedUser ? updatedUser.Country : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="State"
          label="State/Region"
          value={updatedUser ? updatedUser.State : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="City"
          label="City"
          value={updatedUser ? updatedUser.City : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="Address"
          label="Address"
          value={updatedUser ? updatedUser.Address : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="Zip"
          label="Zip/Code"
          value={updatedUser ? updatedUser.ZipCode : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserUpdate;