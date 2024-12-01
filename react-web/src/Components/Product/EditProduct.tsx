import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Breadcrumbs,
  FormControlLabel,
  Switch,
} from "@mui/material";
import TestFieldSmall from "../Input/TestFieldSmall";
import SelectInput from "../Input/SelectInput";
import TestFiedComponent from "../Input/TestFiedComponent";
import AutocompletedComponent from "../Input/AutocompletedComponent";
import CheckBoxComponent from "../Input/CheckBoxComponent";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>({ name: "", description: "", specifications: "", price: "", gender: "" });
  const [productName, setProductName] = useState<string>("");
  const [regularPrice, setRegularPrice] = useState<number>(97.14);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [priceIncludesTaxes, setPriceIncludesTaxes] = useState<boolean>(false);
  const [taxPercentage, setTaxPercentage] = useState<number>(10);
  const [productCode, setProductCode] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(80);
  const [colors, setColors] = useState<string>("Blue, Pink");
  const [gender, setGender] = useState<string>("Men");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setProductName(data.name);
    };
    fetchProduct();
  }, [id]);

  const handleClose = () => {
    // Logic để đóng dialog hoặc điều hướng
  };

  const handleSave = async () => {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      // Logic để thông báo thành công hoặc điều hướng
    } else {
      // Logic để thông báo lỗi
    }
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to="/products">Products</Link>
          <Typography color="text.primary">Edit</Typography>
        </Breadcrumbs>
        <Typography variant="h6">Details</Typography>
        <TextField
          label="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Sub description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          multiline
          rows={4}
          fullWidth
        />
        <Typography variant="h6">Content</Typography>
        <TextField
          label="Specifications"
          value={product.specifications}
          onChange={(e) => setProduct({ ...product, specifications: e.target.value })}
          multiline
          rows={4}
          fullWidth
        />
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <SelectInput title="Category" />
                  </Grid>
                  <Grid item xs={4}>
                    <SelectInput label="Material" />
                  </Grid>
                </Grid>
              }
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary={
                <Grid container spacing={8}>
                  <Grid item xs={10}>
                    <AutocompletedComponent
                      title="Color"
                      placeholder="Choose Color"
                      array={[
                        { key: "Đỏ", value: "#1111" },
                        { key: "Xanh", value: "#1111" },
                        { key: "Vàng", value: "#1111" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <AutocompletedComponent
                      title="Size"
                      placeholder="Choose Size"
                      array={[
                        { key: "Small", value: "S" },
                        { key: "Medium", value: "M" },
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
                    {["Male", "Female", "Unisex"].map((gender) => (
                      <Grid item xs={3} key={gender}>
                        <CheckBoxComponent
                          value={product.gender === gender}
                          setvalue={(value) => setProduct({ ...product, gender: value ? gender : "" })}
                          title={gender}
                        />
                      </Grid>
                    ))}
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
                  placeholder="$ 0.00Đ"
                  title="Selling Price"
                  value={product.price}
                  setvalue={(value) => setProduct({ ...product, price: value })}
                />
              }
            />
          </ListItem>
          <Divider component="li" />
        </List>
        <Typography variant="h6">Pricing</Typography>
        <TextField
          label="Regular price"
          type="number"
          value={regularPrice}
          onChange={(e) => setRegularPrice(parseFloat(e.target.value))}
          fullWidth
        />
        <TextField
          label="Sale price"
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(parseFloat(e.target.value))}
          fullWidth
        />
        <FormControlLabel
          control={
            <Switch
              checked={priceIncludesTaxes}
              onChange={(e) => setPriceIncludesTaxes(e.target.checked)}
            />
          }
          label="Price includes taxes"
        />
        <TextField
          label="Tax (%)"
          value={taxPercentage}
          onChange={(e) => setTaxPercentage(parseFloat(e.target.value))}
          fullWidth
        />
      </Stack>
      <Button color="info" variant="outlined" onClick={handleSave}>
        Save Changes
      </Button>
      <Button variant="text" color="error" onClick={handleClose}>
        Close
      </Button>
    </Container>
  );
};

export default EditProduct;
