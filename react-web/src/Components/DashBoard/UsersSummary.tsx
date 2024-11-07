import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { SalesData } from "../../types/SalesData";

interface UsersSummaryProps {
    data: SalesData[];
}

const UsersSummary: React.FC<UsersSummaryProps> = ({ data }) => {
    const totalUsers = data.reduce((sum, month) => sum + month.users, 0);
    const averageUsers = Math.round(totalUsers / 6);
    const bestMonth = data.reduce((best, month) => month.users > best.users ? month : best, { month: '', users: 0 });

    return (
        <Paper elevation={3}>
            <Box p={3}>
                <Typography variant="h6" gutterBottom>User Summary (Last 6 Months)</Typography>
                <Typography>Total Users: {totalUsers.toLocaleString()}</Typography>
                <Typography>Average Monthly Users: {averageUsers.toLocaleString()}</Typography>
                <Typography>Best Month: {bestMonth.month} ({bestMonth.users.toLocaleString()})</Typography>
            </Box>
        </Paper>
    );
};

export default UsersSummary; 