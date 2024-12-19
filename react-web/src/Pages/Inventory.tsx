import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Pagination,
  Breadcrumbs,
} from "@mui/material";
import { Link } from "react-router-dom";

// Example mock data
const mockProductData = [
  {
    id: "1",
    name: "Product 1",
    imageUrl: "https://example.com/image1.jpg",
    color: ["Black"],
    size: ["S", "M"],
    quantity: 10,
  },
  {
    id: "2",
    name: "Product 2",
    imageUrl: "https://example.com/image2.jpg",
    color: ["Brown", "Red"],
    size: ["M", "L", "XL"],
    quantity: 5,
  },
];

interface InventoryItem {
  id: string;
  name: string;
  color: string[];
  size: string[];
  quantity: number;
  imageUrl: string;
}

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setInventory(mockProductData);
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <div>
      <Typography variant="h4" marginTop={2}>
        Inventory
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/dashboard">
          Dashboard
        </Link>
        <Typography color="text.primary">Inventory List</Typography>
      </Breadcrumbs>
      <Grid sx={{ margin: 6 }}>
        <TableContainer
          sx={{
            boxShadow: 2,
            borderRadius: 5,
            padding: 2,
            maxHeight: "60vh",
            width: "100%",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Color</TableCell>
                <TableCell align="center">Size</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
                sx={{
                backgroundColor: "#fff",
                marginBottom: 2,
              }}
            >
              {inventory
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">
                      <img src={item.imageUrl} width={50} />
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      {item.color.join(", ")}
                    </TableCell>
                    <TableCell align="center">{item.size.join(", ")}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">
                      {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(inventory.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Grid>
    </div>
  );
};

export default Inventory;
