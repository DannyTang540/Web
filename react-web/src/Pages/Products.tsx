import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import React from "react";
import Size from "../types/Size";
import colors from "../types/Color";

interface SizePrice {
  size: string;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<
    {
      id: number;
      image: string;
      name: string;
      description: string;
      category: string;
      sizes: SizePrice[];
      colors: { hex: string; name: string }[];
    }[]
  >([]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string>("");
  const [productSizes, setProductSizes] = useState<SizePrice[]>([]);
  const [productColors, setProductColors] = useState<{ hex: string; name: string }[]>([]);
  const [customColorHex, setCustomColorHex] = useState<string>("");
  const [customColorName, setCustomColorName] = useState<string>("");
  const [newSize, setNewSize] = useState<string>("");
  const [newSizePrice, setNewSizePrice] = useState<number>(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearForm();
  };

  const handleAddProduct = () => {
    if (!productName || !productCategory) {
      setError("Product name and category are required.");
      return;
    }
    setError(null);
    setProducts([
      ...products,
      {
        id: products.length + 1,
        image: productImage,
        name: productName,
        description: productDescription,
        category: productCategory,
        sizes: productSizes,
        colors: productColors,
      },
    ]);
    handleClose();
  };

  const handleEditProduct = (index: number) => {
    const product = products[index];
    setProductImage(product.image);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductCategory(product.category);
    setProductSizes(product.sizes);
    setProductColors(product.colors);

    setEditIndex(index);
    handleOpen();
  };

  const handleUpdateProduct = () => {
    if (editIndex !== null) {
      const updatedProducts = products.map((product, index) =>
        index === editIndex
          ? {
              ...product,
              name: productName,
              image: productImage,
              description: productDescription,
              category: productCategory,
              sizes: productSizes,
              colors: productColors,
            }
          : product
      );
      setProducts(updatedProducts);
      setEditIndex(null);
      handleClose();
    }
  };

  const handleDeleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const clearForm = () => {
    setProductImage("");
    setProductName("");
    setProductDescription("");
    setProductCategory("");
    setProductSizes([]);
    setProductColors([]);
    setCustomColorHex("");
    setCustomColorName("");
    setNewSize("");
    setNewSizePrice(0);
  };

  const handleCustomColorAdd = () => {
    if (customColorHex && customColorName) {
      const newColor = { hex: customColorHex, name: customColorName };
      if (!productColors.some((color) => color.hex === customColorHex)) {
        setProductColors([...productColors, newColor]);
        setCustomColorHex("");
        setCustomColorName("");
      }
    }
  };

  const handleAddSize = () => {
    if (newSize && newSizePrice > 0) {
      const newSizeEntry: SizePrice = { size: newSize, price: newSizePrice };
      setProductSizes([...productSizes, newSizeEntry]);
      setNewSize("");
      setNewSizePrice(0);
    }
  };

  return (
    <Container fixed>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="h3">Products Management</Typography>
        <Button onClick={handleOpen} variant="contained" color="primary">
          Add Product
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          width={400}
          bgcolor="background.paper"
          p={4}
          boxShadow={24}
          sx={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editIndex !== null ? "Edit Product" : "Add Product"}
          </Typography>
          <TextField
            label="Image URL"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            title="Product Image"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProductImage(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <TextField
            label="Product Name"
            value={productName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductName(e.target.value)
            }
            fullWidth
            margin="normal"
            required
            error={!!error}
            helperText={error}
          />
          <TextField
            label="Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Box display="flex" alignItems="center" mt={3}>
            <TextField
              label="Size"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              margin="normal"
              required
            >
              {productSizes.map((sizeEntry, index) => (
                <MenuItem key={index} value={sizeEntry.name}>
                  {sizeEntry.name}: {sizeEntry.price} VND
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Price"
              type="number"
              value={newSizePrice}
              onChange={(e) => setNewSizePrice(Number(e.target.value))}
              margin="normal"
              required
              InputProps={{
                endAdornment: <InputAdornment position="end">VND</InputAdornment>,
              }}
            />
            <Button variant="contained" color="primary" onClick={handleAddSize}>
              Add Size
            </Button>
          </Box>

          <Box mt={2}>
            <Typography variant="subtitle1">Sizes and Prices:</Typography>
            {productSizes.map((sizeEntry, index) => (
              <Typography key={index}>
                {sizeEntry.size}: {sizeEntry.price} VND
              </Typography>
            ))}
          </Box>

          <TextField
            id="Colors"
            select
            label="Chọn màu"
            value={productColors}
            onChange={(e) => setProductColors(e.target.value as string[])}
            fullWidth
            margin="normal"
            required
            SelectProps={{
              multiple: true,
              renderValue: (selected) => {
                return (selected as string[])
                  .map((color) => color) // Directly use the color hex code
                  .join(", ");
              },
            }}
          >
            {colors.map((color) => (
              <MenuItem key={color.hex} value={color.hex}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: color.hex,
                      marginRight: "8px",
                    }}
                  />
                  {color.name}
                </div>
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Nhập mã màu Hex"
            value={customColorHex}
            onChange={(e) => setCustomColorHex(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCustomColorAdd}
          >
            Thêm Màu Tùy Chọn
          </Button>
          <TextField
            label="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            fullWidth
            multiline
            maxRows={6}
            margin="normal" 
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleClose}
              color="secondary"
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            {editIndex !== null ? (
              <Button
                onClick={handleUpdateProduct}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            ) : (
              <Button
                onClick={handleAddProduct}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            )}
          </Box>
        </Box>
      </Modal>

      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sizes</TableCell>
                <TableCell>Colors</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={`Product ${product.id}`}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.sizes.map((sizeEntry, idx) => (
                      <div key={idx}>
                        {sizeEntry.size}: {sizeEntry.price} VND
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {product.colors.map((color) => (
                        <div
                          key={color.hex}
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: color.hex,
                          }}
                        />
                      ))}
                    </div>
                    {product.colors.map((color) => (
                      <span key={color.hex} style={{ marginLeft: "5px" }}>
                        {color.name}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell style={{ whiteSpace: "pre-line" }}>
                    {product.description}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => handleEditProduct(index)}
                      color="primary"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteProduct(index)}
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Products;
