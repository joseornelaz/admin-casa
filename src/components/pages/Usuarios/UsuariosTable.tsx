import React, { useMemo, useState } from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import type { UsuarioRow, RolUsuario, EstatusUsuario, UsuariosFilterParams } from "../../../types/Usuario.interface";

type UsuariosTableProps = {
  filters?: UsuariosFilterParams;
  onVer?: (row: UsuarioRow) => void;
  onEditar?: (row: UsuarioRow) => void;
  onGestionarAccesos?: (row: UsuarioRow) => void;
};

const rows: UsuarioRow[] = [
  {
    id: 1,
    nombre: "Hernández Ruiz, Laura",
    iniciales: "LH",
    correo: "laura.hernandez@casa.edu.mx",
    rolPrincipal: "Administrador",
    organizacion: "Dirección General",
    estatus: "Activo",
    ultAcceso: "Hoy, 08:12 hrs",
  },
  {
    id: 2,
    nombre: "Castillo Mora, Roberto",
    iniciales: "RC",
    correo: "roberto.castillo@casa.edu.mx",
    rolPrincipal: "Coordinador",
    organizacion: "Coordinación Académica",
    estatus: "Activo",
    ultAcceso: "Ayer, 17:45 hrs",
  },
  {
    id: 3,
    nombre: "Vega Ortega, Sofía",
    iniciales: "SV",
    correo: "sofia.vega@casa.edu.mx",
    rolPrincipal: "Docente",
    organizacion: "Lic. en Administración",
    estatus: "Activo",
    ultAcceso: "Hoy, 10:30 hrs",
  },
  {
    id: 4,
    nombre: "Ramírez Luna, Daniel",
    iniciales: "DR",
    correo: "daniel.ramirez@casa.edu.mx",
    rolPrincipal: "Asesor",
    organizacion: "Bienestar Estudiantil",
    estatus: "Inactivo",
    ultAcceso: "12 jun, 09:20 hrs",
  },
  {
    id: 5,
    nombre: "Torres Delgado, Mariana",
    iniciales: "MT",
    correo: "mariana.torres@casa.edu.mx",
    rolPrincipal: "Tutor",
    organizacion: "Lic. en Negocios",
    estatus: "Activo",
    ultAcceso: "Hoy, 12:05 hrs",
  },
];

const ROL_BORDER_COLORS: Record<RolUsuario, string> = {
  Administrador: "#8B5CF6",
  Coordinador: "#2563EB",
  Docente: "#16A34A",
  Asesor: "#F59E0B",
  Tutor: "#0EA5E9",
};

const PAGE_SIZE = 5;
const TOTAL_USUARIOS = 148;

export const UsuariosTable: React.FC<UsuariosTableProps> = ({ filters, onVer, onEditar }) => {
  const [page, setPage] = useState<number>(1);
  const [targetPage, setTargetPage] = useState<string>("");

  // Filtro en cliente mientras el endpoint de filtros no exista
  const filteredRows = useMemo(() => {
    if (!filters) return rows;

    const term = filters.searchText.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesText =
        !term ||
        row.nombre.toLowerCase().includes(term) ||
        row.correo.toLowerCase().includes(term) ||
        row.organizacion.toLowerCase().includes(term);

      const matchesRol = filters.rol === "Todos los roles" || filters.rol === "todas" || row.rolPrincipal === filters.rol;
      const matchesEstatus = filters.estatus === "Todos los estatus" || filters.estatus === "todos" || row.estatus === filters.estatus;

      return matchesText && matchesRol && matchesEstatus;
    });
  }, [filters]);

  const getStatusColor = (estatus: EstatusUsuario) => {
    switch (estatus) {
      case "Activo":
        return "#16A34A";
      case "Inactivo":
        return "#9CA3AF";
      default:
        return "#6B7280";
    }
  };

  const renderRolChip = (rol: RolUsuario) => (
    <Box
      sx={{
        display: "inline-block",
        backgroundColor: "#F9FAFB",
        border: "1px solid #E5E7EB",
        borderLeft: `3px solid ${ROL_BORDER_COLORS[rol]}`,
        color: "#374151",
        fontSize: "0.68rem",
        fontWeight: 600,
        borderRadius: "12px",
        px: 1,
        py: 0.2,
        mt: 0.4,
      }}
    >
      {rol}
    </Box>
  );

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));

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
                NOMBRE
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                CORREO
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                ROL PRINCIPAL
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                ORGANIZACIÓN
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                ESTATUS
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }} align="right">
                ACCIONES
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                    No se encontraron usuarios que coincidan con la búsqueda.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {filteredRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  borderLeft: `4px solid ${ROL_BORDER_COLORS[row.rolPrincipal]}`,
                  transition: "background-color 0.15s ease",
                  "&:hover": { backgroundColor: "#F9FAFB" },
                  "&:hover .action-icons": {
                    opacity: 1,
                    visibility: "visible",
                  },
                }}
              >
                {/* Columna USUARIO / CORREO */}
                <TableCell sx={{ pl: 2, py: 1.8 }}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Avatar
                      sx={{
                        backgroundColor: row.avatarBg ?? "#E5E7EB",
                        color: row.avatarColor ?? "#6B7280",
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
                      <Typography variant="caption" sx={{ color: "#9CA3AF", display: "block", fontSize: "0.7rem", mt: 0.3 }}>
                        Últ. acceso: {row.ultAcceso}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                {/* Columna CORREO */}
                <TableCell sx={{ py: 1.8 }}>{row.correo}</TableCell>

                {/* Columna ROL */}
                <TableCell sx={{ py: 1.8 }}>{renderRolChip(row.rolPrincipal)}</TableCell>

                {/* Columna ORGANIZACIÓN */}
                <TableCell sx={{ py: 1.8 }}>
                  <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.82rem" }}>
                    {row.organizacion}
                  </Typography>
                </TableCell>

                {/* Columna ESTATUS / ÚLT. ACCESO */}
                <TableCell sx={{ py: 1.8 }}>
                  <Stack direction="row" spacing={0.6} alignItems="center">
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: getStatusColor(row.estatus),
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        color: getStatusColor(row.estatus),
                      }}
                    >
                      {row.estatus}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Columna ACCIONES */}
                <TableCell align="right" sx={{ py: 1.8, pr: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    {/* Iconos de Ver y Editar (Se muestran únicamente en Hover) */}
                    <Box
                      className="action-icons"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.3,
                      }}
                    >
                      <Tooltip title="Ver detalle" placement="top">
                        <IconButton
                          size="small"
                          onClick={() => (onVer ? onVer(row) : console.log("Ver:", row.id))}
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
                          onClick={() => (onEditar ? onEditar(row) : console.log("Editar:", row.id))}
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

                    {/* Enlace Gestionar accesos */}
                    {/* <Typography
                      variant="body2"
                      onClick={() => (onGestionarAccesos ? onGestionarAccesos(row) : console.log("Gestionar accesos para:", row.id))}
                      sx={{
                        color: "#2563EB",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <ManageAccountsOutlinedIcon sx={{ fontSize: 16 }} />
                      Gestionar accesos
                    </Typography> */}
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
                    Mostrando {filteredRows.length} de {TOTAL_USUARIOS} usuarios
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={2.5}>
                    <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "0.78rem" }}>
                      Página {page} de {totalPages}
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
                          if (!isNaN(p) && p >= 1 && p <= totalPages) setPage(p);
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
                        disabled={page === totalPages}
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

export default UsuariosTable;
