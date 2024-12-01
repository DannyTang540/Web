import React from 'react';
import { Link, useParams } from 'react-router-dom';
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
  Breadcrumbs,
} from '@mui/material';

const orders = [
  {
    id: 1,
    orderId: "ORD001",
    date: "2024-12-20",
    supplier: "Supplier X",
    status: "Completed",
    total: 500000,
    details: [
      {
        productId: "P001",
        productName: "Product A",
        quantity: 10,
        price: 50000,
        completionDate: "2024-12-25",
      },
      {
        productId: "P002",
        productName: "Product B",
        quantity: 5,
        price: 100000,
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
    total: 600000,
    details: [
      {
        productId: "P003",
        productName: "Product C",
        quantity: 15,
        price: 40000,
        completionDate: "2024-12-27",
      },
    ],
  },
  // Add more orders as needed
];

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orders.find((order) => order.orderId === orderId);

  if (!order) {
    return (
      <Box m={2}>
        <Typography variant="h6">Order not found</Typography>
      </Box>
    );
  }

  const subtotal = order.details.reduce((sum, detail) => sum + detail.price * detail.quantity, 0);
  const shipping = -52170;
  const discount = -85210;
  const taxes = 68710;
  const total = subtotal + shipping + discount + taxes;

  return (
    <Box m={2}>
      <Typography variant="h4">Order Details</Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Product
        </Link>
        <Link color="inherit" to="/invoice">
          Invoice
        </Link>
        <Typography color="text.primary">Order Detail</Typography>
      </Breadcrumbs>
      <TableContainer component={Paper} sx={{mt:10}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.details.map((detail) => (
              <TableRow key={detail.productId}>
                <TableCell>{detail.productName}</TableCell>
                <TableCell align="right">{detail.quantity}</TableCell>
                <TableCell align="right">{detail.price.toLocaleString()} VND</TableCell>
                <TableCell align="right">{(detail.price * detail.quantity).toLocaleString()} VND</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{subtotal.toLocaleString()} VND</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Shipping</TableCell>
              <TableCell align="right">{shipping.toLocaleString()} VND</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Discount</TableCell>
              <TableCell align="right">{discount.toLocaleString()} VND</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Taxes</TableCell>
              <TableCell align="right">{taxes.toLocaleString()} VND</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}><strong>Total</strong></TableCell>
              <TableCell align="right"><strong>{total.toLocaleString()} VND</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderDetail;
