import React from "react";
import Header from "./Components/Header";
import About from "./Pages/About";
import User from "./Pages/User";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./Pages/DashBoard";
import Home from "./Pages/Home";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/dashboard" element={<DashBoard />} /> 
        <Route path="/login" element={<SignIn />} /> 
        <Route path="/register" element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
