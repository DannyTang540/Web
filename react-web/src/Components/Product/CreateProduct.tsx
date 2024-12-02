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
  const [ProductCreate, setProductCreate] = useState({
    productname: "",
    category: "",
    material: "",
    gender: "",
    colors: [],
    sizes: [],
    price: 0,
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
  const [gender, setGender] = useState<string>("");
  const style = {}; // Define your styles here
  const colordata = useSelector(Color) || [];
  const sizedata = useSelector(Size) || [];
  const materialdata = useSelector(Material) || [];
  const categorydata = useSelector(Category) || [];

  const handleCategoryChange = (value: string) => {
    setProductCreate((prev) => ({ ...prev, category: value }));
  };
  const handleMaterialChange = (value: string) => {
    setProductCreate((prev) => ({ ...prev, material: value }));
  };
  const handleGenderChange = (gender: string) => {
    setGender(gender);
    setProductCreate((prev) => ({ ...prev, gender }));
  };
  const handleColorsChange = (values: string[]) => {
    setProductCreate((prev) => ({ ...prev, colors: values as any }));
  };
  const handleSizesChange = (values: string[]) => {
    setProductCreate((prev) => ({ ...prev, sizes: values as any }));
  };
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
  const handlePriceChange = (value: number) => {
    setProductCreate((prev) => ({ ...prev, price: value }));
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
      description: [
        { title: "", description: "", idproduct: "2cdf1a0d-2c98-4c91-94cb-8b28e643e0ff" },
        { title: "", description: "", idproduct: "2cdf1a0d-2c98-4c91-94cb-8b28e643e0ff" },
      ],
      Image: "",
      total: 0,
    });
    setProductName("");
  };
  const handleSubmit = () => {
    console.log("Final Product Data:", ProductCreate);
    resetForm();
    handleClose();
  };
  const handleProductNameChange = (value: string) => {
    setProductName(value);
    setProductCreate((prev) => ({ ...prev, productname: value }));
  };
  return (
    <div className="create-product-dialog">
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
                          setvalue={handleProductNameChange}
                          title="Product Name"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SelectInput
                          title="Category"
                          options={
                            categorydata.length > 0
                              ? categorydata.map(
                                  (el: { NameCategory: string }) =>
                                    el.NameCategory
                                )
                              : [""]
                          }
                          value={ProductCreate.category || ""}
                          onChange={handleCategoryChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SelectInput
                          title="Material"
                          options={materialdata.map(
                            (el: { NameMaterial: string }) => el.NameMaterial
                          )}
                          value={ProductCreate.material || ""}
                          onChange={handleMaterialChange}
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
                        <AutocompletedComponent
                          title="Color"
                          placeholder="Choose Color"
                          array={colordata.map((el) => ({
                            key: el.Color,
                            value: el.HexColor,
                          }))}
                          setValues={(values: string[]) =>
                            handleColorsChange(values)
                          }
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
                          setvalue={(values: string[]) =>
                            handleSizesChange(values)
                          }
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
                            value={gender === "Male"}
                            setvalue={() => handleGenderChange("Male")}
                            title="Male"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <CheckBoxComponent
                            value={gender === "Female"}
                            setvalue={() => handleGenderChange("Female")}
                            title="Female"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <CheckBoxComponent
                            value={gender === "Unisex"}
                            setvalue={() => handleGenderChange("Unisex")}
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
                      value={ProductCreate.price}
                      setvalue={(value: number) => {
                        handlePriceChange(value);
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
    </div>
  );
};

export default CreateProductDialog;
