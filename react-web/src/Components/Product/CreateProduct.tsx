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
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import TestFieldSmall from "../Input/TestFieldSmall";
import SelectInput from "../Input/SelectInput";
import TestFiedComponent from "../Input/TestFiedComponent";
import TestArial from "../Input/TestArial";
import AutocompletedComponent from "../Input/AutocompletedComponent";
import CheckBoxComponent from "../Input/CheckBoxComponent";
import { Link } from "react-router-dom";

// Dữ liệu giả cho material, color, size và category
const mockMaterials = ["Cotton", "Polyester", "Wool", "Silk"];
const mockColors = [
  { label: "Red", value: "#FF0000" },
  { label: "Green", value: "#00FF00" },
  { label: "Blue", value: "#0000FF" },
  { label: "Black", value: "#000000" },
];
const mockSizes = ["S", "M", "L", "XL"];
const mockCategories = ["Clothing", "Footwear", "Accessories", "Electronics"];

interface CreateProductDialogProps {
  open: boolean;
  handleClose: () => void;
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  open,
  handleClose,
}) => {
  const [ProductCreate, setProductCreate] = useState<{
    productname: string;
    category: string;
    material: string;
    gender: string;
    colors: string[];
    sizes: string[];
    price: number;
    sellingprice: number;
    description: {
      title: string;
      description: string;
      idproduct: string;
    }[];
    Image: string;
  }>({
    productname: "",
    category: "",
    material: "",
    gender: "",
    colors: [],
    sizes: [],
    price: 0,
    sellingprice: 0,
    description: [
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
    ],
    Image: "",
  });
  const [gender, setGender] = useState<string>("");

  const handleDescriptionUpdate = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    console.log(`Updated ${field} at index ${index}:`, value);
    setProductCreate((prev) => {
      const updatedDescription = [...prev.description];
      updatedDescription[index] = {
        ...updatedDescription[index],
        [field]: value,
      };
      return { ...prev, description: updatedDescription };
    });
  };
  const handleInputChange = (field: string, value: string | string[]) => {
    setProductCreate((prev) => ({ ...prev, [field]: value }));
  };
  const handlePriceChange = (value: number) => {
    setProductCreate((prev) => ({ ...prev, price: value }));
  };
  const handleSellingPriceChange = (value: number) => {
    setProductCreate((prev) => ({ ...prev, sellingprice: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        console.error("Invalid file type. Please upload an image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        console.error("File size exceeds 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setProductCreate((prev) => ({
          ...prev,
          Image: imageData,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const resetForm = () => {
    setProductCreate({
      productname: "",
      category: "",
      material: "",
      gender: "",
      colors: [],
      sizes: [],
      price: 0,
      sellingprice: 0,
      description: [
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
      ],
      Image: "",
    });
  };
  const handleSubmit = () => {
    console.log("Final Product Data:", ProductCreate);
    resetForm();
    handleClose();
  };
  const handleProductNameChange = (value: string) => {
    setProductCreate((prev) => ({ ...prev, productname: value }));
  };
  return (
    <>
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
            <List>
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
                          value={ProductCreate.productname}
                          setvalue={(value: string) =>
                            handleProductNameChange(value)
                          }
                          title="Product Name"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Autocomplete
                          options={mockCategories}
                          value={ProductCreate.category}
                          onChange={(e, value) =>
                            handleInputChange("category", value || "")
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Category"
                              placeholder="Select category"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Autocomplete
                          options={mockMaterials}
                          value={ProductCreate.material}
                          onChange={(e, value) =>
                            handleInputChange("material", value || "")
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Material"
                              placeholder="Select material"
                            />
                          )}
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
                      value={ProductCreate.description[0].title}
                      setvalue={(value: string) =>
                        handleDescriptionUpdate(0, "title", value)
                      }
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
                      value={ProductCreate.description[1].description}
                      setvalue={(value: string) =>
                        handleDescriptionUpdate(1, "description", value)
                      }
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
                        title="Product Images"
                        onChange={handleFileChange}
                        multiple
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
                        <Autocomplete
                          multiple
                          options={mockColors}
                          getOptionLabel={(option) => option.label}
                          value={ProductCreate.colors.map((color) =>
                            mockColors.find((c) => c.label === color)
                          )}
                          onChange={(e, value) =>
                            handleInputChange(
                              "colors",
                              value.map((item) => item.label)
                            )
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Colors"
                              placeholder="Select colors"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Autocomplete
                          multiple
                          options={mockSizes}
                          value={ProductCreate.sizes}
                          onChange={(e, value) =>
                            handleInputChange("sizes", value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Sizes"
                              placeholder="Select sizes"
                            />
                          )}
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
                      <Grid container spacing={2}>
                        {["Male", "Female", "Unisex"].map((gender) => (
                          <Grid item key={gender}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={ProductCreate.gender === gender}
                                  onChange={() =>
                                    handleInputChange("gender", gender)
                                  }
                                />
                              }
                              label={gender}
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
                      value={ProductCreate.price}
                      setvalue={(value: number) => {
                        handlePriceChange(value);
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
                      value={ProductCreate.sellingprice}
                      setvalue={(value: number) => {
                        handleSellingPriceChange(value);
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
          <Button color="info" variant="outlined" onClick={handleSubmit}>
            Create
          </Button>
          <Button variant="text" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateProductDialog;
