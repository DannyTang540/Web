import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const UsersChart = ({ data }: { data: { month: string; users: number }[] }) => (
    <Paper elevation={3}>
        <Box p={3}>
            <Typography variant="h6" gutterBottom>Monthly Users (Last 6 Months)</Typography>
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Number Of Users', angle: -90, position: 'insideLeft' }}  />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
        </Box>
    </Paper>
);

export default UsersChart; 