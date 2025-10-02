import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface AveragePriceProps {
  price: number | null;
}

const AveragePrice = ({ price }: AveragePriceProps) => {
  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated gradient background */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            left: -50,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { transform: "scale(1)", opacity: 0.5 },
              "50%": { transform: "scale(1.1)", opacity: 0.3 },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            right: -50,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite 1.5s",
          }}
        />

        {/* Icon */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: "16px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)",
            mb: 3,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography sx={{ fontSize: 32 }}>💰</Typography>
        </Box>

        {/* Price Display */}
        {price ? (
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
                animation: "fadeInScale 0.5s ease-out",
                "@keyframes fadeInScale": {
                  "0%": { transform: "scale(0.8)", opacity: 0 },
                  "100%": { transform: "scale(1)", opacity: 1 },
                },
              }}
            >
              ${price}
            </Typography>

            {/* Decorative underline */}
            <Box
              sx={{
                width: 60,
                height: 4,
                background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 2,
                margin: "0 auto",
                mb: 2,
              }}
            />

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "#10b981",
                  borderRadius: "50%",
                  animation: "blink 2s ease-in-out infinite",
                  "@keyframes blink": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.3 },
                  },
                }}
              />
              Current average price
            </Typography>

            {/* Progress indicator showing price in range */}
            <Box sx={{ mt: 3, px: 2 }}>
              <Box
                sx={{
                  height: 8,
                  bgcolor: "grey.200",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${Math.min((price / 500) * 100, 100)}%`, // Adjust max value as needed
                    background:
                      "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: 4,
                    transition: "width 1s ease-out",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  $0
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  $500
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              position: "relative",
              zIndex: 1,
            }}
          >
            <CircularProgress
              size={48}
              sx={{
                color: "#667eea",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
            <Typography variant="body1" color="text.secondary">
              Loading...
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AveragePrice;
