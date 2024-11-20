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
        <Typography variant="h3">Products Management</Typography>
        <Button onClick={handleOpen} variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <h3>Create Product</h3>
          <p>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Product
              </Link>
              <Link
                underline="hover"
                color="text.primary"
                href="/material-ui/react-breadcrumbs/"
                aria-current="page"
              >
                Created
              </Link>
            </Breadcrumbs>
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
                              value={productName} setvalue={setProductName} title={"Male"}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <CheckBoxComponent
                              value={productName} setvalue={setProductName} title={"Male"}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <CheckBoxComponent 
                            value={productName} setvalue={setProductName} title={"Male"}
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
          <Button color="info" variant="outlined" onClick={handleClose}>Create</Button>
          <Button variant="text" color="error" onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        {/* <TableContainer component={Paper}>
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
        </TableContainer> */}
        <TableProduct/>
      </Box>
    </Container>
  );
};

export default Products;
