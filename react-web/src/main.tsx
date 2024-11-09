import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./AdminSign.tsx";
import AdminSign from "./AdminSign.tsx";
import "./Components/Header1.tsx";
import Header1 from "./Components/Header1.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminSign />
    <Header1 />
  </StrictMode>
);
