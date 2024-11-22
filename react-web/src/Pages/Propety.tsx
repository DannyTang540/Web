import {
  Badge,
  Box,
  Button,
  Tab,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BreadcrumbComponent from "../Components/Breadcrumbs/BreadcrumbComponent";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Email } from "@mui/icons-material";
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
const HeaderOneEven = ({ CustomButton }) => {
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
            <Box sx={{ width: "200px" }}>
            </Box>

            {/* Button */}
            {CustomButton}
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const HeaderTwoEven = ({ SelectInput, CustomButton }) => {
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
            <Box sx={{ width: "200px" }}>
              {SelectInput}
            </Box>

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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="p-6 bg-gray-50 w-full flex flex-col">
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
                iconPosition="left"
                icon={
                  <Badge badgeContent={4} color="primary">
                    <Email sx={{ fontSize: "20px" }} color="action" />
                  </Badge>
                }
                value="1"
              />
              <Tab
                label="Size"
                iconPosition="left"
                icon={
                  <Badge badgeContent={4} color="primary">
                    <Email sx={{ fontSize: "20px" }} color="action" />
                  </Badge>
                }
                value="2"
              />
              <Tab
                label="Color"
                iconPosition="left"
                icon={
                  <Badge badgeContent={4} color="primary">
                    <Email sx={{ fontSize: "20px" }} color="action" />
                  </Badge>
                }
                value="3"
              />
              <Tab
                label="Material"
                iconPosition="left"
                icon={
                  <Badge badgeContent={4} color="primary">
                    <Email sx={{ fontSize: "20px" }} color="action" />
                  </Badge>
                }
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
                      className="!bg-black !capitalize !py-2 !px-4"
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
                      className="!bg-black !capitalize !py-2 !px-4"
                    >
                      + New Size
                    </Button>
                  }
                />
              }
            />
          </TabPanel>
          <TabPanel value="3">
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
                        className="!bg-black !capitalize !py-2 !px-4"
                      >
                        + New Color
                      </Button>
                    }
                  />
                }
              />
            </TabPanel>
          </TabPanel>
          <TabPanel value="4">
            <TabPanel value="4">
              <TableData
                Head={rowMaterial}
                Data={colMaterial}
                HeaderComponent={
                  <HeaderTwoEven
                    SelectInput={<SelectInput title={"Status"} />}
                    CustomButton={
                      <Button
                        variant="contained"
                        color="primary"
                        className="!bg-black !capitalize !py-2 !px-4"
                      >
                        + New Material
                      </Button>
                    }
                  />
                }
              />
            </TabPanel>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Propety;
