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
  Breadcrumbs,
  Grid,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BreadcrumbComponent from "../Components/Breadcrumbs/BreadcrumbComponent";
import SelectInput from "../Components/Input/SelectInput";
import TestFiedComponent from "../Components/Input/TestFiedComponent";
import CardProduct from "../Components/Card/CardProduct";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import UserUpdate from "../Components/user/UserUpdate";
import { toast } from "react-toastify";

const createRow = ["Name", "Phone", "Gender", "Dob", "Role", "Status"];
const Status = [
  { status: "Active", Color: "#59fbd6" },
  { status: "Pending", Color: "#f6d050" },
  { status: "Delete", Color: "#f9556b" },
];
export const users = [
  {
    Name: "Angelique Morse",
    Email: "benny89@yahoo.com",
    Image: 1,
    Phone: "08-12 34 56",
    Gender: "Female",
    Dob: "20/11/2000",
    Role: "Content Creator",
    Status: "Active",
    Country: "Sweden",
    State: "Virginia",
    City: "Rancho Cordova",
    Address: "908 Jack Locks",
    ZipCode: "85807",
    Company: "Wuckert Inc",
  },
  {
    Name: "Ariana Lang",
    Email: "avery43@hotmail.com",
    Image: 2,
    Phone: "+54 11 1234-5678",
    Gender: "Female",
    Dob: "20/11/2000",
    Role: "IT Administrator",
    Status: "Active",
    Country: "Argentina",
    State: "Buenos Aires",
    City: "Buenos Aires",
    Address: "123 Main St",
    ZipCode: "C1000",
    Company: "Tech Solutions",
  },
  {
    Name: "Aspen Schmitt",
    Email: "mireya13@hotmail.com",
    Image: 3,
    Phone: "+34 91 123 4567",
    Gender: "Female",
    Dob: "20/11/2000",
    Role: "Financial Planner",
    Status: "Active",
    Country: "Spain",
    State: "Madrid",
    City: "Madrid",
    Address: "456 Elm St",
    ZipCode: "28001",
    Company: "Finance Corp",
  },
];

// Define a User type
type UserType = {
  Name: string;
  Email: string;
  Image: number;
  Phone: string;
  Gender: string;
  Dob: string;
  Role: string;
  Status: string;
};

const User = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentMenuEmail, setCurrentMenuEmail] = useState<string | null>(null); // Email của user đang mở menu

  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, email: string) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentMenuEmail(email); // Lưu email của user hiện tại
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setCurrentMenuEmail(null); // Đặt lại email về null
  };

  const handleEditUser = () => {
    if (currentMenuEmail) {
      const user = users.find((u) => u.Email === currentMenuEmail);
      if (user) {
        setSelectedUser(user);
        setIsEditOpen(true);
      }
    }
    handleMenuClose();
  };

  const handleSaveUser = (updatedUser: UserType) => {
    toast.success("User Updated");
    console.log("Updated user:", updatedUser);
    // Cập nhật danh sách users hoặc lưu vào API
    setIsEditOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const SwtichUserRow = (key: string, user: UserType) => {
    const [isHovered, setIsHovered] = useState(false);

    switch (key) {
      case "Name":
        return (
          <Link
            to={`/user/details/${user.Email}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {/* <img src={`/images/user/${user.Image}.png`} alt="User" /> */}
            <img
              src={`https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp`}
              alt="User"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <span
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                fontWeight: isHovered ? "bold" : "normal",
                textDecoration: isHovered ? "underline" : "none",
              }}
            >
              {user.Name}
            </span>
          </Link>
        );
      case "Status": {
        const statusColor =
          Status.find((s) => s.status === user.Status)?.Color || "#000";
        return (
          <div
            style={{
              backgroundColor: statusColor,
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "4px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {user.Status}
          </div>
        );
      }
      default:
        return <div>{user[key as keyof UserType]}</div>;
    }
  };
  console.log("Selected User:", selectedUser);


  return (
    <div className="p-6 bg-gray-50 w-full flex flex-col">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="h5">Users</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 5 }}>
          + New User
        </Button>
      </Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <Typography color="text.primary">Users List</Typography>
      </Breadcrumbs>
      <Grid container justifyContent="center" mt={2} ml={5}>
        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            className="bg-white rounded-lg shadow-md"
            sx={{ width: "100%", borderRadius: "20px" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>
                    <TestFiedComponent
                      placeholder={"Enter User Name"}
                      title={"User"}
                      value={selectedUser?.Name}
                      setvalue={setSelectedUser}
                    />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <SelectInput
                      title={"Role"}
                      options={Status.map((item) => item.status)}
                    />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <SelectInput
                      title={"Status"}
                      options={Status.map((item) => item.status)}
                    />
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
                      <TableCell key={index}>
                        {SwtichUserRow(item, user)}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton onClick={(event) => handleMenuOpen(event, user.Email)}>
                        <MoreVertIcon />
                      </IconButton>
                     <Menu
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl) && currentMenuEmail === user.Email}
                        onClose={handleMenuClose}
                      >
                        <MenuItem
                          onClick={() => {
                            handleEditUser();
                            handleMenuClose();
                          }}
                        >
                          <BuildIcon
                            sx={{ fontSize: "1rem", color: "#59fbd6" }}
                          />
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
        </Grid>
      </Grid>
      {selectedUser && (
        <UserUpdate
          user={selectedUser}
          open={isEditOpen}
          onUpdate={handleSaveUser}
          onClose={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default User;
