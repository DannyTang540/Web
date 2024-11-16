import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header1 from "./Components/Header1";
import SignIn from "./Components/Auth/SignIn";
import Products from "./Pages/Products";
const App = () => {
  // const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      {/* <Header1 isAdminLoggedIn={isAdminLoggedIn} />  */}
      <Routes>
        {/* <Route path="/sign-in" element={<SignIn setIsAdminLoggedIn={setIsAdminLoggedIn} />} /> */}
        <Route path="/home" element={<div>Home Page</div>} />
        <Route path="/products" element={<Products/>}/>
      </Routes>
    </Router>
  );
};

export default App;
