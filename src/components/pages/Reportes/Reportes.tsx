import React, { useState } from "react";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

// Iconos MUI
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

// Gráfica de Donut
import { PieChart } from "@mui/x-charts/PieChart";

import { TitleHeader } from "../../molecules/TitleHeader/TitleHeader";
import { BoxContainer } from "../../atoms/BoxContainer/BoxContainer";

export const Reportes: React.FC = () => {
  const isLoading = false;

  // Estados para los filtros de Avance por Grupo
  const [materia, setMateria] = useState("todas");
  const [convocatoria, setConvocatoria] = useState("todas");
  const [vigencia, setVigencia] = useState("todas");

  if (isLoading) {
    return <LoadingCircular />;
  }

  // Datos para la gráfica de dona (Resumen)
  const donutData = [
    { id: 0, value: 1091, label: "Activos", color: "#16A34A" },
    { id: 1, value: 112, label: "Egresados", color: "#2563EB" },
    { id: 2, value: 44, label: "Baja", color: "#DC2626" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TitleHeader
          text="Reportes"
          subTitle="Explora los reportes disponibles en el sitio, generados a partir de los datos operativos de cada módulo."
        />
      </Box>

      <BoxContainer sxProps={{ p: 0, backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
        <Stack spacing={3}>
          {/* ========================================================= */}
          {/* SECCIÓN 1: REPORTE DE INSCRIPCIÓN                         */}
          {/* ========================================================= */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              overflow: "hidden",
            }}
          >
            {/* Header del Reporte */}
            <Box
              sx={{
                p: 2,
                px: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F9FAFB",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    backgroundColor: "#F3F4F6",
                    p: 0.8,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PersonOutlineIcon sx={{ color: "#4B5563", fontSize: 20 }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
                  Reporte de Inscripción
                </Typography>
              </Stack>

              <Button
                variant="contained"
                size="small"
                startIcon={<FileDownloadOutlinedIcon />}
                sx={{
                  backgroundColor: "#111827",
                  color: "#FFFFFF",
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  px: 2,
                  py: 0.8,
                  "&:hover": { backgroundColor: "#1F2937" },
                }}
              >
                Descargar Reporte
              </Button>
            </Box>

            {/* Métricas Principales (4 columnas fijas alineadas) */}
            <Box sx={{ p: 3, px: 3.5 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  alignItems: { xs: "flex-start", lg: "center" },
                  justifyContent: "space-between",
                  gap: { xs: 3, lg: 2 },
                }}
              >
                {/* 1. Total Inscritos */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.5px" }}>
                    TOTAL INSCRITOS
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                      1,247
                    </Typography>
                    <SignalCellularAltIcon sx={{ color: "#16A34A", fontSize: 22 }} />
                  </Stack>
                  <Typography variant="caption" sx={{ color: "#16A34A", fontWeight: 700, display: "block", mt: 0.5 }}>
                    +48 este periodo
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", lg: "block" }, my: 0.5, borderColor: "#F3F4F6" }} />

                {/* 2. Periodo del Reporte */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.5px" }}>
                    PERIODO DEL REPORTE
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827", mt: 0.5, lineHeight: 1.2 }}>
                    Cuatrimestre 2024-B
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9CA3AF", mt: 0.5, display: "block" }}>
                    sep–dic 2024
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", lg: "block" }, my: 0.5, borderColor: "#F3F4F6" }} />

                {/* 3. Última Actualización */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.5px" }}>
                    ÚLTIMA ACTUALIZACIÓN
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827", mt: 0.5, lineHeight: 1.2 }}>
                    Hoy, 6 jul 2026
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9CA3AF", mt: 0.5, display: "block" }}>
                    07:00 AM · automático
                  </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", lg: "block" }, my: 0.5, borderColor: "#F3F4F6" }} />

                {/* 4. Resumen / Gráfica Donut */}
                <Box sx={{ flex: 1.3, minWidth: 0 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.5px", display: "block", mb: 0.5 }}>
                    RESUMEN
                  </Typography>

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {/* Contenedor de Gráfica sin leyenda nativa */}
                    <Box sx={{ width: 68, height: 68, flexShrink: 0 }}>
                      <PieChart
                        series={[
                            {
                            data: donutData,
                            innerRadius: 22,
                            outerRadius: 32,
                            paddingAngle: 2,
                            cornerRadius: 2,
                            },
                        ]}
                        width={68}
                        height={68}
                        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        /* --- AÑADIR ESTAS LÍNEAS PARA OCULTAR LA LEYENDA DEL SVG --- */
                        hideLegend={true}
                        slotProps={{
                            legend: {
                            //hidden: true,
                            },
                        }}
                        />
                    </Box>

                    {/* Leyenda ordenada */}
                    <Stack spacing={0.3} sx={{ minWidth: 140 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                          <Box sx={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#16A34A" }} />
                          <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.75rem" }}>
                            Activos
                          </Typography>
                        </Stack>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.75rem" }}>
                          1,091 <Box component="span" sx={{ color: "#9CA3AF", fontWeight: 400, ml: 0.5 }}>87%</Box>
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                          <Box sx={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#2563EB" }} />
                          <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.75rem" }}>
                            Egresados
                          </Typography>
                        </Stack>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.75rem" }}>
                          112 <Box component="span" sx={{ color: "#9CA3AF", fontWeight: 400, ml: 0.5 }}>9%</Box>
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                          <Box sx={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#DC2626" }} />
                          <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.75rem" }}>
                            Baja
                          </Typography>
                        </Stack>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.75rem" }}>
                          44 <Box component="span" sx={{ color: "#9CA3AF", fontWeight: 400, ml: 0.5 }}>4%</Box>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Box>

            {/* Banner Informativo Inferior */}
            <Box sx={{ p: 2.5, pt: 0 }}>
              <Alert
                icon={<InfoOutlinedIcon sx={{ color: "#2563EB", fontSize: 18 }} />}
                sx={{
                  backgroundColor: "#F4F8FF",
                  color: "#2563EB",
                  borderRadius: "10px",
                  border: "1px solid #DBEAFE",
                  py: 0.3,
                  fontSize: "0.825rem",
                  "& .MuiAlert-icon": { alignItems: "center", mr: 1 },
                }}
              >
                El reporte incluye todos los alumnos activos, egresados y con baja del periodo actual en formato Excel.
              </Alert>
            </Box>
          </Paper>

          {/* ========================================================= */}
          {/* SECCIÓN 2: AVANCE POR GRUPO                               */}
          {/* ========================================================= */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                px: 3,
                backgroundColor: "#F9FAFB",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    backgroundColor: "#F3F4F6",
                    p: 0.8,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShowChartIcon sx={{ color: "#4B5563", fontSize: 20 }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
                  Avance por Grupo
                </Typography>
              </Stack>
            </Box>

            {/* Filtros */}
            <Box sx={{ p: 3, borderBottom: "1px solid #F3F4F6" }}>
              <Grid container spacing={2} alignItems="flex-end">
                {/* Materia */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", mb: 0.5, display: "block" }}>
                    MATERIA
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={materia}
                      onChange={(e) => setMateria(e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
                      }}
                    >
                      <MenuItem value="todas">Todas las materias</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Convocatoria */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", mb: 0.5, display: "block" }}>
                    CONVOCATORIA
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={convocatoria}
                      onChange={(e) => setConvocatoria(e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
                      }}
                    >
                      <MenuItem value="todas">Todas las generaciones</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Vigencia */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#9CA3AF", mb: 0.5, display: "block" }}>
                    VIGENCIA
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={vigencia}
                      onChange={(e) => setVigencia(e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
                      }}
                    >
                      <MenuItem value="todas">Todas las vigencias</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Botones de Acción */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#111827",
                        color: "#FFFFFF",
                        textTransform: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                        px: 3,
                        height: "40px",
                        "&:hover": { backgroundColor: "#1F2937" },
                      }}
                    >
                      Consultar
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<FileDownloadOutlinedIcon />}
                      sx={{
                        borderColor: "#E5E7EB",
                        color: "#6B7280",
                        textTransform: "none",
                        borderRadius: "8px",
                        fontWeight: 500,
                        height: "40px",
                        "&:hover": { borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" },
                      }}
                    >
                      Descargar Reporte
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            {/* Estado Vacío / Placeholder */}
            <Box
              sx={{
                py: 8,
                px: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  color: "#D1D5DB",
                  mb: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShowChartIcon sx={{ fontSize: 48 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#4B5563" }}>
                Selecciona los filtros para consultar el avance
              </Typography>
              <Typography variant="body2" sx={{ color: "#9CA3AF", mt: 0.5 }}>
                Elige una materia, convocatoria y vigencia, luego haz clic en Consultar.
              </Typography>
            </Box>
          </Paper>
        </Stack>
      </BoxContainer>
    </Box>
  );
};

export default Reportes;