import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const AttentionAlert: React.FC = () => (
  <Box
    sx={{
      backgroundColor: "#FFFBEB",
      border: "1px solid #FDE68A",
      borderRadius: "10px",
      px: 2.5,
      py: 1.2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <WarningAmberOutlinedIcon sx={{ color: "#D97706", fontSize: 20 }} />
      <Typography variant="body2" sx={{ fontWeight: 700, color: "#92400E" }}>
        Necesita atención
      </Typography>
      <Chip
        label="4"
        size="small"
        sx={{
          backgroundColor: "#FEF3C7",
          color: "#92400E",
          fontWeight: 700,
          height: 20,
          fontSize: "0.75rem",
        }}
      />
    </Stack>

    <Button
      endIcon={<ChevronRightIcon fontSize="small" />}
      sx={{
        color: "#B45309",
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.85rem",
        p: 0,
        "&:hover": { backgroundColor: "transparent" },
      }}
    >
      Revisar
    </Button>
  </Box>
);