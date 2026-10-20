import React from "react";
import { Box, Typography } from "@mui/material";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

interface ImportExcelBannerProps {
  onClick?: () => void;
}

export const ImportExcelBanner: React.FC<ImportExcelBannerProps> = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.25,
        py: 1.4,
        px: 2,
        mb: 2.5,
        borderRadius: "10px",
        border: "1.5px dashed #86EFAC",
        backgroundColor: "#FAFDFB",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "#F0FDF4",
          borderColor: "#22C55E",
          boxShadow: "0 2px 6px rgba(34, 197, 94, 0.08)",
        },
        "&:focus-visible": {
          outline: "2px solid #22C55E",
          outlineOffset: "2px",
        },
      }}
    >
      <CachedOutlinedIcon sx={{ fontSize: 20, color: "#16A34A" }} />
      <Typography
        sx={{
          color: "#16A34A",
          fontWeight: 600,
          fontSize: "0.9rem",
          letterSpacing: "0.2px",
        }}
      >
        Importar desde Excel
      </Typography>
    </Box>
  );
};
