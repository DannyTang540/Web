
import "@mui/material/Button";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const SignIn = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{
        backgroundImage: 'url("https://wallpaperaccess.com/full/767435.jpg")',
        backgroundSize: "cover",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
        width="40vh"
        style={{
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
          borderRadius: "50px",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} textAlign="center">
            <Typography variant="h5" fontFamily={"-moz-initial"}>
              Welcome Back
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h5" fontFamily={"cursive"}>
              Sign In
            </Typography>
            <form className="sign-in-form" >
              <Typography>
                <FaUser />
                <TextField
                  id="user-name"
                  variant="standard"
                  type="text"
                  label="User Name"
                  required

                />
              </Typography>
              <Typography gutterBottom>
                <FaLock />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  required
                />
              </Typography>
              <Typography className="Remember-forgot" gutterBottom>
                <label className="remember">
                  <Checkbox />
                  Remember Me
                </label>
                <a href="#">Forgot Password?</a>
              </Typography>
              <Button
                variant="contained"
                className="submit-button"
                type="submit"
              >
                Dang Nhap
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignIn;
