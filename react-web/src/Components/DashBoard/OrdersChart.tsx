import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const OrdersChart = ({ data }: { data: { month: string; orders: number }[] }) => (
    <Paper elevation={3}>
        <Box p={3}>
            <Typography variant="h6" gutterBottom>Monthly Orders (Last 6 Months)</Typography>
            <BarChart width={700} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Number of Orders', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8884d8" />
            </BarChart>
        </Box>
    </Paper>
);

export default OrdersChart;