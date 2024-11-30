// src/components/orders/CustomerOrders.tsx
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const customerOrders = [
  {
    id: 1,
    orderId: "CUST001",
    customer: "John Doe",
    date: "2024-12-20",
    status: "In Transit",
    total: 10000,
  },
  {
    id: 2,
    orderId: "CUST002",
    customer: "Jane Smith",
    date: "2024-12-21",
    status: "Delivered",
    total: 15000,
  },
  // Add more orders as needed
];

const calculateTotalAmount = () => {
  return customerOrders.reduce((total, order) => total + order.total, 0);
};

const CustomerOrders = () => {
  return (
    <Box m={2}>
      <Typography variant="h4">Customer Orders</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Amount: {calculateTotalAmount()} VND
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.total} VND</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerOrders;
