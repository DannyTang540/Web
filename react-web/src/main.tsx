import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./AdminSign.tsx";
import "./Components/Header1.tsx";
import Products from "./Pages/Products.tsx";
import Header1 from "./Components/Header1.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Components/Redux/Store.tsx";
import DashBoard from "./Pages/DashBoard.tsx";
import SignIn from "./Components/Auth/SignIn.tsx";
import UsersSummary from "./Components/DashBoard/UsersSummary.tsx";
import User from "./Pages/User.tsx";
import Propety from "./Pages/Propety.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoard />}>
            <Route path="/product" element={<Products/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/property" element={<Propety/>}/>
          </Route>
          <Route path="/Sign" element={<SignIn />}/>
         </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
