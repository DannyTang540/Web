import React, { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { FaShoppingCart, FaTshirt } from "react-icons/fa";
import { Category, ExpandLess, ExpandMore, Person } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    label: "Product",
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
    icon: <Person />,
    children: [
      { label: "List", path: "/user" },
      { label: "Details", path: "/user/details" },
      { label: "Create", path: "/user/create" },
      { label: "Edit", path: "/user/edit" },
    ],
  },
  {
    label: "Property",
    icon: <Category />,
    children: [{ label: "List", path: "/property" }],
  },
  {
    label: "Order",
    icon: <FaShoppingCart />,
    children: [
      { label: "List", path: "/order" },
      { label: "Details", path: "/order/details" },
      { label: "Create", path: "/order/create" },
    ],
  },
];

const SidebarMenu = () => {
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = (label: string, path?: string) => {
    if (path) {
      navigate(path);
    }
    setOpenMenu((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const isSelected = (path: string) => location.pathname === path;

  return (
    <List>
      {menuItems.map((item) => (
        <React.Fragment key={item.label}>
          <ListItemButton
            onClick={() =>
              handleToggle(
                item.label,
                item.children.length === 0 ? item.children[0].path : undefined
              )
            }
            sx={{
              bgcolor: openMenu[item.label] ? "#e8f5e9" : "transparent",
              "&:hover": {
                bgcolor: "#c8e6c9",
                fontWeight: "bold",
              },
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
            <ListItemText
              primary={item.label}
              sx={{
                fontWeight: item.children.some((child) =>
                  isSelected(child.path)
                )
                  ? "bold"
                  : "normal",
              }}
            />
            {item.children.length > 0 &&
              (openMenu[item.label] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          {/* Mục con (nếu có) */}
          {item.children.length > 0 && (
            <Collapse in={openMenu[item.label]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child) => (
                  <ListItemButton
                    key={child.label}
                    sx={{
                      pl: 4,
                      fontSize: "1.2rem",
                      bgcolor: isSelected(child.path)
                        ? "#e8f5e9"
                        : "transparent",
                      "&:hover": {
                        bgcolor: "#e0f7fa",
                        fontWeight: "bold",
                      },
                    }}
                    onClick={() => navigate(child.path)}
                  >
                    <ListItemText
                      primary={child.label}
                      sx={{
                        fontWeight: isSelected(child.path) ? "bold" : "normal",
                        "& span": { fontSize: "0.8rem", fontWeight: "bold" },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default SidebarMenu;