import {
  Breadcrumbs,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import InventoryAPi from "../Components/Redux/InventorySlice";

const Inventory: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" marginTop={2}>
        Inventory
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <RouterLink color="inherit" to="/dashboard">
          DashBoard
        </RouterLink>
        <Typography color="text.primary">Inventory List</Typography>
      </Breadcrumbs>
      <Grid sx={{ margin: 6 }}>
        <TableContainer
          sx={{
            boxShadow: 2,
            borderRadius: 10,
            padding: 2,
            maxHeight: "60vh",
            width: "100%",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Img</TableCell>
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
            ></TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Inventory;
