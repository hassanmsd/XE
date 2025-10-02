"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, Paper, IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Modal from "@/app/components/modal";
import { Product, SnackbarArgs } from "@/app/types/global";
import Snackbar from "@/app/components/Snackbar";

import DetailView from "./DetailView";

import styles from "./styles.module.scss";

const ProductsTable = () => {
  const [rows, setRows] = useState<Product[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [snackbar, setSnackbar] = useState<SnackbarArgs>({
    isOpen: false,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProducts = async () => {
    const offset = paginationModel.page * paginationModel.pageSize;
    const limit = paginationModel.pageSize;

    if (rows.length >= offset + limit) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get("/api/products", {
        params: { offset, limit },
      });

      const data = await res.data;
      const products: Product[] = data.products;

      setRows((prevRows) => {
        const existingIds = new Set(prevRows.map((r) => r.id));

        const newRows = products.filter((p) => !existingIds.has(p.id)); // skip duplicates

        return [...prevRows, ...newRows];
      });

      setRowCount(data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbar({ isOpen: true, message: "Failed to fetch data" });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [paginationModel]);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
      maxWidth: 50,
    },
    {
      field: "title",
      headerAlign: "center",
      headerName: "Title",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "category",
      headerAlign: "center",
      headerName: "Category",
      align: "center",

      flex: 1,
    },
    {
      field: "price",
      headerAlign: "center",
      headerName: "Price",
      align: "center",
      type: "number",
      flex: 1,
    },
    {
      field: "rating",
      headerAlign: "center",
      headerName: "Rating",
      align: "center",
      type: "number",
      flex: 1,
    },
    {
      field: "availabilityStatus",
      headerAlign: "center",
      headerName: "Availability",
      align: "center",
      type: "number",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value;
        let color = "#22c55e";
        if (value === "Low Stock") color = "#f59e0b";
        return (
          <Typography sx={{ color, fontWeight: "bold", marginTop: "12px" }}>
            {value}
          </Typography>
        );
      },
    },
    {
      field: "thumbnail",
      headerName: "Image",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            href={params.row.thumbnail || params.row.images?.[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={params.row.thumbnail || params.row.images?.[0]}
              alt={params.row.title}
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          </a>
        </Box>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      flex: 0.5,
      sortable: false,
      filterable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams<Product>) => (
        <IconButton onClick={() => handleOpenModal(params.row)}>
          <VisibilityIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      ),
    },
  ];

  const paginatedRows = rows?.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  const handleCloseSnackbar = () => {
    setSnackbar({ isOpen: false });
  };

  return (
    <Paper
      sx={{
        flexGrow: 1,
        overflow: "hidden",
        margin: 2,
        marginTop: 0,
        borderRadius: 3,
      }}
      elevation={2}
    >
      <DataGrid
        rows={paginatedRows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        pageSizeOptions={[5, 10, 15, 20, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        className={styles.DocumentGrid}
        sortingOrder={["asc", "desc"]}
        disableRowSelectionOnClick
      />

      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          title="Detail"
          maxWidth="md"
        >
          <DetailView product={selectedProduct} />
        </Modal>
      )}
      <Snackbar
        isOpen={snackbar.isOpen}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity="error"
      />
    </Paper>
  );
};

export default ProductsTable;
