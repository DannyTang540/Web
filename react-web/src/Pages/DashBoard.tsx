import React from "react";
import { Container, Typography, Grid, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { generateLastSixMonthsData } from "../Utils/dataGenerator";
import SalesChart from "../Components/DashBoard/SalesChart";
import UsersChart from "../Components/DashBoard/UsersChart";
import SalesSummary from "../Components/DashBoard/SalesSummary";
import UsersSummary from "../Components/DashBoard/UsersSummary";
import { SalesData } from "../types/SalesData";
import OrderSummary from "../Components/DashBoard/OrderSummary";
import OrdersChart from "../Components/DashBoard/OrdersChart";
const lastSixMonthsData: SalesData[] = generateLastSixMonthsData();

const drawerWidth = 240;

const DashBoard = () => {
    return (
        <Container className="data" maxWidth="lg" >
                <Typography variant="h4" gutterBottom>Sales Dashboard</Typography>
                <Typography variant="h6" gutterBottom>Welcome Back</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <SalesChart data={lastSixMonthsData} />
                    <UsersChart data={lastSixMonthsData} />
                    <OrdersChart data={lastSixMonthsData}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <SalesSummary data={lastSixMonthsData} />
                    <UsersSummary data={lastSixMonthsData} />
                    <OrderSummary data={lastSixMonthsData} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default DashBoard;
