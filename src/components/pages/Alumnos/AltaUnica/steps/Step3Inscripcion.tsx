import React from "react";
import {
  Box,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  Chip,
} from "@mui/material";
import { type Step3Props } from "./types";

export const Step3Inscripcion: React.FC<Step3Props> = ({
  insRutaFormacion,
  setInsRutaFormacion,
  insGeneracion,
  setInsGeneracion,
  insPeriodo,
  setInsPeriodo,
}) => {
  return (
    <>
      {/* TÍTULO Y DESCRIPCIÓN DE INSCRIPCIÓN */}
      <Box sx={{ maxWidth: "760px", mx: "auto", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
          Inscripción
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
          Selecciona el programa, generación y grupo en los que se inscribirá el alumno.
        </Typography>
      </Box>

      {/* TARJETA PRINCIPAL DE INSCRIPCIÓN */}
      <Box
        sx={{
          maxWidth: "760px",
          mx: "auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          p: { xs: 2.5, sm: 3.5 },
          mb: 6,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
        }}
      >
        <Stack spacing={2.5}>
          {/* Campo 1: Ruta de Formación * */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
              Ruta de Formación *
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={insRutaFormacion}
                onChange={(e) => setInsRutaFormacion(e.target.value)}
                sx={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  color: "#111827",
                }}
              >
                <MenuItem value="Seleccionar ruta...">Seleccionar ruta...</MenuItem>
                <MenuItem value="Licenciatura Coppel 2020">Licenciatura Coppel 2020</MenuItem>
                <MenuItem value="Bachillerato General 2022">Bachillerato General 2022</MenuItem>
                <MenuItem value="Diplomado en Administración">Diplomado en Administración</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Campo 2: Generación * */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
              Generación *
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={insGeneracion}
                onChange={(e) => setInsGeneracion(e.target.value)}
                sx={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  color: "#111827",
                }}
              >
                <MenuItem value="Seleccionar generación...">Seleccionar generación...</MenuItem>
                <MenuItem value="Generación 2024-A">Generación 2024-A</MenuItem>
                <MenuItem value="Generación 2024-B">Generación 2024-B</MenuItem>
                <MenuItem value="Generación 2025-A">Generación 2025-A</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Campo 3: Periodo de inscripción * */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
              Periodo de inscripción *
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={insPeriodo}
                onChange={(e) => setInsPeriodo(e.target.value)}
                sx={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  color: "#111827",
                }}
              >
                <MenuItem value="PERIODO-0001 · 1-30 Sep 2025">PERIODO-0001 · 1-30 Sep 2025</MenuItem>
                <MenuItem value="PERIODO-0002 · 1-31 Oct 2025">PERIODO-0002 · 1-31 Oct 2025</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* BANNER DE CONTEXTO DEL PERIODO ACTIVO (AMBAR/CREMA) */}
          <Box
            sx={{
              backgroundColor: "#FFFBEB",
              border: "1px solid #FED7AA",
              borderRadius: "12px",
              p: 2.2,
              mt: 1,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.8 }}>
              <Chip
                label="PERIODO-0001"
                size="small"
                sx={{
                  backgroundColor: "#FFF7ED",
                  border: "1px solid #FFEDD5",
                  color: "#D97706",
                  fontWeight: 800,
                  fontSize: "0.68rem",
                  borderRadius: "6px",
                  height: 22,
                }}
              />
              <Chip
                label="ACTIVA"
                size="small"
                sx={{
                  backgroundColor: "#F0FDF4",
                  border: "1px solid #DCFCE7",
                  color: "#16A34A",
                  fontWeight: 800,
                  fontSize: "0.68rem",
                  borderRadius: "6px",
                  height: 22,
                }}
              />
            </Stack>

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.92rem" }}>
              Periodo 1–30 Sep 2025
            </Typography>
            <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.78rem", mt: 0.2, display: "block" }}>
              Ventana de inscripción vigente para esta materia
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
