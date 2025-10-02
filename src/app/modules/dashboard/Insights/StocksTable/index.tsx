"use client";

import * as React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

import DataGrid from "@/app/components/Grid";
import { StocksData } from "@/app/types/global";

interface StocksTableProps {
  stocksData: StocksData[];
  loading: boolean;
}

const StocksTable = ({ stocksData, loading }: StocksTableProps) => {
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Item",
      width: 300,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value;
        let color = "green";

        if (value! < 20) color = "red";
        else if (value! < 50) color = "orange";

        return (
          <Typography sx={{ color, fontWeight: "bold", marginTop: "12px" }}>
            {value}
          </Typography>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={stocksData.map((item, index) => ({ id: index, ...item }))}
      columns={columns}
      loading={loading}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
      disableRowSelectionOnClick
      pagination
    />
  );
};

export default StocksTable;
