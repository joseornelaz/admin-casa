import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button";

import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

export const AccesoRapidoCard: React.FC = () => {
    return(
        <Card elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: "12px", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
                Acceso rápido
              </Typography>
              <Button
                startIcon={<TuneIcon sx={{ fontSize: 14 }} />}
                sx={{
                  color: "#2563EB",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  p: 0,
                }}
              >
                Personalizar
              </Button>
            </Box>

            <Stack spacing={1}>
              <Button
                variant="outlined"
                startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  color: "#374151",
                  borderColor: "#E5E7EB",
                  borderRadius: "20px",
                  py: 0.8,
                  fontSize: "0.8rem",
                  backgroundColor: "#F9FAFB",
                  "&:hover": { backgroundColor: "#F3F4F6", borderColor: "#D1D5DB" },
                }}
              >
                Nueva Alta Única
              </Button>
              <Button
                variant="outlined"
                startIcon={<SearchIcon sx={{ fontSize: 16 }} />}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  color: "#374151",
                  borderColor: "#E5E7EB",
                  borderRadius: "20px",
                  py: 0.8,
                  fontSize: "0.8rem",
                  backgroundColor: "#F9FAFB",
                  "&:hover": { backgroundColor: "#F3F4F6", borderColor: "#D1D5DB" },
                }}
              >
                Consulta de alumnos
              </Button>
              <Button
                variant="outlined"
                startIcon={<AssessmentOutlinedIcon sx={{ fontSize: 16 }} />}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  color: "#374151",
                  borderColor: "#E5E7EB",
                  borderRadius: "20px",
                  py: 0.8,
                  fontSize: "0.8rem",
                  backgroundColor: "#F9FAFB",
                  "&:hover": { backgroundColor: "#F3F4F6", borderColor: "#D1D5DB" },
                }}
              >
                Generar reporte
              </Button>
            </Stack>
          </Card>
    )
}