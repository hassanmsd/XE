"use client";

import { useState } from "react";

import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/material";

import Modal from "@/app/components/modal";

import StocksTable from "./StocksTable";
import AveragePrice from "./AveragePrice";
import TopRatedProducts from "./TopRatedProducts";
import CommonCategories from "./CommonCategories";
import {
  AttachMoney,
  GridView,
  Inventory,
  TrendingUp,
} from "@mui/icons-material";
import {
  CategoryData,
  SnackbarArgs,
  StocksData,
  TopRated,
} from "@/app/types/global";
import Snackbar from "@/app/components/Snackbar";

const DashboardInsights = () => {
  const [openModal, setOpenModal] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState<SnackbarArgs>({
    isOpen: false,
  });

  // Cached state for each API
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [topRated, setTopRated] = useState<TopRated[]>([]);
  const [stocksData, setStocksData] = useState<StocksData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  const handleOpen = async (modal: string) => {
    setOpenModal(modal);
    setLoading(true);

    try {
      if (modal === "avgPrice" && averagePrice === null) {
        const res = await axios.get("/api/average-price");
        setAveragePrice(res.data.averagePrice);
      }

      if (modal === "topRated" && topRated.length === 0) {
        const res = await axios.get("/api/top-rated");
        setTopRated(res.data.topRated);
      }

      if (modal === "stock" && stocksData.length === 0) {
        const res = await axios.get("/api/stock-levels");
        setStocksData(res.data.stockLevels);
      }

      if (modal === "categories" && categoryData.length === 0) {
        const res = await axios.get("/api/common-category");
        setCategoryData(res.data.categories);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setSnackbar({ isOpen: true, message: "Failed to fetch data" });
    }
    setLoading(false);
  };

  const handleClose = () => setOpenModal(null);

  const handleCloseSnackbar = () => {
    setSnackbar({ isOpen: false });
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        fontSize={{ xs: 30, sm: 45 }}
        sx={{
          fontWeight: 700,
          background:
            "linear-gradient(90deg, #00ff5e 0%, #2563eb 75%, #9333ea 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          mb: 2,
          mt: 1,
        }}
      >
        Product Insights Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3, ml: 1 }}>
        <Grid>
          <Button
            variant="contained"
            startIcon={<AttachMoney />}
            sx={{
              bgcolor: "#10b981",
              "&:hover": { bgcolor: "#059669" },
              textTransform: "uppercase",
              fontWeight: 600,
              px: { xs: 1.5, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              boxShadow: 3,
            }}
            onClick={() => handleOpen("avgPrice")}
          >
            Average Price
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            startIcon={<TrendingUp />}
            sx={{
              bgcolor: "#3b82f6",
              "&:hover": { bgcolor: "#2563eb" },
              textTransform: "uppercase",
              fontWeight: 600,
              px: { xs: 1.5, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              boxShadow: 3,
            }}
            onClick={() => handleOpen("topRated")}
          >
            Top Rated Items
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            startIcon={<Inventory />}
            sx={{
              bgcolor: "#f59e0b",
              "&:hover": { bgcolor: "#d97706" },
              textTransform: "uppercase",
              fontWeight: 600,
              px: { xs: 1.5, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              boxShadow: 3,
            }}
            onClick={() => handleOpen("stock")}
          >
            Stock Levels
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            startIcon={<GridView />}
            sx={{
              bgcolor: "#8b5cf6",
              "&:hover": { bgcolor: "#7c3aed" },
              textTransform: "uppercase",
              fontWeight: 600,
              px: { xs: 1.5, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              boxShadow: 3,
            }}
            onClick={() => handleOpen("categories")}
          >
            Categories
          </Button>
        </Grid>
      </Grid>

      {/* Average Price Modal */}
      <Modal
        open={openModal === "avgPrice"}
        onClose={handleClose}
        title="Average Price"
      >
        <AveragePrice price={averagePrice} />
      </Modal>

      {/* Top Rated Items Modal */}
      <Modal
        open={openModal === "topRated"}
        onClose={handleClose}
        title="Top Rated Products"
        maxWidth="lg"
      >
        <TopRatedProducts topRated={topRated} />
      </Modal>

      {/* Stock Levels Modal */}
      <Modal
        open={openModal === "stock"}
        onClose={handleClose}
        title="Stock Levels"
        maxWidth="lg"
      >
        <StocksTable stocksData={stocksData} loading={loading} />
      </Modal>

      {/* Common Categories Modal */}
      <Modal
        open={openModal === "categories"}
        onClose={handleClose}
        title="Categories"
        maxWidth="md"
      >
        <CommonCategories categoryData={categoryData} />
      </Modal>

      <Snackbar
        isOpen={snackbar.isOpen}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity="error"
      />
    </Box>
  );
};

export default DashboardInsights;
