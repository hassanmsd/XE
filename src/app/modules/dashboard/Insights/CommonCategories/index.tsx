import React from "react";
import { Box, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { COLORS } from "@/app/constants/global";
import { CategoryData } from "@/app/types/global";

interface CommonCategoriesProps {
  categoryData: CategoryData[];
}

const CommonCategories = ({ categoryData }: CommonCategoriesProps) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Pie Chart */}
        <Box
          sx={{
            flex: "1 1 300px",
            position: "relative",
            minWidth: 300,
          }}
        >
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              {categoryData.map((entry, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`pieGradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={COLORS[index % COLORS.length]}
                    stopOpacity={0.9}
                  />
                  <stop
                    offset="100%"
                    stopColor={COLORS[index % COLORS.length]}
                    stopOpacity={1}
                  />
                </linearGradient>
              ))}
              <Pie
                data={categoryData as any}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={2}
                label={({ percent }: any) => `${(percent * 100).toFixed(0)}%`}
                labelLine={{
                  stroke: "#999",
                  strokeWidth: 1,
                }}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#pieGradient-${index})`}
                    stroke="#fff"
                    strokeWidth={3}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  padding: "12px",
                }}
                formatter={(value, name) => [`${value} products`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Custom Legend with Stats */}
        <Box
          sx={{
            flex: "1 1 200px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {categoryData.map((entry, index) => {
            const total = categoryData.reduce((sum, cat) => sum + cat.value, 0);
            const percentage = ((entry.value / total) * 100).toFixed(1);

            return (
              <Box
                key={`legend-${index}`}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "grey.50",
                  border: "1px solid",
                  borderColor: "grey.200",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateX(4px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderColor: COLORS[index % COLORS.length],
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "4px",
                      background: `linear-gradient(135deg, ${
                        COLORS[index % COLORS.length]
                      }dd, ${COLORS[index % COLORS.length]})`,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      textTransform: "capitalize",
                      flex: 1,
                    }}
                  >
                    {entry.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: COLORS[index % COLORS.length],
                    }}
                  >
                    {entry.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                    }}
                  >
                    {percentage}%
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default CommonCategories;
