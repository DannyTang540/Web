import React from "react";

import { Link, useNavigate } from "react-router-dom";
import "../Components/Auth/SignIn";
import "../types/SalesData";
const Header1 = () => {
  const navigate = useNavigate();
  const isAdminLoggedIn = false; // Define isAdminLoggedIn as a boolean
    navigate("/sign");
  

import { Link } from "react-router-dom";
import "../Components/Auth/SignIn";
import "../types/SalesData";
const Header1 = () => {
  const isAdminLoggedIn = true;


  return (
    <header>
      <nav>
        <Link to="/home">Home</Link>
        {isAdminLoggedIn && <Link to="/admin/products">Quản lý sản phẩm</Link>}
      </nav>
    </header>
  );
};

export default Header1;
