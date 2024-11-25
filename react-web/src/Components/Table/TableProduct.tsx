import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import CardProduct from "../Card/CardProduct";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleProductStock from "../Box/CircleProductStock";
import BuildIcon from "@mui/icons-material/Build";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function createData(id, product, material, Price, Stock, CreateAt) {
  return { id, product, material, Price, Stock, CreateAt };
}

const rows = [
  createData("1", "Frozen yoghurt", "Vai", 60000, 24, "2024/20/12"),
  createData("2", "Ice cream sandwich", "Cotton", 45000, 15, "2024/20/12"),
  createData("3", "Eclair", "Silk", 70000, 18, "2024/20/12"),
  createData("4", "Cupcake", "Leather", 80000, 20, "2024/20/12"),
];

const TableProduct = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="right">Material</TableCell>
            <TableCell align="right">Price Sell&nbsp;(vnđ)</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Create At</TableCell>
            <TableCell align="right">Setting</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              component={Link}
              to={`/product/detail/${row.id}`}
              style={{ textDecoration: "none" }}
            >
              <TableCell align="right">
                <CardProduct />
              </TableCell>
              <TableCell align="right">{row.material}</TableCell>
              <TableCell align="center">{row.Price}</TableCell>
              <TableCell align="right">
                <CircleProductStock value={row.Stock} />
              </TableCell>
              <TableCell align="right">{row.CreateAt}</TableCell>
              <TableCell align="right">
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  sx={{ boxShadow: "none", borderRadius: 20 }}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <BuildIcon sx={{ fontSize: "1rem", color: "#59fbd6" }} />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <DeleteForeverIcon
                      sx={{ fontSize: "1rem", color: "#f37474" }}
                    />{" "}
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProduct;
