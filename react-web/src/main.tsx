import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./AdminSign.tsx";
import AdminSign from "./AdminSign.tsx";
import "./Components/Header1.tsx";

import Header1 from "./Components/Header1.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Components/Redux/Store.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminSign />}/>
        <Route path="/Sign" element={<Header1 />}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>
);
