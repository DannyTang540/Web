import React from "react";
import { Link } from "react-router-dom";
import "../Components/Auth/SignIn";
import "../types/SalesData";
const Header1 = () => {
  const isAdminLoggedIn = true; // Define isAdminLoggedIn as a boolean

  return (
    <header>
      <nav>
        <Link to="/home">Home</Link>
        {isAdminLoggedIn && <Link to="/admin/products">Quản lý sản phẩm</Link>}
        {/* Thêm các liên kết khác nếu cần */}
      </nav>
    </header>
  );
};

export default Header1;
