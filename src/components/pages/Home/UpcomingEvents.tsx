import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const UpcomingEvents: React.FC = () => {
  const days = [
    { day: "LUN 30", event: null },
    { day: "MAR 1", event: "Inicia carga de asesores", color: "#10B981", bg: "#ECFDF5" },
    { day: "MIÉ 2", event: "Cierre MAT-301", color: "#B45309", bg: "#FFFFFF", isToday: true },
    { day: "JUE 3", event: "Junta Consejo Académico", color: "#2563EB", bg: "#EFF6FF" },
    { day: "VIE 4", event: "Vence VIGENCIA-0002", color: "#C2410C", bg: "#FFF7ED" },
    { day: "SÁB 5", event: null },
    { day: "DOM 6", event: null },
  ];

  return (
    <Card elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: "12px", width: "100%" }}>
      <Box sx={{ p: 2, pb: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
          Próximos eventos
        </Typography>
        <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500 }}>
          Semana del 30 jun - 6 jul
        </Typography>
      </Box>

      {/* Grid exacto de 7 columnas responsivas */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(7, 1fr)" },
          borderTop: "1px solid #F3F4F6",
        }}
      >
        {days.map((item, index) => (
          <Box
            key={index}
            sx={{
              p: 1.5,
              minHeight: 85,
              backgroundColor: item.isToday ? "#EEF2FF" : "transparent",
              borderRight: index < 6 ? { sm: "1px solid #F3F4F6" } : "none",
              borderBottom: { xs: "1px solid #F3F4F6", sm: "none" },
            }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: item.isToday ? 800 : 700,
                  color: item.isToday ? "#1D4ED8" : "#6B7280",
                  fontSize: "0.7rem",
                }}
              >
                {item.day}
              </Typography>
              {item.isToday && (
                <Chip
                  label="HOY"
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: "0.6rem",
                    fontWeight: 800,
                    bgcolor: "#2563EB",
                    color: "#FFFFFF",
                    px: 0.2,
                  }}
                />
              )}
            </Stack>

            {item.event ? (
              <Box
                sx={{
                  p: 0.8,
                  borderRadius: "6px",
                  backgroundColor: item.bg,
                  borderLeft: `3px solid ${item.color}`,
                  boxShadow: item.isToday ? "0px 1px 2px rgba(0,0,0,0.05)" : "none",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: item.color,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.2,
                  }}
                >
                  {item.event}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="caption"
                sx={{ color: "#D1D5DB", textAlign: "center", display: "block", mt: 1.5 }}
              >
                —
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Card>
  );
};