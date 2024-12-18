  import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Tooltip,
  } from "@mui/material";
  import React from "react";
  import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
  import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
  import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
  import MailOutlineIcon from "@mui/icons-material/MailOutline";
  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    BarChart,
    Bar,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
  import CustomerOrders, { calculateTotalAmount } from "../Components/Customer/CustomerOrders";
  import OrderStatus, { calculateTotalAmount as calculateOrderTotal } from "../Components/Invoice/ProductOrderStatus";

  const DashBoard: React.FC = () => {
    const onchange: number = 10; // Example value, replace with your actual logic
    const calculatePercentageChange = (current: number, previous: number) => {
      if (previous === 0) return 0; // Tránh chia cho 0
      return ((current - previous) / previous) * 100;
    };
    
    const createSparklineData = (data: number[]) => ({
      labels: ["", "", "", ""],
      datasets: [
        {
          data: data,
          borderColor: "currentColor",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
          tension: 0.4,
        },
      ],
    });

    const chartOptions = {
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
      maintainAspectRatio: false,
      responsive: true,
    };

    const trendData = [
      { name: "Week 1", value: 400 },
      { name: "Week 2", value: 300 },
      { name: "Week 3", value: 500 },
      { name: "Week 4", value: 200 },
    ];

    const orderTrendData = [
      { name: "Week 1", value: 200 },
      { name: "Week 2", value: 300 },
      { name: "Week 3", value: 250 },
      { name: "Week 4", value: 400 },
    ];

    // Sample data for the chart
    const data = [
      { month: "Jan", teamA: 40 },
      { month: "Feb", teamA: 30 },
      { month: "Mar", teamA: 60 },
      { month: "Apr", teamA: 50 },
      { month: "May", teamA: 70 },
      { month: "Jun", teamA: 80 },
      { month: "Jul", teamA: 60 },
      { month: "Aug", teamA: 90 },
      { month: "Sep", teamA: 70 },
    ];
    const currentWeekValue = trendData[trendData.length - 1].value; const previousWeekValue = trendData[trendData.length - 2].value;
    const totalAmount = calculateTotalAmount();
    const totalOrders = calculateOrderTotal();
    const percentageChange = calculatePercentageChange(currentWeekValue, previousWeekValue);    return (
      <>
        <Box mt={3} ml={5}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="h6">Welcome back!!!</Typography>
        </Box>
        <Grid container spacing={3} mt={3} ml={5}>
          <Grid item xs={4}>
            <Card
              sx={{
                bgcolor: "#c8e6c9",
                height: "100%",
                borderRadius: "20px",
                position: "relative",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <ShoppingBagIcon sx={{ color: "#004d40" }} />
                  <Typography variant="h6" ml={1}>
                    Total sales
                  </Typography>
                </Box>
                <Typography variant="h4" mb={1}>
                  {totalAmount.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  color={percentageChange > 0 ? "success.main" : "error.main"}
                  mb={1}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  {percentageChange > 0 ? (
                    <FaArrowTrendUp sx={{ color: "success.main" }} />
                  ) : (
                    <FaArrowTrendDown sx={{ color: "error.main" }} />
                  )}
                {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`}
                </Typography>

                <Box height="50px">
                  <LineChart width={100} height={40} data={trendData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#004d40"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              sx={{ bgcolor: "#f3e5f5", height: "100%", borderRadius: "20px" }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <PersonOutlineIcon sx={{ color: "#9c27b0" }} />
                  <Typography variant="h6" ml={1}>
                    New Order
                  </Typography>
                </Box>
                <Typography variant="h4" mb={1}>
                  1.35m
                </Typography>
                <Typography
                  variant="body2"
                  color={onchange > 0 ? "success.main" : "error.main"}
                  mb={1}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  {onchange > 0 ? (
                    <FaArrowTrendUp sx={{ color: "success.main" }} />
                  ) : (
                    <FaArrowTrendDown sx={{ color: "error.main" }} />
                  )}
                  {onchange > 0 ? `+${onchange}%` : `${onchange}%`}
                </Typography>
                <Box height="50px">
                  <LineChart width={100} height={40} data={trendData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#9c27b0"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card
              sx={{ bgcolor: "#fff8e1", height: "100%", borderRadius: "20px" }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <ShoppingCartIcon sx={{ color: "#ffa000" }} />
                  <Typography variant="h6" ml={1}>
                    Orders
                  </Typography>
                </Box>
                <Typography variant="h4" mb={1}>
                  {totalOrders.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  color={onchange > 0 ? "success.main" : "error.main"}
                  mb={1}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  {onchange > 0 ? (
                    <FaArrowTrendUp sx={{ color: "success.main" }} />
                  ) : (
                    <FaArrowTrendDown sx={{ color: "error.main" }} />
                  )}
                  {onchange > 0 ? `+${onchange}%` : `${onchange}%`}
                </Typography>
                <Box height="50px">
                  <LineChart width={100} height={40} data={orderTrendData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ffa000"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={3} ml={5}>
          <Typography variant="h4" gutterBottom>
            Total
          </Typography>
          <BarChart>
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </Box>
        <Box mt={3} ml={5}>
          <Typography variant="h4" gutterBottom>
            Total Sale
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="custom-tooltip">
                        <p>{`Month: ${payload[0].payload.month}`}</p>
                        <p>{`Team A: ${payload[0].payload.teamA}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="teamA" fill="#008080" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </>
    );
  };

  export default DashBoard;
