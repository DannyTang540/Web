import React from "react";
import { SalesData } from "../../types/SalesData";
import { Paper, Box, Typography } from "@mui/material";
interface OrderSummaryProps {
    data: SalesData[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ data }) => {
    const totalOrdersCount = data.reduce((sum, month) => sum + month.orders, 0);
    const averageOrders = Math.round(totalOrdersCount / 6);
    const bestMonth = data.reduce((best, month) => month.orders > best.orders ? month : best, { month: '', orders: 0 });


    return (
        <Paper elevation={3}>
            <Box p={3}>
                <Typography variant="h6" gutterBottom>Orders Summary (Last 6 Months)</Typography>
                <Typography>Total Orders: {totalOrdersCount.toLocaleString() }</Typography>
                <Typography>Average Orders: {averageOrders.toLocaleString() }</Typography>
                <Typography>Best Month: {bestMonth.month} ({bestMonth.orders.toLocaleString()})</Typography>
            </Box>
        </Paper>
    );
}
export default OrderSummary;