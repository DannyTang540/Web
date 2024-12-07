import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Breadcrumbs,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const users = [
  { id: 1, username: "user1", role: "Admin", status: true },
  { id: 2, username: "user2", role: "User", status: false },
];

const UserRoles = () => {
  return (
    <Grid mt={4}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Account Authorization</Typography>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Breadcrumbs>
            <Link to="/user">User</Link>
            <Typography>User Role</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
    <Box m={2}>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Account Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch checked={user.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Grid>
  );
};

export default UserRoles;
