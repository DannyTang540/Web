import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SalesChart = ({ data }: { data: { month: string; sales: number }[] }) => (
    <Paper elevation={3}>
        <Box p={3}>
            <Typography variant="h6" gutterBottom>Monthly Sales (Last 6 Months)</Typography>
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Sales', angle:-90, position: 'insideLeft' }}  />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#0000FF" />
            </BarChart>
        </Box>
    </Paper>
);

export default SalesChart; 