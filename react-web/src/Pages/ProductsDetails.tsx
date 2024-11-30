import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Container,
  Breadcrumbs,
  Tabs,
  Tab,
  IconButton,
  TextField,
  Rating,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Product {
  id: string;
  name: string;
  subDescription: string;
  description: string;
  price: string;
  size: number;
  available: number;
  imageUrl: string;
  totalRatings: number;
  reviews: { reviewer: string; date: string; rating: number; verified: boolean; text: string }[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Sample data for the product (replace with API data later)
  const product: Product = {
    id: id || "1",
    name: "Classic Leather Loafers",
    subDescription: "Inspired by Japanese bullet trains and Nike Air Max 97.",
    description: "These loafers are designed with both style and comfort in mind. Featuring premium leather construction, they are perfect for both casual and formal wear.",
    price: "600,000 VND",
    size: 9,
    available: 72,
    imageUrl: "https://via.placeholder.com/400",
    totalRatings: 120,
    reviews: [
      {
        reviewer: "Jayvion Simon",
        date: "30 Nov 4:00 PM 2024",
        rating: 4,
        verified: true,
        text: "The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.",
      },
      {
        reviewer: "Lucian Obrien",
        date: "29 Nov 2024",
        rating: 4,
        verified: true,
        text: "She eagerly opened the gift, her eyes sparkling with excitement.",
      },
    ],
  };

  // State management for size, rating, quantity, and tabs
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [rating, setRating] = useState<number | null>(2);
  const [tabIndex, setTabIndex] = useState(0);

  // Handle size change
  const handleChangeSize = (event: SelectChangeEvent) => {
    setSize(event.target.value);
  };

  // Handle quantity increase/decrease
  const handleIncreaseQuantity = () => {
    if (quantity < product.available) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="start" mt={2}>
        <Typography variant="h3" sx={{ fontWeight: 500 }}>
          Product Detail
        </Typography>
      </Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
        <Link underline="hover" color="inherit" to="/product">
          Product
        </Link>
        <Typography color="text.primary">Details</Typography>
      </Breadcrumbs>
      <Box m={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={product.imageUrl}
                alt={product.name}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="start">
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {product.subDescription}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Rating name="read-only" value={4} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {product.totalRatings} reviews
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <FormControl variant="outlined" sx={{ mt: 2, minWidth: 120 }}>
                  <InputLabel id="size-select-label">Size</InputLabel>
                  <Select
                    labelId="size-select-label"
                    id="size-select"
                    value={size}
                    onChange={handleChangeSize}
                    label="Size"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Small">S</MenuItem>
                    <MenuItem value="Medium">M</MenuItem>
                    <MenuItem value="Large">L</MenuItem>
                    <MenuItem value="Extra Large">XL</MenuItem>
                  </Select>
                </FormControl>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <IconButton
                    onClick={handleDecreaseQuantity}
                    aria-label="decrease quantity"
                    disabled={quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    type="number"
                    variant="outlined"
                    sx={{ mx: 1, width: "70px" }}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    inputProps={{ min: 1, max: product.available }}
                  />
                  <IconButton
                    onClick={handleIncreaseQuantity}
                    aria-label="increase quantity"
                    disabled={quantity >= product.available}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" mt={2}>
                  Available: {product.available} items
                </Typography>
                <Box display="flex" mt={3} gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      alert(`Added ${quantity} item(s) to your cart!`)
                    }
                    disabled
                  >
                    Add to Cart
                  </Button>
                  <Button variant="contained" color="secondary" disabled>
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="description and reviews tabs"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Description" />
            <Tab label="Reviews" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {tabIndex === 0 && (
              <Typography variant="body2" gutterBottom>
                {product.description}
              </Typography>
            )}
            {tabIndex === 1 && (
              <Box>
                {product.reviews.map((review, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="body2" fontWeight="bold">
                      {review.reviewer}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {review.date} - {review.verified && "Verified Purchase"}
                    </Typography>
                    <Rating name={`rating-${index}`} value={review.rating} readOnly />
                    <Typography variant="body2">
                      {review.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;
