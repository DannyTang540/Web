import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { SalesData } from "../../types/SalesData";

interface SalesSummaryProps {
    data: SalesData[];
}

const SalesSummary: React.FC<SalesSummaryProps> = ({ data }) => {
    const totalSales = data.reduce((sum, month) => sum + month.sales, 0);
    const averageSales = Math.round(totalSales / 6);
    const bestMonth = data.reduce((best, month) => month.sales > best.sales ? month : best, { month: '', sales: 0 });

    return (
        <Paper elevation={3}>
            <Box p={3}>
                <Typography variant="h6" gutterBottom>Sales Summary (Last 6 Months)</Typography>
                <Typography>Total Sales: ${totalSales.toLocaleString()}</Typography>
                <Typography>Average Monthly Sales: ${averageSales.toLocaleString()}</Typography>
                <Typography>Best Month: {bestMonth.month} (${bestMonth.sales.toLocaleString()})</Typography>
            </Box>
        </Paper>
    );
};

export default SalesSummary; 