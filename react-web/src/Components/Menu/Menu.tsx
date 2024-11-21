import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { FaShoppingCart, FaTshirt } from "react-icons/fa"; // Biểu tượng sản phẩm
import { ExpandLess, ExpandMore, Person } from "@mui/icons-material"; // Mũi tên đóng/mở
import { useNavigate } from "react-router-dom";
const menuItems = [
  {
    label: "Product",
    path:"/product",
    icon: <FaTshirt />,
    children: [
      { label: "List", path: "/product" },
      { label: "Details", path: "/product/details" },
      { label: "Create", path: "/product/create" },
      { label: "Edit", path: "/product/edit" },
    ],
  },
  {
    label: "User",
    path:"/user",
    icon: <Person />,
    children: [
      { label: "List", path: "/user" },
      { label: "Details", path: "/user/details" },
      { label: "Create", path: "/user/create" },
      { label: "Edit", path: "/user/edit" },
    ],
  },
  {
    label: "Order",
    path:"/order",
    icon: <FaShoppingCart />,
    children: [
      { label: "List", path: "/order/list" },
      { label: "Details", path: "/order/details" },
      { label: "Create", path: "/order/create" },
    ],
  },
];

const SidebarMenu = () => {
  const [openMenu, setOpenMenu] = useState({});
  const navigate = useNavigate();

  // Toggle mở/đóng menu con
  const handleToggle = (label,path) => {
    navigate(path); // Chuyển đến trang mục con
    setOpenMenu((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <List>
      {menuItems.map((item) => (
        <React.Fragment key={item.label}>
          {/* Mục cha */}
          <ListItemButton
            onClick={() => handleToggle(item.label,item.path)}
            sx={{
              bgcolor: openMenu[item.label] ? "#e8f5e9" : "transparent",
              "&:hover": { bgcolor: "#c8e6c9" },
              borderRadius: "10px",
              margin: "5px 0",
            }}
          >
            <ListItemIcon
              sx={{
                color: "#4caf50",
                minWidth: "40px",
                "& svg": { fontSize: "1.5rem" },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
            {openMenu[item.label] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Mục con (nếu có) */}
          <Collapse in={openMenu[item.label]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItemButton
                  key={child.label}
                  sx={{ pl: 4 }}
                  onClick={() => navigate(child.path)}
                >
                  <ListItemText
                    primary={child.label}
                    sx={{
                      "& span": { fontSize: "1.1rem", fontWeight: "bold" },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default SidebarMenu;
