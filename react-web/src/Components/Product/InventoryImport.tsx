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
  size: string;
  color: string;
  dateCreated: string;
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
    size: "",
    color: "",
    dateCreated: new Date().toISOString().split("T")[0],
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  const handleAddItem = () => {
    if (newItem.title && newItem.quantity > 0 && newItem.price >= 0) {
      setItems([
        ...items,
        { ...newItem, total: newItem.quantity * newItem.price },
      ]);
      setNewItem({
        title: "",
        description: "",
        service: "",
        quantity: 1,
        price: 0,
        size: "",
        color: "",
        dateCreated: new Date().toISOString().split("T")[0],
        total: 0,
      });
      setSelectedCategory(null);
    } else {
      alert("Please fill in the product details correctly."); 
    }
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleCancel = () => {
    setItems([]);
    setNewItem({
      title: "",
      description: "",
      service: "",
      quantity: 1,
      price: 0,
      size: "",
      color: "",
      dateCreated: new Date().toISOString().split("T")[0],
      total: 0,
    });
    setSelectedCategory(null);
  };

  return (
    <Box m={2}>
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
      <Box component={Paper} p={2} mt={2}>
        <Typography variant="h6">Product Details</Typography>
        <Grid container spacing={2}>
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
         
          <Grid item xs={6}>
            <TextField
              label="Date created"
              type="date"
              value={newItem.dateCreated}
              onChange={(e) =>
                setNewItem({ ...newItem, dateCreated: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              multiple
              options={selectedCategory ? sizes[selectedCategory] : []}
              onChange={(event, newValue) =>
                setNewItem({ ...newItem, size: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Size" fullWidth/>
              )}
              disabled={!selectedCategory}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              multiple
              options={selectedCategory ? colors[selectedCategory] : []}
              onChange={(event, newValue) =>
                setNewItem({ ...newItem, color: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Color" fullWidth/>
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

        <Box mt={2}>
          {items.map((item, index) => (
            <Grid container key={index} spacing={2}>
              <Grid item xs={3}>
                {item.title}
              </Grid>
              <Grid item xs={2}>
                {item.quantity}
              </Grid>
              <Grid item xs={2}>
                {item.price}
              </Grid>
              <Grid item xs={2}>
                {item.total}
              </Grid>
              <Grid item xs={1}>
                <Button variant="outlined" onClick={() => handleDeleteItem(index)}>
                  Xóa
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Autocomplete
                      multiple
                      options={selectedCategory ? sizes[selectedCategory] : []}
                      onChange={(event, newValue) =>
                        setNewItem({ ...newItem, size: newValue })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Size" />
                      )}
                      disabled={!selectedCategory}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      multiple
                      options={selectedCategory ? colors[selectedCategory] : []}
                      onChange={(event, newValue) =>
                        setNewItem({ ...newItem, color: newValue })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Color" />
                      )}
                      disabled={!selectedCategory}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Box>

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
