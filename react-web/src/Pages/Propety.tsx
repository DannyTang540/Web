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
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import BreadcrumbComponent from "../Components/Breadcrumbs/BreadcrumbComponent";
import TabContext from "@mui/lab/TabContext";
import AddIcon from "@mui/icons-material/Add";
import { CgSize } from "react-icons/cg";
import { GiMaterialsScience } from "react-icons/gi";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CategoryIcon from "@mui/icons-material/Category";
import TableData from "../Components/Table/TableData";
import SelectInput from "../Components/Input/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { Category, Color, Material, Size } from "../Components/Redux/Selector";
import { CreateColor } from "../Components/Redux/ColorSlice";
import { toasityComponent } from "../Components/SnackBar/SnackBarComponent";
import { StatusEnum } from "../types/Status";
import { CreateCategory } from "../Components/Redux/CategorySlice";
import { CreateSize } from "../Components/Redux/SizeSlice";
import { CreateMaterial } from "../Components/Redux/MaterialSlice";
import { toast } from "react-toastify";
const rowCategory = ["Id", "NameCategory", "CreateAt", "UpdateAt", "Status"];

const rowMaterial = ["Id", "NameMaterial", "CreateAt", "UpdateAt", "Status"];

const rowSize = ["Id", "Size", "SizeName", "CreateAt", "UpdateAt"];

const rowColor = ["Id", "Color", "HexColor", "CreateAt"];
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
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const colColor = useSelector(Color);
  const colCategory = useSelector(Category);
  const colSize = useSelector(Size);
  const colMaterial = useSelector(Material);
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
  const SnackBarComponent = ({ open, handleClose, message }) => (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
    />
  );
  const handleSubmit = async () => {
    if (!formData.NameMaterial && formData.type === "material") {
      toasityComponent("Material Name is required.", StatusEnum.INFO);
      return;
    }
    if (!formData.CategoryName && formData.type === "category") {
      toasityComponent("Category Name is required.", StatusEnum.INFO);
      return;
    }
    if (!formData.Size && formData.type === "size") {
      toasityComponent("Size is required.", StatusEnum.INFO);
      return;
    }
    if (!formData.SizeName && formData.type === "size") {
      toasityComponent("Size Name is required.", StatusEnum.INFO);
      return;
    }
    if (!formData.Color && formData.type === "color") {
      toasityComponent("Color is required.", StatusEnum.INFO);
      return;
    }
    if (!formData.HexColor && formData.type === "color") {
      toasityComponent("Hex Color is required.", StatusEnum.INFO);
      return;
    }
    // Nếu tất cả các trường đều hợp lệ
    console.log(formData);
    switch (formData.type) {
      case "material":
        await dispatch(
          CreateMaterial({
            name: formData.NameMaterial,
          })
        );
        toast.success("Material Created");
        break;
      case "category":
        await dispatch(
          CreateCategory({
            name: formData.CategoryName,
          })
        );
        toast.success("Category Created");
        break;
      case "size":
        await dispatch(
          CreateSize({
            size: formData.Size,
            sizename: formData.SizeName,
          })
        );
        toast.success("Size Created");
        break;
      case "color":
        await dispatch(
          CreateColor({
            colorname: formData.Color,
            colorhex: formData.HexColor,
          })
        );
        toast.success("Color Created");
        break;
    }
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
                icon={<CgSize size={"20px"} color="action" />}
                value="2"
              />
              <Tab
                label="Color"
                icon={
                  <ColorLensIcon sx={{ fontSize: "20px" }} color="action" />
                }
                value="3"
              />
              <Tab
                label="Material"
                icon={<GiMaterialsScience size={"20px"} color="action" />}
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
                  SelectInput={
                    <SelectInput
                      title={"Status"}
                      options={["Active", "Inactive"]}
                    />
                  }
                  CustomButton={
                    <Button
                      variant="outlined"
                      color="primary"
                      className="Add-Category"
                      sx={{ fontWeight: "Bold", borderRadius: "12px" }}
                      onClick={() => handleOpenDialog("category")}
                    >
                      <AddIcon /> New Category
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
                      variant="outlined"
                      color="primary"
                      className="Add-Size"
                      sx={{ fontWeight: "Bold", borderRadius: "12px" }}
                      onClick={() => handleOpenDialog("size")}
                    >
                      <AddIcon /> New Size
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
                      variant="outlined"
                      color="primary"
                      className="Add-Color"
                      sx={{ fontWeight: "Bold", borderRadius: "12px" }}
                      onClick={() => handleOpenDialog("color")}
                    >
                      <AddIcon /> New Color
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
                      variant="outlined"
                      color="primary"
                      className="Add-Material"
                      sx={{ fontWeight: "Bold", borderRadius: "12px" }}
                      onClick={() => handleOpenDialog("material")}
                    >
                      <AddIcon /> New Material
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
