import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import BreadcrumbComponent from "../Breadcrumbs/BreadcrumbComponent";
import TestFieldSmall from "../Input/TestFieldSmall";
import SelectInput from "../Input/SelectInput";
import TestFiedComponent from "../Input/TestFiedComponent";
import TestArial from "../Input/TestArial";
import AutocompletedComponent from "../Input/AutocompletedComponent";
import CheckBoxComponent from "../Input/CheckBoxComponent";
import { Category, Color, Material, Size } from "../Redux/Selector.tsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface CreateProductDialogProps {
  open: boolean;
  handleClose: () => void;
  productName: string;
  setProductName: (value: string) => void;
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  open,
  handleClose,
  productName,
  setProductName,
}) => {
  const ProductCreate = useState({
    productname: "",
    category: "",
    material: "",
    gender: "",
    colors: [],
    sizes: [],
    price: 0,
    /*
    * [{
    "title":"Title",
    "description":"Mô tả Header của sản phẩm a",
    "idproduct":"2cdf1a0d-2c98-4c91-94cb-8b28e643e0ff"
},{
    "title":"Body",
    "description":"Mô tả Chi tiết của sản phẩm a",
    "idproduct":"2cdf1a0d-2c98-4c91-94cb-8b28e643e0ff"
}]
* CÓ 2 phần input 1 là title cái 2 l nhập chi tiéết description ông làm cái description thanhf 1 manh như tui để ở trên value dây la description
* ,Title giống như phân biêt giưa 2 description treên và idproduct thì ông đừng đụng giữ nguyên cho tui cg đc
    * */
    description: [
      //head
      {
        title: "",
        description: "",
        idproduct: "2cdf1a0d-2c98-4c91-94cb-8b28e643e0ff",
      },
      //body
      {
        title: "",
        description: "",
        idproduct: "2cdf1a0d-2c98-4c91-94cb-8b28e643e0ff",
      },
    ],
    Image: "",
    total: 0,
  });
  const style = {}; // Define your styles here
  const colordata = useSelector(Color) || [];
  const sizedata = useSelector(Size) || [];
  const materialdata = useSelector(Material) || [];
  const categorydata = useSelector(Category) || [];
  const [productDetails, setProductDetails] = useState([
    {
      title: "",
      description: "",
      idproduct: "2cdf1a0d-2c98-4c91-94cb-8b28e643e0ff",
    },
    {
      title: "",
      description: "",
      idproduct: "2cdf1a0d-2c98-4c91-94cb-8b28e643e0ff",
    },
  ]);
  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle>
        <h3>Create Product</h3>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to="/">
            Home
          </Link>
          <Typography color="text.primary">Create Product</Typography>
        </Breadcrumbs>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
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
                        placeholder="Enter product name"
                        value={productName}
                        setvalue={setProductName}
                        title="Product Name"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SelectInput
                        title="Category"
                        options={categorydata.map((el) => el.NameCategory)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SelectInput
                        title="Material"
                        options={materialdata.map((el) => el.NameMaterial)}
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
                  <TestFiedComponent
                    placeholder="Enter your product title"
                    title="Title Product"
                    value={productDetails[0].title}
                    setvalue={(value) => {
                      setProductDetails((prevDetails) => {
                        const updatedDetails = [...prevDetails];
                        updatedDetails[0].title = value;
                        return updatedDetails;
                      });
                    }}
                  />
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <TestArial
                    title="Description"
                    value={productDetails[0].description}
                    setvalue={(value) => {
                      const updatedDetails = [...productDetails];
                      updatedDetails[1].description = value;
                      setProductDetails(updatedDetails);
                    }}
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
            <ListItem>
              <ListItemText
                primary={
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <AutocompletedComponent
                        title="Color"
                        placeholder="Choose Color"
                        array={colordata.map((el) => ({
                          key: el.Color,
                          value: el.HexColor,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <AutocompletedComponent
                        title="Size"
                        placeholder="Choose Size"
                        array={sizedata.map((el) => ({
                          key: el.SizeName,
                          value: el.Size,
                        }))}
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
                          title="Male"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CheckBoxComponent
                          value={productName}
                          setvalue={setProductName}
                          title="Female"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CheckBoxComponent
                          value={productName}
                          setvalue={setProductName}
                          title="Unisex"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                }
              />
            </ListItem>
            <Divider component="li" />
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
                    placeholder="$ 0.00Đ"
                    title="Origin Price"
                    value={productDetails[0].price}
                    setvalue={(value) => {
                      const updatedDetails = [...productDetails];
                      updatedDetails[0].price = value;
                      setProductDetails(updatedDetails);
                    }}
                  />
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
                    value={productDetails[0].price}
                    setvalue={(value) => {
                      const updatedDetails = [...productDetails];
                      updatedDetails[0].price = value;
                      setProductDetails(updatedDetails);
                    }}
                  />
                }
              />
            </ListItem>
            <Divider component="li" />
          </List>
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
  );
};

export default CreateProductDialog;
