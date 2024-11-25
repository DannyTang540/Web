import React, { useEffect, useState } from "react";
import "@mui/material/Button";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUp } from "../Redux/UserSlice";
import { User } from "../Redux/Selector";

const SignIn = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, settext] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Cập nhật state dựa trên tên của input
    settext((prevText) => ({
      ...prevText,
      [name]: value,
    }));
  };
  
const handleSubmit = async (event) => {
  event.preventDefault();

  // Simulate a login check or API call here.
  const isAuthenticated = text.username === "admin" && text.password === "admin123";

  if (isAuthenticated) {
    navigate("/admin/products");
  } else {
    // alert("Thông tin đăng nhập không chính xác");
  }
};

const user=useSelector(User);
useEffect(()=>{
  // Kiểm tra và chuyển hướng nếu user đã có
  if (JSON.stringify(user)!== "{}") {
    navigate("/");  // Chuyển hướng đến trang chủ
  }
},[useSelector(User)])
const handleSignUp = async () => {
  // Dispatch action để đăng ký
  await dispatch(SignUp({ username: text.username, password: text.password }));
  
  // Kiểm tra và chuyển hướng nếu user đã có
  // if (JSON.stringify(user) !== "{}") {
  //   navigate("/");  // Chuyển hướng đến trang chủ
  // }
};
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
            <form className="sign-in-form" onSubmit={handleSubmit}>
              <Typography>
                <FaUser />
                <TextField
                  id="user-name"
                  variant="standard"
                  type="text"
                  label="User Name"
                  required
                  name="username"
                  value={text.username}
                  onChange={handleChange}
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
                  name="password"
                  value={text.password}
                  onChange={handleChange}
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
                onClick={
                  handleSignUp
                //   async () => {
                //   await dispatch(
                //     SignUp({
                //       username: text.username,
                //       password: text.password,
                //     })
                //   );
                //   const user = useSelector((state) => state.user);
                //   if(JSON.stringify(useSelector(User))!="{}")
                //   {
                //     navigate("/")
                //   }
                // }
              }
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
