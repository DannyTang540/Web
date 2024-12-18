import React from "react";
import { Link, useParams } from "react-router-dom";
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
  Grid, Avatar, Button,
} from "@mui/material";
import { customerOrders } from "./CustomerOrders";
import {
  Timeline,
  TimelineContent,
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {Order} from "../Redux/Selector.tsx";
import {useDispatch, useSelector} from "react-redux";
import ConvertDateArrayToISO, {formatDateTime} from "../Date/Dateconvert.tsx";
import {ChangeStatus} from "../Redux/OrderSlice.tsx";

const CustomerDetail: React.FC = () => {
  const { COId } = useParams<{ COId: string }>();
  const dispatch=useDispatch();
  const orderdata=useSelector(Order);
  const order = orderdata.find(
    (order: { idorder: string }) => order.idorder === COId
  );

  if (!order) {
    return (
      <Box m={2}>
        <Typography variant="h6">Order not found</Typography>
      </Box>
    );
  }
  const handleComfrom=async ()=>{
    await dispatch(ChangeStatus(COId));
  }
  const subtotal = order.orderitems.reduce(
    (sum, detail) => sum + detail.price_at_sale * detail.quantity,
    0
  );
  const shipping = -52170;
  const discount = -85210;
  const taxes = 68710;
  const total = subtotal + shipping + discount + taxes;
  console.log(order.shippings.length)
  const orderStatusHistory = [
    {
      display:order?.shippings[0]?true:false,
      status: "Order has been created",
      date:formatDateTime(ConvertDateArrayToISO(order?.shippings[0]?.createdat??[null,null,null,null,null,null,null])),
    },

    {
      display:order?.shippings[1]?true:false,
      status: "The shipping unit has picked up the goods ",
      date:formatDateTime(ConvertDateArrayToISO(order?.shippings[1]?.createdat??[null,null,null,null,null,null,null])),
    },
    {
      display:order?.shippings[2]?true:false,
      status: "Delivery successful",
      date:formatDateTime(ConvertDateArrayToISO(order?.shippings[2]?.createdat||[null,null,null,null,null,null,null]))
    },
  ];

  // Thông tin khách hàng
  const customerInfo = {
    name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    ipAddress: "192.158.1.38",
    shipping: {
      address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
      phone: "365-374-4961",
      shipBy: "DHL",
      speedy: "Standard",
      trackingNo: "SPX0377391999373",
    },
  };

  return (
    <Box m={5} width="110%">
      <Typography variant="h4">Customer Order Details</Typography>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link color="inherit" to="/">
          Home
        </Link>
        <Link color="inherit" to="/orders">
          Customer Orders
        </Link>
        <Typography color="text.primary">Customer Order Detail</Typography>
      </Breadcrumbs>
      <Grid container  spacing={2}>
        <Paper sx={{display:"flex",width:"100%",justifyContent:"space-between",margin:"auto"}} component={Box} p={2} mt={2}>
          <Typography variant="h5">OrderID: {order.idorder}</Typography>
          <Button
              onClick={handleComfrom}
              disabled={order.shippings.length!=2?false:true}
              sx={{ backgroundColor: "#1976d2", // Màu xanh chủ đạo
            color: "#fff", // Màu chữ
            borderRadius: "8px", // Bo tròn góc
            textTransform: "none", // Giữ nguyên kiểu chữ
            fontWeight: "bold",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Đổ bóng
            "&:hover": {
              backgroundColor:order.shippings.length!=2?"#59fbd6":"#1565c0" , // Màu khi hover
              boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.3)", // Đổ bóng mạnh hơn khi hover
            },
            "&:active": {
              backgroundColor: "#0d47a1", // Màu khi nhấn
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Giảm bóng khi click
            },}}>Order Confirmation</Button>
        </Paper>

      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper component={Box} p={2} mt={2}>
            <Grid container alignItems="center" spacing={2}>
              {/* Thông tin bên trái */}
              <Grid item xs={8}>
                <Typography variant="h6">Customer Info</Typography>
                <Typography>Name: {order.user.fullname}</Typography>
                <Typography>Email: {order.user.email}</Typography>
                <Typography>Gender: {order.user.gender}</Typography>
              </Grid>

              {/* Avatar bên phải */}
              <Grid item xs={4} container justifyContent="flex-end">
                <Avatar
                    alt={order.user.fullname}
                    src={order.user.avatar?order.user.avatar:"https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp"} // URL avatar của user
                    sx={{ width: 100, height: 100 }} // Kích thước avatar
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper component={Box} p={2} mt={2}>
            <Typography variant="h6">Delivery</Typography>
            <Typography>Ship by: DHL</Typography>
            <Typography>Speedy: Standard</Typography>
            <Typography>
              Tracking No: SPX0377391999373
            </Typography>
            <Typography>Address: {customerInfo.shipping.address}</Typography>
            <Typography>Phone number: {order.user.phonenumber}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Order Details</Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead component={Box} p={2} mt={2}>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.orderitems.map((detail) => (
                  <TableRow
                    key={detail.idorderitem}
                    sx={{ borderBottom: "2px solid #ccc" }}
                  >
                    <TableCell>{detail.productname}</TableCell>
                    <TableCell align="right">{detail.quantity}</TableCell>
                    <TableCell align="right">
                      {detail.price_at_sale.toLocaleString()} VND
                    </TableCell>
                    <TableCell align="right">
                      {(detail.price_at_sale * detail.quantity).toLocaleString()} VND
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {subtotal.toLocaleString()} VND
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Shipping</TableCell>
                  <TableCell align="right">
                    {shipping.toLocaleString()} VND
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Discount</TableCell>
                  <TableCell align="right">
                    {discount.toLocaleString()} VND
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Taxes</TableCell>
                  <TableCell align="right">
                    {taxes.toLocaleString()} VND
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{total.toLocaleString()} VND</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Box component={Paper} p={2} mt={2}>
        <Typography variant="h6">History</Typography>
        <Timeline sx={{ pr: 60 }}>
          {orderStatusHistory
              .filter((entry: { display: boolean }) => entry.display)
            .slice()
            .map((entry: { status: string; date: string }, index: number) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    color={
                      index === orderStatusHistory.length - 1
                        ? "success"
                        : "grey"
                    }
                  />
                  {index < orderStatusHistory.length - 1 && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="body2">{entry.status}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {entry.date}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      </Box>
    </Box>
  );
};

export default CustomerDetail;
