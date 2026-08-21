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
  Typography,
  Button,
  Box,
  Stack,
  Checkbox,
  Chip,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export type EstadoProspecto = "Interesado" | "Elegible" | "Comprometido" | "Rechazado";

export interface ProspectoRow {
  id: string;
  folio: string;
  nombre: string;
  numEmpleado: string;
  estado: EstadoProspecto;
  asesor: string;
  campana: string;
  fecha: string;
}

interface AltaUnicaTableProps {
  rows: ProspectoRow[];
  totalCount?: number;
}

export const AltaUnicaTable: React.FC<AltaUnicaTableProps> = ({
  rows,
  totalCount = 147,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(rows.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const renderEstadoChip = (estado: EstadoProspecto) => {
    let bg = "#FEF2F2";
    let border = "#FECACA";
    let color = "#DC2626";

    if (estado === "Interesado") {
      bg = "#F0FDF4";
      border = "#DCFCE7";
      color = "#16A34A";
    } else if (estado === "Elegible") {
      bg = "#EFF6FF";
      border = "#BFDBFE";
      color = "#2563EB";
    } else if (estado === "Comprometido") {
      bg = "#FFF7ED";
      border = "#FFEDD5";
      color = "#D97706";
    }

    return (
      <Chip
        label={estado}
        size="small"
        sx={{
          backgroundColor: bg,
          border: `1px solid ${border}`,
          color: color,
          fontWeight: 700,
          fontSize: "0.72rem",
          borderRadius: "14px",
          height: 22,
          px: 1,
        }}
      />
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 900 }}>
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ pl: 2 }}>
                <Checkbox
                  size="small"
                  indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length}
                  checked={rows.length > 0 && selectedIds.length === rows.length}
                  onChange={handleSelectAll}
                  sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                />
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                FOLIO
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                PROSPECTO
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }} align="center">
                ESTADO
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                ASESOR
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                CAMPAÑA
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.5px" }} align="right">
                FECHA
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: "#9CA3AF" }}>
                  <Typography variant="body2">No se encontraron prospectos</Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <TableRow
                    key={row.id}
                    selected={isSelected}
                    sx={{
                      "&:hover": { backgroundColor: "#F9FAFB" },
                      transition: "background-color 0.15s ease",
                    }}
                  >
                    <TableCell padding="checkbox" sx={{ pl: 2 }}>
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => handleSelectOne(row.id)}
                        sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                      />
                    </TableCell>

                    {/* FOLIO */}
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#6B7280", fontSize: "0.82rem" }}>
                        {row.folio}
                      </Typography>
                    </TableCell>

                    {/* PROSPECTO */}
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.875rem", lineHeight: 1.2 }}>
                        {row.nombre}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem", mt: 0.2, display: "block" }}>
                        Nº emp: {row.numEmpleado}
                      </Typography>
                    </TableCell>

                    {/* ESTADO */}
                    <TableCell align="center" sx={{ py: 2 }}>
                      {renderEstadoChip(row.estado)}
                    </TableCell>

                    {/* ASESOR */}
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.82rem" }}>
                        {row.asesor}
                      </Typography>
                    </TableCell>

                    {/* CAMPAÑA */}
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.82rem" }}>
                        {row.campana}
                      </Typography>
                    </TableCell>

                    {/* FECHA */}
                    <TableCell align="right" sx={{ py: 2, pr: 3 }}>
                      <Typography variant="body2" sx={{ color: "#9CA3AF", fontSize: "0.8rem" }}>
                        {row.fecha}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>

          {/* Footer de Paginación */}
          <TableFooter sx={{ backgroundColor: "#FFFFFF" }}>
            <TableRow>
              <TableCell colSpan={7} sx={{ p: 2, borderTop: "1px solid #E5E7EB" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "0.78rem" }}>
                    Mostrando {rows.length} de {totalCount} altas únicas
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "0.78rem" }}>
                      Página {page} de 30
                    </Typography>

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

export default AltaUnicaTable;