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
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Breadcrumbs,
  Grid,
  Stack,
  styled,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import SelectInput from "../Components/Input/SelectInput";
import TestArial from "../Components/Input/TestArial";
import TestFieldSmall from "../Components/Input/TestFieldSmall";
import TestFiedComponent from "../Components/Input/TestFiedComponent";
import AutocompletedComponent from "../Components/Input/AutocompletedComponent";
import CheckBoxComponent from "../Components/Input/CheckBoxComponent";
import TableProduct from "../Components/Table/TableProduct";
import BreadcrumbComponent from "../Components/Breadcrumbs/BreadcrumbComponent";

interface SizePrice {
  size: string;
  price: number;
}
const style = {
  py: 0,
  width: "100%",
  maxWidth: 3600,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};
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
        <Typography variant="h5" sx={{fontWeight:500}}>Product</Typography>
        <Button
          variant="contained"
           onClick={handleOpen}
          color="primary"
          className="!bg-black w-1/2 !capitalize !py-2 !px-4"
        >
          + New Product
        </Button>
      </Box>
      <BreadcrumbComponent
        label={[
          { label: "Product", final: false },
          { label: "List", final: true },
        ]}
      />
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <h3>Create Product</h3>
          <p>
            <BreadcrumbComponent
              label={[
                { label: "Dashboard", final: false },
                { label: "Product", final: false },
                { label: "Create", final: true },
              ]}
            />
          </p>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Item>
              <List sx={style}>
                <ListItem>
                  <ListItemText
                    primary={
                      <div>
                        <h4>Details</h4>
                        <p>Title, short description, image...</p>
                      </div>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <TestFieldSmall
                            placeholder={"Enter product name"}
                            value={productName}
                            setvalue={setProductName}
                            title={"Product Name"}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <SelectInput title={"Category"} />
                        </Grid>
                        <Grid item xs={4}>
                          <SelectInput title={"Material"} />
                        </Grid>
                      </Grid>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={
                      <TestFiedComponent
                        placeholder={"Enter your product title"}
                        title={"Title Product"}
                        value={productName}
                        setvalue={setProductName}
                      />
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={
                      <TestArial
                        title={"Description"}
                        value={productName}
                        setvalue={setProductName}
                      />
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          title="Product Image"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                // setProductImage(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </List>
            </Item>
            <Item>
              <List sx={style}>
                <ListItem>
                  <ListItemText
                    primary={
                      <div>
                        <h4>Details</h4>
                        <p>Title, short description, image...</p>
                      </div>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <AutocompletedComponent
                            title={"Color"}
                            placeholder={"Choose Color"}
                            array={[
                              { key: "Đỏ", value: "#1111" },
                              { key: "Xanh", value: "#1111" },
                              { key: "Vàng", value: "#1111" },
                            ]}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <AutocompletedComponent
                            title={"Size"}
                            placeholder={"Choose Size"}
                            array={[
                              { key: "Small", value: "S" },
                              { key: "Medium", value: "L" },
                              { key: "Big", value: "XL" },
                            ]}
                          />
                        </Grid>
                      </Grid>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={
                      <Grid container spacing={1}>
                        <Grid item xs={8}>
                          <h4>Gender</h4>
                        </Grid>
                        <Grid container spacing={3}>
                          <Grid item xs={3}>
                            <CheckBoxComponent
                              value={productName}
                              setvalue={setProductName}
                              title={"Male"}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <CheckBoxComponent
                              value={productName}
                              setvalue={setProductName}
                              title={"Male"}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <CheckBoxComponent
                              value={productName}
                              setvalue={setProductName}
                              title={"Male"}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </List>
            </Item>
            <Item>
              <List sx={style}>
                <ListItem>
                  <ListItemText
                    primary={
                      <div>
                        <h4>Prices</h4>
                        <p>Price related inputs</p>
                      </div>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={
                      <TestFiedComponent
                        placeholder={"$ 0.00Đ"}
                        title={"Origin Price"}
                        value={productName}
                        setvalue={setProductName}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <TestFiedComponent
                        placeholder={"$ 0.00Đ"}
                        title={"Selling Price"}
                        value={productName}
                        setvalue={setProductName}
                      />
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </List>
            </Item>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="info" variant="outlined" onClick={handleClose}>
            Create
          </Button>
          <Button variant="text" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <TableProduct />
      </Box>
    </Container>
  );
};

export default Products;
