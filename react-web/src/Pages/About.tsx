import { Typography } from "@mui/material";
import React from "react";
import "../Style/AboutCss.css";

const About = () => {
    return (
    <div className="about">
      <div>
        <Typography variant="h4" gutterBottom>About Us</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Typography variant="h6" gutterBottom>Tăng Cẩm Đạt</Typography>
        <Typography variant="body1" gutterBottom>D21_TH08</Typography>
        <Typography variant="body1" gutterBottom>DH52110786</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Typography variant="h6" gutterBottom>Trần Minh Đại</Typography>
        <Typography variant="body1" gutterBottom>D21_TH08</Typography>
        <Typography variant="body1" gutterBottom>DH52110743</Typography>
        </div>
      </div>
    </div>
  );
}

export default About;