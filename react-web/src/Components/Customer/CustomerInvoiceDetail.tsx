
import React from 'react';
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
} from '@mui/material';

const customerInvoiceDetails = [
  { id: 1, name: 'Product A', quantity: 50, price: 100, customer: 'John Doe', date: '2024-12-20', total: 5000 },
  { id: 2, name: 'Product B', quantity: 30, price: 200, customer: 'Jane Smith', date: '2024-12-21', total: 6000 },
  // Add more details as needed
];

const calculateTotalAmount = () => {
  return customerInvoiceDetails.reduce((total, detail) => total + detail.total, 0);
};

const CustomerInvoiceDetail = () => {
  return (
    <Box m={2}>
      <Typography variant="h4">Chi Tiết Hóa Đơn Khách Hàng</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>Tổng Số Tiền: {calculateTotalAmount()} VND</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã Hóa Đơn</TableCell>
              <TableCell>Tên Sản Phẩm</TableCell>
              <TableCell>Số Lượng</TableCell>
              <TableCell>Đơn Giá</TableCell>
              <TableCell>Khách Hàng</TableCell>
              <TableCell>Ngày Mua</TableCell>
              <TableCell>Tổng Tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerInvoiceDetails.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell>{detail.id}</TableCell>
                <TableCell>{detail.name}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>{detail.price} VND</TableCell>
                <TableCell>{detail.customer}</TableCell>
                <TableCell>{detail.date}</TableCell>
                <TableCell>{detail.total} VND</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerInvoiceDetail;
