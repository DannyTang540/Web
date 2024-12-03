import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Components/Redux/Store";
import DashBoard from "./Pages/DashBoard";
import SignIn from "./Components/Auth/SignIn";
import ProductDetail from "./Components/Product/ProductsDetails";
import InventoryImport from "./Components/Invoice/InventoryImport";
import Header1 from "./Components/Header1";
import Propety from "./Pages/Propety";
import User from "./Pages/User";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserRoles from "./Components/user/UserRole";
import Products from "./Pages/Products";
import OrderStatus from "./Components/Invoice/ProductOrderStatus";
import CustomerOrders from "./Components/Customer/CustomerOrders";
import CustomerDetail from "./Components/Customer/CustomerDetail";
import UserDetail from "./Components/user/UserDetails";
import OrderDetail from "./Components/Invoice/InvoiceOrderDetail";
import Home from "./Pages/Home";
import EditProduct from "./Components/Product/EditProduct";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Header1 />
        <Routes>
          <Route path="/" element={<DashBoard />}>
            <Route path="/" element={<Home />} />

            <Route path="/product" element={<Products />} />
            <Route path="/product/details/:id" element={<ProductDetail />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            <Route path="/invoice" element={<OrderStatus />} />
            <Route path="/invoice/new" element={<InventoryImport />} />
            <Route path="/invoice/detail/:orderId" element={<OrderDetail />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/details" element={<UserDetail />} />
            <Route path="/user/roles" element={<UserRoles />} />
            <Route path="/orders" element={<CustomerOrders />} />
            <Route path="/orders/detail/:COId" element={<CustomerDetail />} />
            <Route path="/property" element={<Propety />} />
            <Route path="/order/list" element={<OrderStatus />} />
          </Route>
          <Route path="/sign" element={<SignIn />} />
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
