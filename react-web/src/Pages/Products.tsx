import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Breadcrumbs,
  Grid,
  styled,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import TableProduct from "../Components/Table/TableProduct";
import CreateProductDialog from "../Components/Product/CreateProduct";

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
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearForm();
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const handleEditProduct = (index: number) => {
    const product = products[index];
    setProductName(product.name);
    handleOpen();
  };

  const handleDeleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const clearForm = () => {
    setProductName("");
  };

  return (
    <Container fixed>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Product
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          color="primary"
          sx={{ mt: 5 }}
        >
          + New Product
        </Button>
      </Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Product
        </Link>
        <Typography color="text.primary">List</Typography>
      </Breadcrumbs>
      <CreateProductDialog
        open={open}
        handleClose={handleClose}
        productName={productName}
        setProductName={setProductName}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <TableProduct />
      </Box>
    </Container>
  );
};

export default Products;
