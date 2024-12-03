import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Switch,
  TextField,
  Breadcrumbs,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserDetail: React.FC = () => {
    const user = {
    name: "Angeliquie Morse",
    phone: "08-12 34 56",
    email: "benny89@yahoo.com",
    country: "Sweden",
    state: "Virginia",
    city: "Rancho Cordova",
    address: "908 Jack Locks",
    zip: "85807",
    role: "Content Creator",
    banned: false,
    company: "Wuckert Inc",
  };

  return (
    <Box m={4}>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <Link color="inherit" to="/user">
          Users
        </Link>
        <Typography color="text.primary">User Details</Typography>
      </Breadcrumbs>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={6} >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50%"
          >
            <img
              src={"https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp"}
              alt="User"
              style={{ maxWidth: "100%", borderRadius: "4px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 600 }}>
            <CardContent>
              <Grid container spacing={6  }>
                <Grid item xs={6}>
                  <Typography variant="h6">Full Name</Typography>
                  <TextField
                    fullWidth
                    value={user.name}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      
                    }}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6">Phone Number</Typography>
                  <TextField
                    fullWidth
                    value={user.phone}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      
                    }}
                  />
                        <Divider sx={{ my: 1 }} />
                  <Typography variant="h6">State/Region</Typography>
                  <TextField
                    fullWidth
                    value={user.state}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      
                    }}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6">Role</Typography>
                  <TextField
                    fullWidth
                    value={user.role}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Email Address</Typography>
                  <TextField
                    fullWidth
                    value={user.email}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      
                    }}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6">Country</Typography>
                  <TextField
                    fullWidth
                    value={user.country}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      
                    }}
                  />
      
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6">City</Typography>
                  <TextField
                    fullWidth
                    value={user.city}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      
                    }}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6">Address</Typography>
                  <TextField
                    fullWidth
                    value={user.address}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      
                    }}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6">Zip/Code</Typography>
                  <TextField
                    fullWidth
                    value={user.zip}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      
                    }}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" alignItems="center">
                <Typography variant="h6">Banned</Typography>
                <Switch checked={user.banned} disabled />
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">Company</Typography>
              <TextField
                fullWidth
                value={user.company}
                variant="outlined"
                margin="normal"
                InputProps={{ readOnly: true, style: { fontSize: "0.875rem" } }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetail;
