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
  Button,
} from "@mui/material";

const rows = [
  {
    id: 1,
    name: "Product A",
    quantity: 50,
    price: 100,
    supplier: "Supplier X",
    date: "2024-12-20",
    total: 5000,
  },
  {
    id: 2,
    name: "Product B",
    quantity: 30,
    price: 200,
    supplier: "Supplier Y",
    date: "2024-12-21",
    total: 6000,
  },
  // Add more rows as needed
];

const InventoryImport = () => {
  return (
    <Box m={2}>
      <Typography variant="h4">Import goods</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Date </TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Products
      </Button>
    </Box>
  );
};

export default InventoryImport;
