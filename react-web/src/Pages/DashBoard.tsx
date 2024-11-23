import React, { useEffect } from "react";
import { Container, Typography, Grid, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { generateLastSixMonthsData } from "../Utils/dataGenerator";
import SidebarMenu from "../Components/Menu/Menu";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  FetchInfom } from "../Components/Redux/Authentication";
// const lastSixMonthsData: SalesData[] = generateLastSixMonthsData();

// const drawerWidth = 240;

const DashBoard = () => {
    const dispatch=useDispatch()
     useEffect(() => {
         const fetch = async () => {
        console.log("hheheeheheh")
      await dispatch(FetchInfom());
    };
    fetch();
}
);
    return (
        <Grid container spacing={2} >
            <Grid item xs={2}>
                <SidebarMenu/>
            </Grid>
            <Grid item xs={8}>
                <Outlet/>
            </Grid>
        </Grid>
       
    );
}

export default DashBoard;
