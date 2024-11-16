<<<<<<< Updated upstream
import React from "react";

=======
>>>>>>> Stashed changes
import { Link, useNavigate } from "react-router-dom";
import "../Components/Auth/SignIn";
import "../types/SalesData";
import { useEffect } from "react";

const Header1 = () => {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const isAdminLoggedIn = false; // Define isAdminLoggedIn as a boolean
    navigate("/sign");
  

import { Link } from "react-router-dom";
import "../Components/Auth/SignIn";
import "../types/SalesData";
const Header1 = () => {
  const isAdminLoggedIn = true;

=======
  const isAdminLoggedIn = false;

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/sign");
    }
  }, [isAdminLoggedIn, navigate]);
>>>>>>> Stashed changes

  return (
    <header>
      <nav>
        <Link to="/home">Home</Link>
<<<<<<< Updated upstream
        {isAdminLoggedIn && <Link to="/admin/products">Quản lý sản phẩm</Link>}
=======
        {/* {isAdminLoggedIn && <Link to="/products">Quản lý sản phẩm</Link>} */}
        <Link to="/product">Products Management</Link>
>>>>>>> Stashed changes
      </nav>
    </header>
  );
};

export default Header1;
