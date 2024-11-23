import {
  Badge,
  Box,
  Button,
  Tab,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import BreadcrumbComponent from "../Components/Breadcrumbs/BreadcrumbComponent";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CategoryIcon from "@mui/icons-material/Category";
import TableData from "../Components/Table/TableData";
import SelectInput from "../Components/Input/SelectInput";
const rowCategory = ["Id", "NameCategory", "CreateAt", "UpdateAt", "Status"];
const colCategory = [
  {
    Id: 1,
    NameCategory: "Category 1",
    CreateAt: "2024-11-22T09:37:12.345Z",
    UpdateAt: "2024-11-22T09:37:12.345Z",
    Status: "Active",
  },
  {
    Id: 2,
    NameCategory: "Category 2",
    CreateAt: "2024-11-22T09:37:12.345Z",
    UpdateAt: "2024-11-22T09:37:12.345Z",
    Status: "Active",
  },
  {
    Id: 3,
    NameCategory: "Category 3",
    CreateAt: "2024-11-22T09:37:12.345Z",
    UpdateAt: "2024-11-22T09:37:12.345Z",
    Status: "Delete",
  },
];
const rowMaterial = ["Id", "NameMaterial", "CreateAt", "UpdateAt", "Status"];
const colMaterial = [
  {
    Id: 1,
    NameMaterial: "Len",
    CreateAt: "2024-11-22T09:37:12.345Z",
    UpdateAt: "2024-11-22T09:37:12.345Z",
    Status: "Active",
  },
  {
    Id: 2,
    NameMaterial: "Cotton",
    CreateAt: "2024-11-22T09:37:12.345Z",
    UpdateAt: "2024-11-22T09:37:12.345Z",
    Status: "Active",
  },
  {
    Id: 3,
    NameMaterial: "Nỉ",
    CreateAt: "2024-11-22T09:37:12.345Z",
    UpdateAt: "2024-11-22T09:37:12.345Z",
    Status: "Delete",
  },
];
const rowSize = ["Id", "Size", "SizeName", "CreateAt", "UpdateAt"];
const colSize = [
  {
    Id: 1,
    Size: "S",
    SizeName: "Small",
    CreateAt: new Date().toISOString(),
    UpdateAt: new Date().toISOString(),
  },
  {
    Id: 2,
    Size: "M",
    SizeName: "Medium",
    CreateAt: new Date().toISOString(),
    UpdateAt: new Date().toISOString(),
  },
  {
    Id: 3,
    Size: "L",
    SizeName: "Large",
    CreateAt: new Date().toISOString(),
    UpdateAt: new Date().toISOString(),
  },
];
const rowColor = ["Id", "Color", "HexColor", "CreateAt"];
const colColor = [
  {
    Id: 1,
    Color: "Red",
    HexColor: "#FF0000",
    CreateAt: new Date().toISOString(),
  },
  {
    Id: 2,
    Color: "Blue",
    HexColor: "#0000FF",
    CreateAt: new Date().toISOString(),
  },
  {
    Id: 3,
    Color: "Green",
    HexColor: "#00FF00",
    CreateAt: new Date().toISOString(),
  },
  {
    Id: 4,
    Color: "Yellow",
    HexColor: "#FFFF00",
    CreateAt: new Date().toISOString(),
  },
];
const HeaderOneEven = ({ CustomButton }: { CustomButton: React.ReactNode }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="flex justify-between items-center"
          >
            {/* Select Input */}
            <Box sx={{ width: "200px" }}></Box>

            {/* Button */}
            {CustomButton}
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const HeaderTwoEven = ({
  SelectInput,
  CustomButton,
}: {
  SelectInput: React.ReactNode;
  CustomButton: React.ReactNode;
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="flex justify-between items-center"
          >
            {/* Select Input */}
            <Box sx={{ width: "200px" }}>{SelectInput}</Box>

            {/* Button */}
            {CustomButton}
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
const Propety = () => {
  const [value, setValue] = useState("1");
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleOpenDialog = (type: string) => {
    console.log("Dialog type:", type);
    setFormData({ type });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Kiểm tra xem các trường có để trống không
    if (!formData.NameMaterial && formData.type === "material") {
      alert("Material Name is required.");
      return;
    }
    if (!formData.CategoryName && formData.type === "category") {
      alert("Category Name is required.");
      return;
    }
    if (!formData.Size && formData.type === "size") {
      alert("Size is required.");
      return;
    }
    if (!formData.SizeName && formData.type === "size") {
      alert("Size Name is required.");
      return;
    }
    if (!formData.Color && formData.type === "color") {
      alert("Color is required.");
      return;
    }
    if (!formData.HexColor && formData.type === "color") {
      alert("Hex Color is required.");
      return;
    }
    // Nếu tất cả các trường đều hợp lệ
    console.log(formData);
    handleCloseDialog();
  };

  return (
    <div className="property">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="h5">Property</Typography>
      </Box>
      <BreadcrumbComponent
        label={[
          { label: "Property", final: false },
          { label: "List", final: true },
        ]}
      />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Category"
                icon={<CategoryIcon sx={{ fontSize: "20px" }} color="action" />}
                value="1"
              />
              <Tab
                label="Size"
                icon={<CategoryIcon sx={{ fontSize: "20px" }} color="action" />}
                value="2"
              />
              <Tab
                label="Color"
                icon={<CategoryIcon sx={{ fontSize: "20px" }} color="action" />}
                value="3"
              />
              <Tab
                label="Material"
                icon={<CategoryIcon sx={{ fontSize: "20px" }} color="action" />}
                value="4"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableData
              Head={rowCategory}
              Data={colCategory}
              HeaderComponent={
                <HeaderTwoEven
                  SelectInput={<SelectInput title={"Status"} />}
                  CustomButton={
                    <Button
                      variant="contained"
                      color="primary"
                      className="Add-Category"
                      onClick={() => handleOpenDialog("category")}
                    >
                      + New Category
                    </Button>
                  }
                />
              }
            />
          </TabPanel>
          <TabPanel value="2">
            <TableData
              Head={rowSize}
              Data={colSize}
              HeaderComponent={
                <HeaderOneEven
                  CustomButton={
                    <Button
                      variant="contained"
                      color="primary"
                      className="Add-Size"
                      onClick={() => handleOpenDialog("size")}
                    >
                      + New Size
                    </Button>
                  }
                />
              }
            />
          </TabPanel>
          <TabPanel value="3">
            <TableData
              Head={rowColor}
              Data={colColor}
              HeaderComponent={
                <HeaderOneEven
                  CustomButton={
                    <Button
                      variant="contained"
                      color="primary"
                      className="Add-Color"
                      onClick={() => handleOpenDialog("color")}
                    >
                      + New Color
                    </Button>
                  }
                />
              }
            />
          </TabPanel>
          <TabPanel value="4">
            <TableData
              Head={rowMaterial}
              Data={colMaterial}
              HeaderComponent={
                <HeaderTwoEven
                  CustomButton={
                    <Button
                      variant="contained"
                      color="primary"
                      className="Add"
                      onClick={() => handleOpenDialog("material")}
                    >
                      + New Material
                    </Button>
                  }
                  SelectInput={undefined}
                />
              }
            />
          </TabPanel>
        </TabContext>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {formData.type === "category"
            ? "Add Category"
            : formData.type === "size"
            ? "Add Size"
            : formData.type === "color"
            ? "Add Color"
            : formData.type === "material"
            ? "Add Material"
            : ""}
        </DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          {formData.type === "category" && (
            <TextField
              autoFocus
              margin="dense"
              name="CategoryName"
              label="Category Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          )}
          {formData.type === "size" && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="Size"
                label="Size"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="SizeName"
                label="Size Name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </>
          )}
          {formData.type === "color" && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="Color"
                label="Color"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="HexColor"
                label="Hex Color"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </>
          )}
          {formData.type === "material" && (
            <TextField
              autoFocus
              margin="dense"
              name="NameMaterial"
              label="Material Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Propety;
