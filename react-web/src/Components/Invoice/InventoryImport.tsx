import React, {useEffect, useState} from "react";

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
import {Category, Product, PurchaseCreated} from "../Redux/Selector.tsx";
import {useDispatch, useSelector} from "react-redux";
import {CreatePurchaseItem, UpdatePurchase} from "../Redux/PurchaseSlice.tsx";
import {DeleteItem} from "../Redux/PurchaseItemSlice.tsx";

// Define the Item interface
interface Item {
  title: string;
  quantity: number;
  price: number;
  total: number;
  size: string[];
  color: string[];
  category: string;
}

// Sample categories and products
/*const categories = ["Áo", "Quần", "Giày", "Phụ kiện"];
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
};*/

const InventoryEntry = () => {
  const dispatch=useDispatch();
  const purchaseItemData=useSelector(PurchaseCreated);
  const Categorydata=useSelector(Category);
  const Productdata=useSelector(Product);
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    title: "",
    quantity: 1,
    price: 0,
    total: 0,
    size: [],
    color: [],
    category: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string | "">("");
  const product=Array.from(Productdata).filter((el)=>el.category.name==selectedCategory).map((el)=>el.name);
  console.log(product)
  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  const handleAddItem = async () => {
    if (isValidNewItem(newItem)) {
      await dispatch(CreatePurchaseItem(newItem));
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
      quantity: 1,
      price: 0,
      size: [],
      color: [],
      total: 0,
      category: "",
    });
    setSelectedCategory(null);
  };
console.log(newItem)
  const handleDeleteItem = async (index: number) => {
    await dispatch(DeleteItem(index));
  };

  const handleCancel = () => {
    setItems([]);
    resetNewItem();
  };
  const handleSendItem = async () => {
    await dispatch(UpdatePurchase());
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
              options={Categorydata.map((el)=>el.NameCategory)}
              onChange={(event, newValue) => {
                setSelectedCategory(newValue);
                setNewItem({ ...newItem, title: "",color:[],size:[],quantity:1 });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              options={selectedCategory ?product: []}
              onChange={(event, newValue) =>
                setNewItem({ ...newItem, title: newValue || "",color:[],size:[],quantity:1 })
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
              options={selectedCategory
                  ? Array.from(
                      new Set(
                          Productdata.find((el) => el.name == newItem?.title)?.varients?.map((el) => el.size.size) || []
                      )
                  )
                  : []}
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
              options={selectedCategory
                  ? Array.from(
                      new Set(
                          Productdata.find((el) => el.name == newItem?.title)?.varients?.map((el) => el.color.colorname) || []
                      )
                  )
                  : []}
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
              value={Productdata.find((el) => el.name == newItem?.title)?.varients?.
              find((el) => el.color.colorname==newItem.color[0]&&el.size.size==newItem.size[0])?.versions?.find((el)=>el.isdeleted==false)?.originalprice||0}
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
              {purchaseItemData?.items?.map((item, index) => (
                <TableRow key={item.idpurchaseitem}>
                  <TableCell>{item?.version?.product?.category?.name}</TableCell>
                  <TableCell>{item?.version?.product?.name}</TableCell>
                  <TableCell>{item?.version?.varient?.size?.size}</TableCell>
                  <TableCell>{item?.version?.varient?.color?.colorname}</TableCell>
                  <TableCell>{ item?.quantity}</TableCell>
                  <TableCell>{item?.totalprice.toLocaleString("vi-VN")}</TableCell>
                  <TableCell>{(item?.quantity*item?.totalprice).toLocaleString("vi-VN")} VND</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteItem(item.idpurchaseitem)}
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
      <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSendItem}
      >
        Create & Send
      </Button>
    </Box>
  );
};

export default InventoryEntry;
