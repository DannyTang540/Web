import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header1 from "./Components/Header1";
import SignIn from "./Components/Auth/SignIn";
import Products from "./Pages/Products";
import ProductDetail from "./Components/Product/ProductsDetails";
import InventoryImport from "./Components/Invoice/InventoryImport";

const App = () => {
  return (
    <Router>
      {/* <Header1 isAdminLoggedIn={isAdminLoggedIn} /> */}
      {/* <Routes> */}
      {/* <Route path="/sign-in" element={<SignIn setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
        <Route path="/home" element={<div>Home Page</div>} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/product/import" element={<InventoryImport />} />
      </Routes> */}
    </Router>
  );
};

export default App;
