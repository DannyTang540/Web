import React, { useState, MouseEvent } from "react";
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
  Typography,
  Box,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BuildIcon from "@mui/icons-material/Build";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircleProductStock from "../Box/CircleProductStock";
import { Product } from "../Redux/Selector.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import EditProduct from "../Product/EditProduct.tsx";
import { mockColors, mockSizes, mockMaterials, mockCategories } from "../Product/CreateProduct";
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const createData = (
  id: string,
  product: string,
  category: string,
  material: string,
  stock: number,
  createAt: string,
  imageUrl: string,
  gender: string
) => {
  return {
    id,
    product,
    category,
    material,
    stock,
    createAt,
    imageUrl,
    gender,
  };
};

const categories = ["All", "Accessories", "Shoes", "Apparel"];
const genders = ["All", "Unisex", "Male", "Female"];

const mockProductData = [
  {
    id: "1",
    name: "Product 1",
    title: "Stylish Leather Shoes",
    description: "A stylish pair of leather shoes.",
    category: { name: "Shoes" },
    material: { name: "Leather" },
    createat: "2023-01-01T00:00:00Z",
    image: { urlImage: "https://example.com/image1.jpg" },
    colors: ["Black", "Brown"],
    sizes: ["S", "M", "L"],
    gender: "Male",
    originPrice: 50,
    sellingPrice: 75,
  },
  {
    id: "2",
    name: "Product 2",
    title: "Comfortable Cotton T-Shirt",
    description: "Comfortable cotton t-shirt.",
    category: { name: "Apparel" },
    material: { name: "Cotton" },
    createat: "2023-02-01T00:00:00Z",
    image: { urlImage: "https://example.com/image2.jpg" },
    colors: ["White", "Blue"],
    sizes: ["M", "L", "XL"],
    gender: "Female",
    originPrice: 20,
    sellingPrice: 30,
  },
  {
    id: "3",
    name: "Product 3",
    title: "Trendy Plastic Sunglasses",
    description: "Trendy plastic sunglasses.",
    category: { name: "Accessories" },
    material: { name: "Plastic" },
    createat: "2023-03-01T00:00:00Z",
    image: { urlImage: "https://example.com/image3.jpg" },
    colors: ["Red", "Green"],
    sizes: [],
    gender: "Unisex",
    originPrice: 15,
    sellingPrice: 25,
  },
  {
    id: "4",
    name: "Product 4",
    title: "Durable Rubber Flip-Flops",
    description: "Durable rubber flip-flops.",
    category: { name: "Footwear" },
    material: { name: "Rubber" },
    createat: "2023-04-01T00:00:00Z",
    image: { urlImage: "https://example.com/image4.jpg" },
    colors: ["Yellow", "Blue"],
    sizes: ["S", "M"],
    gender: "Unisex",
    originPrice: 10,
    sellingPrice: 15,
  },
  {
    id: "5",
    name: "Product 5",
    title: "Elegant Silk Dress",
    description: "Elegant silk dress.",
    category: { name: "Clothing" },
    material: { name: "Silk" },
    createat: "2023-05-01T00:00:00Z",
    image: { urlImage: "https://example.com/image5.jpg" },
    colors: ["Pink", "Black"],
    sizes: ["M", "L"],
    gender: "Female",
    originPrice: 100,
    sellingPrice: 150,
  },
];

const TableProduct: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<null | string>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const productdata = mockProductData;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };
  const rows = productdata.map((el) =>
    createData(
      el.id || "1",
      el.name || "",
      el.category.name || "",
      el.material.name || "",
      10,
      el.createat.split("T")[0] || "",
      el.image.urlImage || "",
      el.gender || ""
    )
  );
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleRowClick = (id: string) => {
    const product = productdata.find((p) => p.id === id);
    setSelectedProduct(product);
    navigate(`/product/details/${id}`);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setSelectedGender(event.target.value);
  };

  const handleEditProduct = (id: string) => {
    const product = productdata.find((p) => p.id === id);
    setSelectedProduct(product);
    setIsEditOpen(true);
    handleMenuClose();
  };

  const handleSaveProduct = (updatedProduct: any) => {
    console.log("Updated product:", updatedProduct);
    setIsEditOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
  };

  const filteredRows = rows.filter(
    (row) =>
      (selectedCategory === "All" || row.category === selectedCategory) &&
      (selectedGender === "All" || row.gender === selectedGender)
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box m={4}>
      <Box display="flex" gap={2} mb={2}>
        <FormControl variant="standard" sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 200 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={selectedGender} onChange={handleGenderChange}>
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 5,
          borderRadius: 15,
          padding: 2,
          width: "100%",
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        <Table sx={{ minWidth: 1000 }} size="small" aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Material</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#fff", marginBottom: 2 }}>
            {(rowsPerPage > 0
              ? filteredRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredRows
            ).map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "48px",
                  "&:hover": {
                    backgroundColor: "#e0f7fa",
                    boxShadow: "0px 4px 20px",
                  },
                  backgroundColor: "#fff",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                }}
              >
                <TableCell align="left" sx={{ padding: "4px" }}>
                  <Avatar
                    src={row.imageUrl}
                    variant="square"
                    sx={{ width: 40, height: 40 }}
                  />
                </TableCell>
                <TableCell align="left" sx={{ padding: "4px" }}>
                  <Box
                    component="span"
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleRowClick(row.id)}
                  >
                    {row.product}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.category}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.material}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  <CircleProductStock value={row.stock} />
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.gender}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.createAt}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, row.id)}
                    aria-label="settings"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open && menuId === row.id}
                    onClose={handleMenuClose}
                    sx={{ boxShadow: "none", borderRadius: 2 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MenuItem onClick={() => handleEditProduct(row.id)}>
                      <BuildIcon sx={{ fontSize: "1rem", color: "#59fbd6" }} />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <DeleteForeverIcon
                        sx={{ fontSize: "1rem", color: "#f37474" }}
                      />
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {selectedProduct && (
        <EditProduct
          product={selectedProduct}
          open={isEditOpen}
          onSave={handleSaveProduct}
          onCancel={handleCancelEdit}
        />
      )}
    </Box>
  );
};

export default TableProduct;
