import React from "react";

import { Box } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { COLORS } from "@/app/constants/global";
import { TopRated } from "@/app/types/global";

interface TopRatedProductsProps {
  topRated: TopRated[];
}

const TopRatedProducts = ({ topRated }: TopRatedProductsProps) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          position: "relative",
          bgcolor: "grey.50",
          borderRadius: 2,
          p: 3,
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={topRated}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              {topRated.map((entry, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`colorGradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor={COLORS[index % COLORS.length]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor={COLORS[index % COLORS.length]}
                    stopOpacity={1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              stroke="#666"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              dataKey="title"
              type="category"
              width={180}
              tick={{ fill: "#333", fontSize: 12 }}
              stroke="#666"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              labelStyle={{ fontWeight: 600, color: "#333", marginBottom: 4 }}
              formatter={(value) => [`${value} ⭐`, "Rating"]}
              cursor={{ fill: "rgba(102, 126, 234, 0.1)" }}
            />
            <Bar dataKey="rating" barSize={28} radius={[0, 8, 8, 0]}>
              {topRated.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#colorGradient-${index})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default TopRatedProducts;
