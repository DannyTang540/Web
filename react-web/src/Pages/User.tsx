import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BreadcrumbComponent from "../Components/Breadcrumbs/BreadcrumbComponent";
import SelectInput from "../Components/Input/SelectInput";
import TestFiedComponent from "../Components/Input/TestFiedComponent";
import CardProduct from "../Components/Card/CardProduct";
import { Search } from "@mui/icons-material";

const createRow = ["Name", "Phone", "Gender", "Dob", "Role", "Status"];
const Status = [
  { status: "Action", Color: "#59fbd6" },
  { status: "Pending", Color: "#f6d050" },
  { status: "Delete", Color: "#f9556b" },
];
const users = [
  {
    Name: "Angelique Morse",
    Email: "benny89@yahoo.com",
    Image: 1,
    Phone: "+46 8 123 456",
    Gender: "Female",
    Dob: "20/11/2000",
    Role: "Content Creator",
    Status: "Action",
  },
  {
    Name: "Ariana Lang",
    Email: "avery43@hotmail.com",
    Image: 2,
    Phone: "+54 11 1234-5678",
    Gender: "Female",
    Dob: "20/11/2000",
    Role: "IT Administrator",
    Status: "Pending",
  },
  {
    Name: "Aspen Schmitt",
    Email: "mireya13@hotmail.com",
    Image: 3,
    Phone: "+34 91 123 4567",
    Gender: "Female",
    Dob: "20/11/2000",
    Role: "Financial Planner",
    Status: "Delete",
  },
];

const User = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [UserName, setUserName] = useState(String);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const SwtichUserRow = (key: String, user: Object) => {
    switch (key) {
      case "Name":
        return <CardProduct />;
       case "Status":{
      // Tìm màu theo Status
      const statusColor = Status.find((s) => s.status === user.Status)?.Color || "#000";
      return <div
          style={{
            backgroundColor: statusColor, // Thay đổi màu nền
            color: "#fff", // Màu chữ để nổi bật
            padding: "4px 8px",
            borderRadius: "4px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {user.Status}
        </div>
       }
      default:
        return <div>{user[key]}</div>;
    }
  };
  return (
    <div className="p-6 bg-gray-50 w-full flex flex-col">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="h5">User</Typography>
        <Button
          variant="contained"
          color="primary"
          className="!bg-black w-1/2 !capitalize !py-2 !px-4"
        >
          + New User
        </Button>
      </Box>
      <BreadcrumbComponent
        label={[
          { label: "User", final: false },
          { label: "List", final: true },
        ]}
      />
      <TableContainer
        component={Paper}
        className="bg-white rounded-lg shadow-md"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>
                <TestFiedComponent
                  placeholder={"Enter User Name"}
                  title={"User"}
                  value={UserName}
                  setvalue={setUserName}
                />
              </TableCell>
              <TableCell colSpan={2}>
                <SelectInput title={"Role"} />
              </TableCell>
              <TableCell colSpan={2}>
                <SelectInput title={"Status"} />
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#f5f6f8" }}>
              <TableCell>
                <Checkbox />
              </TableCell>
              {createRow.map((item, index) => (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                {createRow.map((item, index) => (
                  <TableCell key={index}>{SwtichUserRow(item, user)}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <BuildIcon sx={{ fontSize: "1rem", color: "#59fbd6" }} />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <DeleteForeverIcon
                        sx={{ fontSize: "1rem", color: "#f37474" }}
                      />{" "}
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
