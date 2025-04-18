import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { generateLastSixMonthsData } from "../Utils/dataGenerator";
import SidebarMenu from "../Components/Menu/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchInfom,
  IntrospectAndRefresh,
} from "../Components/Redux/Authentication";
import { ToastContainer } from "react-toastify";
import { Introspect } from "../Components/Redux/Selector";
// const lastSixMonthsData: SalesData[] = generateLastSixMonthsData();

// const drawerWidth = 240;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const introspect = useSelector(Introspect); // Lưu giá trị từ Redux store vào biến

  useEffect(() => {
    const fetch = async () => {

      await dispatch(FetchInfom());
      await dispatch(IntrospectAndRefresh());
    };
    console.log(localStorage.getItem("Introspect"))
    if (localStorage.getItem("Introspect")==null || localStorage.getItem("Introspect") === "false"||localStorage.getItem("Introspect") === "true") {
      fetch().then(() => {
        if (localStorage.getItem("Introspect")==="false"||!localStorage.getItem("token")) navigate("/sign-in");
      });
    }
  }, [dispatch, introspect, navigate]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <SidebarMenu />
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default Home;
