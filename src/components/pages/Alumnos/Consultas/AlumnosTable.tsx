import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Avatar,
  Typography,
  Button,
  Box,
  Stack,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

export type EstadoAlumno = "Activo" | "Egresado" | "Baja";

export interface AlumnoRow {
  id: number;
  nombre: string;
  matricula: string;
  correo: string;
  ultAct: string;
  iniciales: string;
  estado: EstadoAlumno;
  condicion: string;
  condicionTipo: "regular" | "irregular" | "normal" | "baja" | "vencer";
  ruta: string;
  proximoPasoType?: "pago" | "pendiente" | "reactivacion" | "none";
  proximoPasoLabel?: string;
  borderColor: string;
}

const rows: AlumnoRow[] = [
  {
    id: 1,
    nombre: "García López, María Elena",
    matricula: "AGC-2023-001",
    correo: "garcia.elena@correo.edu.mx",
    ultAct: "Hoy, 09:40 hrs",
    iniciales: "MG",
    estado: "Activo",
    condicion: "Regular",
    condicionTipo: "regular",
    ruta: "Lic. en Administración",
    proximoPasoType: "pago",
    proximoPasoLabel: "Próximo pago",
    borderColor: "#F59E0B",
  },
  {
    id: 2,
    nombre: "Ramírez Torres, Carlos",
    matricula: "AGC-2022-087",
    correo: "c.ramirez@correo.edu.mx",
    ultAct: "Ayer, 16:25 hrs",
    iniciales: "CR",
    estado: "Activo",
    condicion: "Irregular",
    condicionTipo: "irregular",
    ruta: "Lic. en Negocios",
    proximoPasoType: "pendiente",
    proximoPasoLabel: "2 pendientes",
    borderColor: "#F59E0B",
  },
  {
    id: 3,
    nombre: "López Hernández, Ana",
    matricula: "AGC-2021-134",
    correo: "a.lopez@correo.edu.mx",
    ultAct: "28 jun, 11:15 hrs",
    iniciales: "LH",
    estado: "Egresado",
    condicion: "Normal",
    condicionTipo: "normal",
    ruta: "Lic. en Administración",
    proximoPasoType: "none",
    borderColor: "#E5E7EB",
  },
  {
    id: 4,
    nombre: "Morales Vega, José",
    matricula: "AGC-2023-045",
    correo: "j.morales@correo.edu.mx",
    ultAct: "15 jun, 08:50 hrs",
    iniciales: "JM",
    estado: "Baja",
    condicion: "Baja temporal",
    condicionTipo: "baja",
    ruta: "Lic. en Derecho",
    proximoPasoType: "reactivacion",
    proximoPasoLabel: "Reactivación",
    borderColor: "#EF4444",
  },
  {
    id: 5,
    nombre: "Sánchez Ruiz, Valentina",
    matricula: "AGC-2024-012",
    correo: "v.sanchez@correo.edu.mx",
    ultAct: "Hoy, 16:25 hrs",
    iniciales: "VS",
    estado: "Activo",
    condicion: "Materias por vencer",
    condicionTipo: "vencer",
    ruta: "Lic. en Negocios",
    proximoPasoType: "pendiente",
    proximoPasoLabel: "3 pendientes",
    borderColor: "#F59E0B",
  },
];

export const AlumnosTable: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [targetPage, setTargetPage] = useState<string>("");

  const getStatusColor = (estado: EstadoAlumno) => {
    switch (estado) {
      case "Activo":
        return "#16A34A";
      case "Egresado":
        return "#2563EB";
      case "Baja":
        return "#DC2626";
      default:
        return "#6B7280";
    }
  };

  const renderCondicionChip = (tipo: string, label: string) => {
    let bg = "#F9FAFB";
    let border = "#E5E7EB";
    let color = "#6B7280";

    if (tipo === "regular") {
      bg = "#F0FDF4";
      border = "#DCFCE7";
      color = "#15803D";
    } else if (tipo === "irregular" || tipo === "vencer") {
      bg = "#FFFBEB";
      border = "#FEF3C7";
      color = "#B45309";
    }

    return (
      <Box
        sx={{
          display: "inline-block",
          backgroundColor: bg,
          border: `1px solid ${border}`,
          color: color,
          fontSize: "0.68rem",
          fontWeight: 600,
          borderRadius: "12px",
          px: 1,
          py: 0.2,
          mt: 0.4,
        }}
      >
        {label}
      </Box>
    );
  };

  const renderProximoPaso = (row: AlumnoRow) => {
    if (row.proximoPasoType === "none" || !row.proximoPasoType) {
      return (
        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
          —
        </Typography>
      );
    }

    let bg = "#EFF6FF";
    let border = "#BFDBFE";
    let color = "#2563EB";
    let IconComponent = DescriptionOutlinedIcon;

    if (row.proximoPasoType === "pendiente") {
      bg = "#FFF7ED";
      border = "#FFEDD5";
      color = "#D97706";
      IconComponent = WarningAmberOutlinedIcon;
    } else if (row.proximoPasoType === "reactivacion") {
      bg = "#FEF2F2";
      border = "#FECACA";
      color = "#DC2626";
      IconComponent = WarningAmberOutlinedIcon;
    }

    return (
      <Stack
        direction="row"
        spacing={0.6}
        alignItems="center"
        sx={{
          display: "inline-flex",
          backgroundColor: bg,
          border: `1px solid ${border}`,
          color: color,
          fontSize: "0.72rem",
          fontWeight: 600,
          borderRadius: "14px",
          px: 1.2,
          py: 0.3,
        }}
      >
        <IconComponent sx={{ fontSize: 13, color }} />
        <span>{row.proximoPasoLabel}</span>
      </Stack>
    );
  };

  return (
    <Box sx={{ width: "100%", py: 1 }}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 900 }}>
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px", pl: 3 }}>
                ALUMNO / MATRÍCULA
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                ESTADO / CONDICIÓN
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                RUTA DE FORMACIÓN
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                PRÓX. PASO
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }} align="right">
                ACCIONES
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  borderLeft: `4px solid ${row.borderColor}`,
                  transition: "background-color 0.15s ease",
                  "&:hover": { backgroundColor: "#F9FAFB" },
                  "&:hover .action-icons": {
                    opacity: 1,
                    visibility: "visible",
                  },
                }}
              >
                {/* Columna ALUMNO / MATRÍCULA */}
                <TableCell sx={{ pl: 2, py: 1.8 }}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Avatar
                      sx={{
                        backgroundColor: "#E5E7EB",
                        color: "#6B7280",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        width: 32,
                        height: 32,
                        mt: 0.2,
                      }}
                    >
                      {row.iniciales}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.875rem" }}>
                        {row.nombre}
                      </Typography>

                      <Typography variant="caption" sx={{ color: "#6B7280", display: "block", fontSize: "0.75rem", mt: 0.2 }}>
                        <Box component="span" sx={{ fontWeight: 700, color: "#111827", mr: 1 }}>
                          {row.matricula}
                        </Box>
                        {row.correo}
                      </Typography>

                      <Typography variant="caption" sx={{ color: "#9CA3AF", display: "block", fontSize: "0.7rem", mt: 0.3 }}>
                        Últ. act.: {row.ultAct}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                {/* Columna ESTADO / CONDICIÓN */}
                <TableCell sx={{ py: 1.8 }}>
                  <Box>
                    <Stack direction="row" spacing={0.6} alignItems="center">
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: getStatusColor(row.estado),
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          color: getStatusColor(row.estado),
                        }}
                      >
                        {row.estado}
                      </Typography>
                    </Stack>
                    {renderCondicionChip(row.condicionTipo, row.condicion)}
                  </Box>
                </TableCell>

                {/* Columna RUTA DE FORMACIÓN */}
                <TableCell sx={{ py: 1.8 }}>
                  <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.82rem" }}>
                    {row.ruta}
                  </Typography>
                </TableCell>

                {/* Columna PRÓX. PASO */}
                <TableCell sx={{ py: 1.8 }}>
                  {renderProximoPaso(row)}
                </TableCell>

                {/* Columna ACCIONES */}
                <TableCell align="right" sx={{ py: 1.8, pr: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    {/* Iconos de Ver y Editar (Se muestran únicamente en Hover) */}
                    <Box
                      className="action-icons"
                      sx={{
                        opacity: 0,
                        visibility: "hidden",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.3,
                        transition: "opacity 0.2s ease, visibility 0.2s ease",
                      }}
                    >
                      <Tooltip title="Ver detalle" placement="top">
                        <IconButton
                          size="small"
                          onClick={() => console.log("Ver:", row.id)}
                          sx={{
                            color: "#6B7280",
                            p: 0.6,
                            "&:hover": { color: "#111827", backgroundColor: "#E5E7EB" },
                          }}
                        >
                          <VisibilityIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Editar" placement="top">
                        <IconButton
                          size="small"
                          onClick={() => console.log("Editar:", row.id)}
                          sx={{
                            color: "#6B7280",
                            p: 0.6,
                            "&:hover": { color: "#111827", backgroundColor: "#E5E7EB" },
                          }}
                        >
                          <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* Enlace Seguimiento */}
                    <Typography
                      variant="body2"
                      onClick={() => console.log("Seguimiento para:", row.id)}
                      sx={{
                        color: "#2563EB",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Seguimiento
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Footer de Paginación */}
          <TableFooter sx={{ backgroundColor: "#FFFFFF" }}>
            <TableRow>
              <TableCell colSpan={5} sx={{ p: 2, borderTop: "1px solid #E5E7EB" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "0.78rem" }}>
                    Mostrando 5 de 1,247 alumnos
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={2.5}>
                    <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "0.78rem" }}>
                      Página {page} de 250
                    </Typography>

                    {/* Ir a página */}
                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.75rem" }}>
                        Ir:
                      </Typography>
                      <TextField
                        size="small"
                        value={targetPage}
                        onChange={(e) => setTargetPage(e.target.value)}
                        placeholder="1"
                        sx={{
                          width: 44,
                          "& .MuiInputBase-input": {
                            py: 0.4,
                            px: 0.8,
                            fontSize: "0.75rem",
                            textAlign: "center",
                          },
                        }}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          const p = parseInt(targetPage, 10);
                          if (!isNaN(p) && p >= 1 && p <= 250) setPage(p);
                        }}
                        sx={{
                          minWidth: "auto",
                          px: 1.2,
                          py: 0.3,
                          textTransform: "none",
                          fontSize: "0.75rem",
                          color: "#374151",
                          borderColor: "#D1D5DB",
                          borderRadius: "6px",
                          "&:hover": { borderColor: "#9CA3AF", backgroundColor: "#F9FAFB" },
                        }}
                      >
                        Ir
                      </Button>
                    </Stack>

                    {/* Botones Anterior / Siguiente */}
                    <Stack direction="row" spacing={1}>
                      <Button
                        disabled={page === 1}
                        variant="outlined"
                        size="small"
                        startIcon={<KeyboardArrowLeftIcon sx={{ fontSize: 16 }} />}
                        onClick={() => setPage((p) => p - 1)}
                        sx={{
                          textTransform: "none",
                          color: "#374151",
                          borderColor: "#D1D5DB",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          py: 0.4,
                          px: 1.5,
                          "&:hover": { borderColor: "#9CA3AF", backgroundColor: "#F9FAFB" },
                          "&:disabled": { borderColor: "#E5E7EB", color: "#D1D5DB" },
                        }}
                      >
                        Anterior
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<KeyboardArrowRightIcon sx={{ fontSize: 16 }} />}
                        onClick={() => setPage((p) => p + 1)}
                        sx={{
                          textTransform: "none",
                          color: "#374151",
                          borderColor: "#D1D5DB",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          py: 0.4,
                          px: 1.5,
                          "&:hover": { borderColor: "#9CA3AF", backgroundColor: "#F9FAFB" },
                        }}
                      >
                        Siguiente
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AlumnosTable;