import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import Button from "../../../atoms/Button/Button";
import { useNotification } from "../../../../providers/NotificationProvider";

export interface StudentItem {
  id: number;
  nombre: string;
  avance: number;
  calificacion: number;
  estado: "Activo" | "Atención" | "Riesgo" | string;
}

const initialStudents: StudentItem[] = [
  {
    id: 1,
    nombre: "García López, M.",
    avance: 88,
    calificacion: 9.2,
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Ramírez Torres, C.",
    avance: 74,
    calificacion: 8.1,
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Mendoza Ortiz, L.",
    avance: 52,
    calificacion: 6.8,
    estado: "Atención",
  },
  {
    id: 4,
    nombre: "Alvarado Vega, P.",
    avance: 95,
    calificacion: 9.7,
    estado: "Activo",
  },
  {
    id: 5,
    nombre: "Torres Medina, R.",
    avance: 33,
    calificacion: 5.2,
    estado: "Riesgo",
  },
];

export const GrupoTablaEstudiantes: React.FC = () => {
  const { showNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = initialStudents.filter((student) =>
    student.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAvanceColor = (avance: number) => {
    if (avance >= 80) return "#16A34A";
    if (avance >= 65) return "#2563EB";
    if (avance >= 45) return "#C2410C";
    return "#DC2626";
  };

  const getStatusBadgeStyle = (estado: string) => {
    switch (estado) {
      case "Activo":
        return {
          backgroundColor: "#F0FDF4",
          color: "#16A34A",
          border: "1px solid #BBF7D0",
        };
      case "Atención":
        return {
          backgroundColor: "#FFFBEB",
          color: "#D97706",
          border: "1px solid #FDE68A",
        };
      case "Riesgo":
        return {
          backgroundColor: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        };
      default:
        return {
          backgroundColor: "#F3F4F6",
          color: "#4B5563",
          border: "1px solid #E5E7EB",
        };
    }
  };

  const handleDownloadList = () => {
    showNotification("Descargando lista de estudiantes...", "info");
  };

  const handlePromediarGrupo = () => {
    showNotification("Promedio calculado correctamente para el grupo", "success");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 0.5 }}>
      {/* Campo de búsqueda */}
      <TextField
        placeholder="Buscar alumno..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        size="small"
        slotProps={{
          input: {
            sx: {
              backgroundColor: "#FAFAFA",
              borderRadius: "10px",
              fontSize: "0.9rem",
              "& fieldset": {
                borderColor: "#E5E7EB",
              },
            },
          },
        }}
      />

      {/* Tabla de Estudiantes */}
      <TableContainer
        sx={{
          borderRadius: "10px",
          border: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAFDFB" }}>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "#71717A",
                  letterSpacing: "0.04em",
                  py: 1.2,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                ALUMNO
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "#71717A",
                  letterSpacing: "0.04em",
                  py: 1.2,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                AVANCE
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "#71717A",
                  letterSpacing: "0.04em",
                  py: 1.2,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                CAL.
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "#71717A",
                  letterSpacing: "0.04em",
                  py: 1.2,
                  pr: 2,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                ESTADO
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student, index) => {
              const color = getAvanceColor(student.avance);
              const badgeStyle = getStatusBadgeStyle(student.estado);
              const isLast = index === filteredStudents.length - 1;

              return (
                <TableRow
                  key={student.id}
                  sx={{
                    "&:hover": { backgroundColor: "#F9FAFB" },
                  }}
                >
                  {/* ALUMNO */}
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: "#111827",
                      py: 1.5,
                      borderBottom: isLast ? "none" : "1px solid #F3F4F6",
                    }}
                  >
                    {student.nombre}
                  </TableCell>

                  {/* AVANCE */}
                  <TableCell
                    sx={{
                      py: 1.5,
                      borderBottom: isLast ? "none" : "1px solid #F3F4F6",
                      width: "180px",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <LinearProgress
                        variant="determinate"
                        value={student.avance}
                        sx={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "#E5E7EB",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 3,
                            backgroundColor: color,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          color: color,
                          minWidth: "32px",
                        }}
                      >
                        {student.avance}%
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* CAL. */}
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: "#374151",
                      py: 1.5,
                      borderBottom: isLast ? "none" : "1px solid #F3F4F6",
                    }}
                  >
                    {student.calificacion}
                  </TableCell>

                  {/* ESTADO */}
                  <TableCell
                    align="right"
                    sx={{
                      py: 1.5,
                      pr: 2,
                      borderBottom: isLast ? "none" : "1px solid #F3F4F6",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.3,
                        borderRadius: "16px",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        textAlign: "center",
                        ...badgeStyle,
                      }}
                    >
                      {student.estado}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botones Inferiores de Acción */}
      <Box sx={{ display: "flex", gap: 1.5, justifyContent: "space-between", mt: 1 }}>
        <Button
          variant="outlined"
          onClick={handleDownloadList}
          icon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
          iconPosition="start"
          fullWidth
          sxProps={{
            borderRadius: "10px",
            borderColor: "#E5E7EB",
            backgroundColor: "#FFFFFF",
            color: "#374151",
            fontWeight: 600,
            textTransform: "none",
            py: 1,
            "&:hover": {
              backgroundColor: "#F9FAFB",
              borderColor: "#D1D5DB",
            },
          }}
        >
          Descargar lista
        </Button>
        <Button
          variant="contained"
          onClick={handlePromediarGrupo}
          icon={<CalculateOutlinedIcon sx={{ fontSize: 18 }} />}
          iconPosition="start"
          fullWidth
          sxProps={{
            borderRadius: "10px",
            backgroundColor: "#1E1E1E",
            color: "#FFFFFF",
            fontWeight: 600,
            textTransform: "none",
            py: 1,
            "&:hover": {
              backgroundColor: "#333333",
            },
          }}
        >
          Promediar Grupo
        </Button>
      </Box>
    </Box>
  );
};