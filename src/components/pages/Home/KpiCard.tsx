import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface KpiCardProps {
  icon: React.ReactNode;
  iconBg: string;
  category: string;
  value: string | number;
  subtext: string;
  subtextType?: "success" | "warning" | "default";
  showMiniChart?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  icon,
  iconBg,
  category,
  value,
  subtext,
  subtextType = "default",
  showMiniChart,
}) => {
  const getSubtextColor = () => {
    if (subtextType === "success") return "#10B981";
    if (subtextType === "warning") return "#F59E0B";
    return "#6B7280";
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "8px",
            backgroundColor: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: "#4B5563",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            fontSize: "0.68rem",
            display: "block",
            mb: 0.5,
          }}
        >
          {category}
        </Typography>

        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: "#111827", mb: 0.5, fontSize: "1.85rem" }}
        >
          {value}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          {subtextType === "success" && (
            <TrendingUpIcon sx={{ fontSize: 16, color: "#10B981" }} />
          )}
          {subtextType === "warning" && (
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#F59E0B",
                display: "inline-block",
                mr: 0.5,
              }}
            />
          )}
          <Typography
            variant="body2"
            sx={{
              color: getSubtextColor(),
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            {subtext}
          </Typography>
        </Stack>

        {showMiniChart && (
          <Stack direction="row" spacing={0.5} alignItems="flex-end" sx={{ mt: 2, height: 16 }}>
            <Box sx={{ flex: 1, height: "30%", bgcolor: "#DBEAFE", borderRadius: "2px" }} />
            <Box sx={{ flex: 1, height: "45%", bgcolor: "#DBEAFE", borderRadius: "2px" }} />
            <Box sx={{ flex: 1, height: "60%", bgcolor: "#DBEAFE", borderRadius: "2px" }} />
            <Box sx={{ flex: 1, height: "50%", bgcolor: "#DBEAFE", borderRadius: "2px" }} />
            <Box sx={{ flex: 1, height: "80%", bgcolor: "#DBEAFE", borderRadius: "2px" }} />
            <Box sx={{ flex: 1, height: "100%", bgcolor: "#2563EB", borderRadius: "2px" }} />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};