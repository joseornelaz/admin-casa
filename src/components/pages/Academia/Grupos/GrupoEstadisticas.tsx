import React from "react";
import { Box, Typography, Grid, LinearProgress } from "@mui/material";

export interface MetricData {
  alumnosActivos?: number | string;
  promedio?: number | string;
  avanceGrupal?: number | string;
  completados?: number | string;
  distribucion?: {
    alto: number;
    medio: number;
    bajo: number;
  };
}

interface GrupoEstadisticasProps {
  data?: MetricData;
}

const defaultStats: MetricData = {
  alumnosActivos: 64,
  promedio: 8.6,
  avanceGrupal: "72%",
  completados: 14,
  distribucion: {
    alto: 22,
    medio: 32,
    bajo: 10,
  },
};

export const GrupoEstadisticas: React.FC<GrupoEstadisticasProps> = ({ data = defaultStats }) => {
  const stats = { ...defaultStats, ...data };
  const totalAlumnos =
    (stats.distribucion?.alto ?? 22) +
    (stats.distribucion?.medio ?? 32) +
    (stats.distribucion?.bajo ?? 10);

  const getPercentage = (value: number) => {
    if (!totalAlumnos) return 0;
    return Math.round((value / totalAlumnos) * 100);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 0.5, backgroundColor: "#FFFFFF"}}>
      {/* Grilla 2x2 de Tarjetas de Métricas */}
      <Grid container spacing={2}>
        {/* Tarjeta 1: Alumnos Activos */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              backgroundColor: "#F9F9F8",
              borderRadius: "14px",
              p: 2.2,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#71717A",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              ALUMNOS ACTIVOS
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#111827",
                fontSize: "1.9rem",
              }}
            >
              {stats.alumnosActivos}
            </Typography>
          </Box>
        </Grid>

        {/* Tarjeta 2: Promedio */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              backgroundColor: "#F9F9F8",
              borderRadius: "14px",
              p: 2.2,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#71717A",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              PROMEDIO
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#2563EB",
                fontSize: "1.9rem",
              }}
            >
              {stats.promedio}
            </Typography>
          </Box>
        </Grid>

        {/* Tarjeta 3: Avance Grupal */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              backgroundColor: "#F9F9F8",
              borderRadius: "14px",
              p: 2.2,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#71717A",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              AVANCE GRUPAL
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#111827",
                fontSize: "1.9rem",
              }}
            >
              {stats.avanceGrupal}
            </Typography>
          </Box>
        </Grid>

        {/* Tarjeta 4: Completados */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              backgroundColor: "#F9F9F8",
              borderRadius: "14px",
              p: 2.2,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#71717A",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              COMPLETADOS
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#16A34A",
                fontSize: "1.9rem",
              }}
            >
              {stats.completados}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Sección Distribución por Avance */}
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: "#4B5563",
            fontSize: "0.95rem",
            mb: 2,
          }}
        >
          Distribución por avance
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Fila 1: Alto (>80%) */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ width: "120px", color: "#6B7280", fontSize: "0.85rem" }}>
              Alto (&gt;80%)
            </Typography>
            <Box sx={{ flex: 1, mx: 2 }}>
              <LinearProgress
                variant="determinate"
                value={getPercentage(stats.distribucion?.alto ?? 22)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#E5E7EB",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    backgroundColor: "#16A34A",
                  },
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ width: "24px", textAlign: "right", color: "#6B7280", fontSize: "0.88rem", fontWeight: 500 }}
            >
              {stats.distribucion?.alto ?? 22}
            </Typography>
          </Box>

          {/* Fila 2: Medio (50–80%) */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ width: "120px", color: "#6B7280", fontSize: "0.85rem" }}>
              Medio (50–80%)
            </Typography>
            <Box sx={{ flex: 1, mx: 2 }}>
              <LinearProgress
                variant="determinate"
                value={getPercentage(stats.distribucion?.medio ?? 32)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#E5E7EB",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    backgroundColor: "#2563EB",
                  },
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ width: "24px", textAlign: "right", color: "#6B7280", fontSize: "0.88rem", fontWeight: 500 }}
            >
              {stats.distribucion?.medio ?? 32}
            </Typography>
          </Box>

          {/* Fila 3: Bajo (<50%) */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ width: "120px", color: "#6B7280", fontSize: "0.85rem" }}>
              Bajo (&lt;50%)
            </Typography>
            <Box sx={{ flex: 1, mx: 2 }}>
              <LinearProgress
                variant="determinate"
                value={getPercentage(stats.distribucion?.bajo ?? 10)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#E5E7EB",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    backgroundColor: "#C2410C",
                  },
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ width: "24px", textAlign: "right", color: "#6B7280", fontSize: "0.88rem", fontWeight: 500 }}
            >
              {stats.distribucion?.bajo ?? 10}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};