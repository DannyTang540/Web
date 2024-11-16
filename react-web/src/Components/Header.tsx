import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faInfoCircle,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../Style/Header.css";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Tab"
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <>
      <AppBar position="static">
        <Toolbar className="header">
          <div className="header-left">
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              className="header-title"
            >
              Economic_service
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        variant="temporary"
        sx={{ "& .MuiDrawer-paper": { width: 150 } }}
      >
        <List className="Menu">
          <ListItem button component={Link} to="/">
            <FontAwesomeIcon icon={faHouse} style={{ marginRight: "8px" }} />
            <ListItemText primary=" Home" />
          </ListItem>
          <ListItem button component={Link} to="/user">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
            <ListItemText primary=" User" />
          </ListItem>
          <ListItem button component={Link} to="/about">
            <FontAwesomeIcon
              icon={faInfoCircle}
              style={{ marginRight: "8px" }}
            />
            <ListItemText primary=" About" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard">
            <FontAwesomeIcon
              icon={faTachometerAlt}
              style={{ marginRight: "8px" }}
            />
            <ListItemText primary="DashBoard" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
