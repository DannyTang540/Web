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
  Collapse, Chip, Breadcrumbs, Link,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {Color, Order, Size} from "../Redux/Selector.tsx";
import {generateLastSixMonthsData} from "../../Utils/dataGenerator.ts";
import ConvertDateArrayToISO from "../Date/Dateconvert.tsx";

export const customerOrders = [
  {
    id: 1,
    orderId: "CUST001",
    customer: "John Doe",
    date: "2024-12-20",
    status: "In Transit",
    completionDate: "2024-12-25",
    total: 10000000,
    details: [
      {
        productId: "P001",
        productName: "Product A",
        quantity: 10,
        price: 500000,
      },
      {
        productId: "P002",
        productName: "Product B",
        quantity: 5,
        price: 1000000,
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
    completionDate: "2024-12-27",
    details: [
      {
        productId: "P003",
        productName: "Product C",
        quantity: 15,
        price: 400000,
      },
    ],
  },
];
const StatusShipping=[{key:"CONFIRMED",value:"#f6d050"},{key:"SHIPPED",value:"#83a3ff"},{key:"DELIVERED",value:"#59fbd6"},]
const calculateTotalAmount = () => {
  // Ensure this function is exported
  return customerOrders.reduce((total, order) => total + order.total, 0);
};

export { calculateTotalAmount }; // Add this line to export the function

const CustomerOrders = () => {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();
  const Orderdata=useSelector(Order);
  const Sizedata=useSelector(Size);
  const Colordata=useSelector(Color);
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
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link color="inherit" to="/dashboard">
          DashBoard
        </Link>
        <Typography color="text.primary">Customer Order</Typography>
      </Breadcrumbs>
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
              <TableCell>Completion Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Orderdata.map((order) => (
              <React.Fragment key={order.idorder}>
                <TableRow onClick={() => handleToggle(order.idorder)}>
                  <TableCell>
                    <IconButton aria-label="expand row" size="small">
                      {open[order.idorder] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{order.idorder}</TableCell>
                  <TableCell>{order.user.fullname}</TableCell>
                  <TableCell>{ConvertDateArrayToISO(order.orderdate).split("T")[0] }</TableCell>
                  <TableCell><div style={{backgroundColor:`${StatusShipping.find((el)=>el.key==order.status).value}`,color:"white",borderRadius:3,padding:5,display:"flex",justifyContent:"center",alignItems:"center"}}>{order.status}</div></TableCell>
                  <TableCell>{order.totalamount.toLocaleString()} VND</TableCell>

                  <TableCell>
                    <IconButton
                      aria-label="view"
                      onClick={() => handleViewDetails(order.idorder)}
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
                    <Collapse in={open[order.idorder]} timeout="auto" unmountOnExit>
                      <Box margin={2}>
                        <Typography variant="h6" gutterBottom component="div">
                          Order Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Order Item ID</TableCell>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>

                              <TableCell>Color/Size</TableCell>

                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.orderitems.map((detail) => (
                              <TableRow key={detail.idorderitem}>
                                <TableCell>{detail.idorderitem}</TableCell>
                                <TableCell>{detail.productname}</TableCell>
                                <TableCell>{detail.quantity}</TableCell>
                                <TableCell>
                                  {detail.price_at_sale.toLocaleString()} VND
                                </TableCell>
                                <TableCell><div>
                                  <Chip style={{backgroundColor:Colordata.find((el)=>el.Color==detail.colorname).HexColor}} label={Sizedata.find((el)=>el.SizeName==detail.sizename).Size}/>
                                </div></TableCell>

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
