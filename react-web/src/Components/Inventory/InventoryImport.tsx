import React, { useState } from "react";
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const initialRows = [
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

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const InventoryImport = () => {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    supplier: "",
    date: "",
    total: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProduct = () => {
    const total = newProduct.quantity * newProduct.price;
    const newRow = { ...newProduct, id: rows.length + 1, total };
    setRows([...rows, newRow]);
    setNewProduct({
      name: "",
      quantity: 0,
      price: 0,
      supplier: "",
      date: "",
      total: 0,
    });
    handleClose();
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

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
                <TableCell>{formatCurrency(row.price)}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{formatCurrency(row.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleClickOpen}
      >
        Add Products
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={newProduct.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={newProduct.quantity}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="supplier"
            label="Vendor"
            type="text"
            fullWidth
            value={newProduct.supplier}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            value={newProduct.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryImport;
