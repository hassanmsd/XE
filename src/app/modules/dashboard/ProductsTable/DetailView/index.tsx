import React from "react";

import { Box, Divider, Grid, Typography } from "@mui/material";

import { Product } from "@/app/types/global";

interface DetailViewProps {
  product: Product | null;
}

const DetailView = ({ product }: DetailViewProps) => {
  return (
    <Box sx={{ maxWidth: 750, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        {product?.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {product?.category}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
        {product?.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Brand
          </Typography>
          <Typography variant="body1">{product?.brand || "N/A"}</Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Warranty
          </Typography>
          <Typography variant="body1">
            {product?.warrantyInformation || "N/A"}
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Reviews
          </Typography>
          <Typography variant="body1">
            {product?.reviews?.length || 0}
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Stocks
          </Typography>
          <Typography variant="body1">{product?.stock || "N/A"}</Typography>
        </Grid>
      </Grid>

      {/* Images */}
      {product?.images && product.images.length > 0 && (
        <>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            {product.images.map((img, index) => (
              <Grid size={{ xs: 5, sm: 2 }} key={index}>
                <Box
                  component="img"
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default DetailView;
