import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Components/Redux/Store";
import DashBoard from "./Pages/DashBoard";
import SignIn from "./Components/Auth/SignIn";
import ProductDetail from "./Pages/ProductsDetails";
import InventoryImport from "./Components/Product/InventoryImport";
import Header1 from "./Components/Header1";
import Propety from "./Pages/Propety";
import User from "./Pages/User";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserRoles from "./Components/user/UserRole";
import Products from "./Pages/Products";
import OrderStatus from "./Components/Product/OrderStatus";
import CustomerOrders from "./Components/Customer/CustumerOrders";
import CustomerInvoiceDetail from "./Components/Customer/CustomerInvoiceDetail";
import UserDetail from "./Components/user/UserDetails";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Header1 />
        <Routes>
          <Route path="/" element={<DashBoard />}>
            <Route path="/product" element={<Products />} />
            <Route path="/product/details/:id" element={<ProductDetail />} />
            <Route path="/invoice" element={<OrderStatus />} />
            <Route path="/invoice/new" element={<InventoryImport />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/details" element={<UserDetail />} />
            <Route path="/user/roles" element={<UserRoles />} />
            <Route path="/order" element={<CustomerOrders />} />
            <Route path="/order/detail" element={<CustomerInvoiceDetail />} />
            <Route path="/property" element={<Propety />} />
            <Route path="/order/list" element={<OrderStatus />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
