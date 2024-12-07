import React from "react";
import { useParams } from "react-router-dom";
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
import { users } from "../../Pages/User";
const UserDetail: React.FC = () => {
  const { email } = useParams();
  console.log("Email:", email);

  const user = users.find((user) => user.Email === email);

  return (
    <Box m={2}>
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
        <Grid item xs={6} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50%"
          >
            <img
              src={
                "https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp"
              }
              alt="User"
              style={{ maxWidth: "100%", borderRadius: "4px" }}
            />
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" alignItems="center">
            <Typography variant="h6" color="red">
              Banned
            </Typography>
            <Switch checked={user?.Status === "Banned"} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 600 }}>
            <CardContent>
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  <Typography variant="h6">Full Name</Typography>
                  <TextField
                    fullWidth
                    value={user?.Name}
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
                    value={user?.Phone}
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
                    value={user?.State}
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
                    value={user?.Address}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6">Company</Typography>
                  <TextField
                    fullWidth
                    value={user?.Company}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: "0.875rem" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Email Address</Typography>
                  <TextField
                    fullWidth
                    value={user?.Email}
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
                    value={user?.Country}
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
                    value={user?.City}
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
                    value={user?.ZipCode}
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
                    value={user?.Role}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetail;
