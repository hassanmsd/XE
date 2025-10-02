import React from "react";
import { Box } from "@mui/material";

import DashboardInsights from "./Insights";
import ProductsTable from "./ProductsTable";

const Dashboard = () => {
  return (
    <Box>
      <Box
        height={"100vh"}
        width={"100vw"}
        display={"flex"}
        overflow={"hidden"}
      >
        <Box
          display="flex"
          flexGrow={1}
          overflow="hidden"
          flexDirection="column"
        >
          <DashboardInsights />
          <ProductsTable />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
