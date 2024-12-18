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
  Breadcrumbs, Button,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import {Purchase} from "../Redux/Selector.tsx";
import {useDispatch, useSelector} from "react-redux";
import {ImportPurchase} from "../Redux/PurchaseSlice.tsx";

/*
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
*/

/*const orderStatusHistory = [
  { status: "Delivery successful", date: "30 Nov 2024 6:41 am" },
  { status: "Transporting to [2]", date: "29 Nov 2024 5:41 am" },
  { status: "Transporting to [1]", date: "28 Nov 2024 4:41 am" },
  {
    status: "The shipping unit has picked up the goods",
    date: "27 Nov 2024 3:41 am",
  },
  { status: "Order has been created", date: "26 Nov 2024 2:41 am" },
];*/

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch=useDispatch();
/*
  const order = orders.find((order) => order.orderId === orderId);
*/
  const Purchasedata=useSelector(Purchase)?.find((el)=>el.id==orderId)||null;
  if (!Purchasedata) {
    return (
      <Box m={2}>
        <Typography variant="h6">Order not found</Typography>
      </Box>
    );
  }
  const handleInportPurchase=async ()=>{
    await dispatch(ImportPurchase(orderId));
  }
  const subtotal = Purchasedata.items.reduce(
    (sum, detail) => sum + detail.totalprice * detail.quantity,
    0
  );

/*
  const total = subtotal + shipping + discount + taxes;
*/

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
      <TableContainer
        component={Paper}
        sx={{ mt: 10, width: "100%", maxWidth: "800px", margin: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Purchasedata.items.map((detail) => (
              <TableRow key={detail.productId}>
                <TableCell>{detail?.version?.product.name}</TableCell>
                <TableCell align={"right"}>{detail?.version?.varient?.size?.size}</TableCell>
                <TableCell align={"right"}>{detail?.version?.varient?.color?.colorname}</TableCell>
                <TableCell align="right">{detail.quantity}</TableCell>
                <TableCell align="right">
                  {detail.totalprice.toLocaleString("vi-VN")} VND
                </TableCell>
                <TableCell align="right">
                  {(detail.totalprice * detail.quantity).toLocaleString()} VND
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={6} />
              <TableCell colSpan={4}>Subtotal</TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", borderTop: "2px solid black" }}
              >
                {subtotal.toLocaleString("vi-VN")} VND
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ backgroundColor: "#e0f7fa", borderTop: "2px solid black" }}
            >
              <TableCell colSpan={4}>Shipping</TableCell>
              <TableCell align="right">
                {0} VND
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ backgroundColor: "#e0f7fa", borderTop: "2px solid black" }}
            >
              <TableCell colSpan={4}>Discount</TableCell>
              <TableCell align="right">
                {0} VND
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ backgroundColor: "#e0f7fa", borderTop: "2px solid black" }}
            >
              <TableCell colSpan={4}>Taxes</TableCell>
              <TableCell align="right">{0} VND</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{subtotal.toLocaleString("vi-VN")} VND</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{display:"flex",justifyContent:"End",width:"800px",margin:"auto"}} component={Paper} p={1}  mt={1}>
        <Button variant="contained"
                onClick={handleInportPurchase}
                  size="large"
                disabled={Purchasedata.status=="Completed"?true:false}
            sx={{
              backgroundColor: "#1976d2", // Màu xanh chủ đạo
              color: "#fff", // Màu chữ
              borderRadius: "8px", // Bo tròn góc
              textTransform: "none", // Giữ nguyên kiểu chữ
              fontWeight: "bold",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Đổ bóng
              "&:hover": {
                backgroundColor:Purchasedata.status=="Completed"?"#59fbd6":"#1565c0" , // Màu khi hover
                boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.3)", // Đổ bóng mạnh hơn khi hover
              },
              "&:active": {
                backgroundColor: "#0d47a1", // Màu khi nhấn
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Giảm bóng khi click
              },
            }}>Confirmation of import</Button>
{/*
        <Timeline sx={{ pr: 60 }}>
          {orderStatusHistory
            .slice()
            .reverse()
            .map((entry, index) => (
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
*/}
      </Box>
    </Box>
  );
};

export default OrderDetail;
