import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Rating,
} from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Dữ liệu mẫu cho sản phẩm, bạn có thể thay thế bằng API call thực tế
  const product = {
    id,
    name: "Classic Leather Loafers",
    description:
      "Thiết kế lấy cảm hứng từ tàu cao tốc Nhật Bản và Nike Air Max 97.",
    price: "600VND",
    size: 9,
    available: 72,
    imageUrl: "https://via.placeholder.com/400",
  };

  return (
    <Box m={2} padding={15}>
      <Grid container spacing={2}>
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
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Price: {product.price}
              </Typography>
              <Divider />
              <Typography variant="body1" paragraph mt={2}>
                {product.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Size: {product.size}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Available: {product.available}
              </Typography>
              <Box display="flex" mt={2}>
                <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                  Add to Cart
                </Button>
                <Button variant="contained" color="secondary">
                  Buy Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
