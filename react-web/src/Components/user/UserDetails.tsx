import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  Collapse,
  Breadcrumbs,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface User {
  id: string;
  name: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Sample data for the user (replace with API data later)
  const user: User = {
    id: id || "1",
    name: "John Doe",
    bio: "A passionate developer with a love for coding.",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    imageUrl: "https://via.placeholder.com/15", // Smaller image size
  };

  // State to manage collapse
  const [open, setOpen] = React.useState<boolean>(false);

  // Toggle collapse
  const handleToggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <Box m={4}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/user">
          User
        </Link>
        <Typography color="text.primary">User Details</Typography>
      </Breadcrumbs>
      <Grid container spacing={4}>
        {/* User image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={user.imageUrl}
              alt={user.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: {user.email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Phone: {user.phone}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Address: {user.address}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                mt={2}
                onClick={handleToggleCollapse}
                sx={{ cursor: "pointer" }}
              >
                <Typography variant="h6">Bio</Typography>
                <IconButton>
                  {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box mt={2}>
                  <Typography variant="body1" paragraph>
                    {user.bio}
                  </Typography>
                </Box>
              </Collapse>
            </CardContent>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetail;
