import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header1 from "./Components/Header1";
import SignIn from "./Components/Auth/SignIn";

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // State to manage admin login status

  return (
    <Router>
      <Header1 isAdminLoggedIn={isAdminLoggedIn} /> {/* Pass the login state to Header1 */}
      <Routes>
        <Route path="/sign-in" element={<SignIn setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/home" element={<div>Home Page</div>} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </Router>
  );
};

export default App;
