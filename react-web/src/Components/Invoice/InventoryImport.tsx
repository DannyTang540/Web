import React, { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Autocomplete,
  Breadcrumbs,
  Divider,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";

// Define the Item interface
interface Item {
  title: string;
  description: string;
  service: string;
  quantity: number;
  price: number;
  total: number;
  size: string[];
  color: string[];
  dateCreated: string;
  category: string;
}

// Sample categories and products
const categories = ["Áo", "Quần", "Giày", "Phụ kiện"];
const products = {
  Áo: ["Áo thun", "Áo sơ mi", "Áo khoác"],
  Quần: ["Quần jeans", "Quần short", "Quần tây"],
  Giày: ["Giày thể thao", "Giày da", "Giày sandal"],
  "Phụ kiện": ["Mũ", "Thắt lưng", "Kính mát"],
};

// Sample sizes and colors based on categories
const sizes = {
  Áo: ["S", "M", "L", "XL"],
  Quần: ["S", "M", "L", "XL"],
  Giày: ["36", "37", "38", "39", "40"],
  "Phụ kiện": ["N/A"], // Không áp dụng cho phụ kiện
};

const colors = {
  Áo: ["Đỏ", "Xanh", "Vàng"],
  Quần: ["Đen", "Trắng", "Xám"],
  Giày: ["Nâu", "Đen", "Trắng"],
  "Phụ kiện": ["Đen", "Trắng"], // Màu sắc cho phụ kiện
};

const InventoryEntry = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    title: "",
    description: "",
    service: "",
    quantity: 1,
    price: 0,
    total: 0,
    size: [],
    color: [],
    dateCreated: new Date().toISOString().split("T")[0],
    category: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  const handleAddItem = () => {
    if (isValidNewItem(newItem)) {
      setItems((prevItems) => [
        ...prevItems,
        { ...newItem, total: newItem.quantity * newItem.price, category: selectedCategory || "" },
      ]);
      resetNewItem();
    } else {
      alert("Please fill in the product details correctly.");
    }
  };

  const isValidNewItem = (item: Item) => {
    return (
      item.title &&
      item.quantity > 0 &&
      item.price >= 0 &&
      item.size.length > 0 &&
      item.color.length > 0
    );
  };

  const resetNewItem = () => {
    setNewItem({
      title: "",
      description: "",
      service: "",
      quantity: 1,
      price: 0,
      size: [],
      color: [],
      dateCreated: new Date().toISOString().split("T")[0],
      total: 0,
      category: "",
    });
    setSelectedCategory(null);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleCancel = () => {
    setItems([]);
    resetNewItem();
  };

  return (
    <Box m={3}>
      <Typography variant="h4">Inventory Import</Typography>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link color="inherit" to="/">
          Dashboard
        </Link>
        <Link color="inherit" to="/invoice">
          Orders Status
        </Link>
        <Typography color="text.primary">Import</Typography>
      </Breadcrumbs>
      <Box component={Paper} p={1} mt={2}>
        <Typography variant="h6" mb={2}>
          Product Details
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Autocomplete
              options={categories}
              onChange={(event, newValue) => {
                setSelectedCategory(newValue);
                setNewItem({ ...newItem, title: "" });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              options={selectedCategory ? products[selectedCategory] : []}
              onChange={(event, newValue) =>
                setNewItem({ ...newItem, title: newValue || "" })
              }
              renderInput={(params) => (
                <TextField {...params} label="Product name" />
              )}
              disabled={!selectedCategory}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              multiple
              options={selectedCategory ? sizes[selectedCategory] : []}
              onChange={(event, newValue) =>
                setNewItem({ ...newItem, size: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Size" fullWidth />
              )}
              disabled={!selectedCategory}
            />
          </Grid>
          <Grid ml={61} item xs={5}>
            <Autocomplete
              multiple
              options={selectedCategory ? colors[selectedCategory] : []}
              onChange={(event, newValue) =>
                setNewItem({ ...newItem, color: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Color" fullWidth />
              )}
              disabled={!selectedCategory}
            />
          </Grid>
        </Grid>
      </Box>

      <Box component={Paper} p={2} mt={2}>
        <Typography variant="h6"></Typography>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              label="Quantity"
              type="number"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: Number(e.target.value) })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Price"
              type="number"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: Number(e.target.value) })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleAddItem}>
              Add product
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, borderColor: "black" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.size.join(", ")}</TableCell>
                  <TableCell>{item.color.join(", ")}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={2}>
          <Typography variant="h6">Summary:</Typography>
          <Typography>Total: VND{calculateTotal()}</Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleCancel}
      >
        Hủy
      </Button>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Create & Send
      </Button>
    </Box>
  );
};

export default InventoryEntry;
