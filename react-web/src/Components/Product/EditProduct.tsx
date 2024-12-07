import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Autocomplete,
  colors,
  FormControlLabel,
  Grid,
  Checkbox,
} from "@mui/material";
import {
  mockColors,
  mockSizes,
  mockMaterials,
  mockCategories,
} from "./CreateProduct";

const EditProduct: React.FC<{
  product: any;
  open: boolean;
  onSave: (updatedProduct: any) => void;
  onCancel: () => void;
}> = ({ product, open, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    productname: product.name || "",
    category: product.category?.name || "",
    material: product.material?.name || "",
    title: product.title || "",
    description: product.description || "",
    colors: product.colors || [],
    sizes: product.sizes || [],
    gender: product.gender || "",
    price: product.price || 0,
    sellingprice: product.price || 0,
    image: product.image?.urlImage || "",
  });

  useEffect(() => {
    setFormData({
      productname: product.name || "",
      category: product.category?.name || "",
      material: product.material?.name || "",
      title: product.title || "",
      description: product.description || "",
      colors: product.colors || [],
      sizes: product.sizes || [],
      gender: product.gender || "",
      price: product.originPrice || 0,
      sellingprice: product.sellingPrice || 0,
      image: product.image?.urlImage || "",
    });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.productname ||
      !formData.material ||
      formData.sellingprice <= 0 ||
      !formData.category
    ) {
      alert(
        "Please fill in all required fields: Product Name, Material, Selling Price, and Category must be provided."
      );
      return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="md" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent sx={{ height: "500px" }}>
        <Stack spacing={2}>
          <TextField
            name="productname"
            label="Product Name"
            value={formData.productname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <Autocomplete
            options={mockMaterials}
            value={formData.material}
            onChange={(event, newValue) => {
              setFormData({ ...formData, material: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Material" fullWidth />
            )}
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
          <Grid container spacing={2}>
            {["Male", "Female", "Unisex"].map((gender) => (
              <Grid item key={gender}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.gender === gender}
                      onChange={() => setFormData({ ...formData, gender })}
                    />
                  }
                  label={gender}
                />
              </Grid>
            ))}
          </Grid>
          <TextField
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="sellingprice"
            label="Selling Price"
            type="number"
            value={formData.sellingprice}
            onChange={handleChange}
            fullWidth
          />
          <Autocomplete
            multiple
            options={mockSizes}
            value={formData.sizes}
            onChange={(event, newValue) => {
              setFormData({ ...formData, sizes: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Sizes" fullWidth />
            )}
          />
          <Autocomplete
            multiple
            options={mockColors}
            getOptionLabel={(option) => option?.label || ""}
            value={formData.colors.map(
              (colorName) =>
                mockColors.find((c) => c.label === colorName) || mockColors[0]
            )}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                colors: newValue.map((item) => item?.label || ""),
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Colors" fullWidth />
            )}
          />
          <Autocomplete
            options={mockCategories}
            value={formData.category}
            onChange={(event, newValue) => {
              setFormData({ ...formData, category: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Category" fullWidth />
            )}
          />
          <TextField
            name="image"
            label="Image URL"
            value={formData.image}
            onChange={handleChange}
            fullWidth
          />
          <div>
            <input
              type="file"
              accept="image/*"
              title="Product Images"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({
                      ...formData,
                      image: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;
