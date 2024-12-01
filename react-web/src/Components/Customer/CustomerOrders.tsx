import React, { useState } from "react";
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
  Collapse,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export const customerOrders = [
  {
    id: 1,
    orderId: "CUST001",
    customer: "John Doe",
    date: "2024-12-20",
    status: "In Transit",
    total: 10000000,
    details: [
      {
        productId: "P001",
        productName: "Product A",
        quantity: 10,
        price: 500000,
        completionDate: "2024-12-25",
      },
      {
        productId: "P002",
        productName: "Product B",
        quantity: 5,
        price: 1000000,
        completionDate: "2024-12-26",
      },
    ],
  },
  {
    id: 2,
    orderId: "CUST002",
    customer: "Jane Smith",
    date: "2024-12-21",
    status: "Delivered",
    total: 15000000,
    details: [
      {
        productId: "P003",
        productName: "Product C",
        quantity: 15,
        price: 400000,
        completionDate: "2024-12-27",
      },
    ],
  },
];

const calculateTotalAmount = () => {
  return customerOrders.reduce((total, order) => total + order.total, 0);
};

const CustomerOrders = () => {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();

  const handleToggle = (id: number) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleViewDetails = (COId: string) => {
    navigate(`/orders/detail/${COId}`);
  };

  return (
    <Box m={2}>
      <Typography variant="h4">Customer Orders</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Amount: {calculateTotalAmount().toLocaleString()} VND
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerOrders.map((order) => (
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
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.total.toLocaleString()} VND</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="view"
                      onClick={() => handleViewDetails(order.orderId)}
                    >
                      <VisibilityIcon />
                    </IconButton>
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
                                <TableCell>
                                  {detail.price.toLocaleString()} VND
                                </TableCell>
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

export default CustomerOrders;
