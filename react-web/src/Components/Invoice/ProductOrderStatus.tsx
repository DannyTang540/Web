import React, { useState, MouseEvent } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  Breadcrumbs,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// Update the imports at the top
import { Link, useNavigate } from "react-router-dom";
const orders = [
  {
    id: 1,
    orderId: "ORD001",
    date: "2024-12-20",
    supplier: "Supplier X",
    status: "Completed",
    total: 5000,
    details: [
      {
        productId: "P001",
        productName: "Product A",
        quantity: 10,
        price: 500,
        completionDate: "2024-12-25",
      },
      {
        productId: "P002",
        productName: "Product B",
        quantity: 5,
        price: 1000,
        completionDate: "2024-12-26",
      },
    ],
  },
  {
    id: 2,
    orderId: "ORD002",
    date: "2024-12-21",
    supplier: "Supplier Y",
    status: "Processing",
    total: 6000,
    details: [
      {
        productId: "P003",
        productName: "Product C",
        quantity: 15,
        price: 400,
        completionDate: "2024-12-27",
      },
    ],
  },
  // Add more orders as needed
];

const calculateTotalAmount = () => {
  return orders.reduce((total, order) => total + order.total, 0);
};

export { calculateTotalAmount };

const OrderStatus = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, id: number) => {
    event.stopPropagation(); // Stop the event from bubbling up to TableRow
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleViewOrder = (orderId: string) => {
    handleMenuClose();
    navigate(`/invoice/detail/${orderId}`);
  };

  return (
    <Box m={2}>
      <Typography variant="h4">Order Status</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Amount: {calculateTotalAmount()} VND
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Product
        </Link>
        <Typography color="text.primary">Invoice</Typography>
      </Breadcrumbs>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow onClick={() => handleToggle(order.id)}>
                  <TableCell>
                    <IconButton aria-label="expand row" size="small">
                      {open[order.id] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.total} VND</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="view"
                      aria-controls="view-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, order.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuId === order.id}
                      onClose={handleMenuClose}
                      sx={{
                        boxShadow: "none",
                        borderRadius: 2,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MenuItem onClick={() => handleViewOrder(order.orderId)}>
                        <VisibilityIcon
                          sx={{
                            fontSize: "1rem",
                            color: "#59fbd6",
                          }}
                        />
                        View
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                  >
                    <Collapse in={open[order.id]} timeout="auto" unmountOnExit>
                      <Box margin={2}>
                        <Typography variant="h6" gutterBottom component="div">
                          Order Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Product ID</TableCell>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Completion Date</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.details.map((detail) => (
                              <TableRow key={detail.productId}>
                                <TableCell>{detail.productId}</TableCell>
                                <TableCell>{detail.productName}</TableCell>
                                <TableCell>{detail.quantity}</TableCell>
                                <TableCell>{detail.price} VND</TableCell>
                                <TableCell>{detail.completionDate}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderStatus;
