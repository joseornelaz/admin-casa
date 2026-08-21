import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  InputBase,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths } from "@constants";
import { AltaUnicaTable, type ProspectoRow } from "./AltaUnicaTable";

const PROSPECTOS_MOCK: ProspectoRow[] = [
  {
    id: "1",
    folio: "A1-2024-1885",
    nombre: "Gutiérrez Díaz, Miguel",
    numEmpleado: "38904",
    estado: "Rechazado",
    asesor: "Cynthia Cuevas",
    campana: "AGC-Q1",
    fecha: "ayer",
  },
  {
    id: "2",
    folio: "A1-2024-1879",
    nombre: "Mendoza Ortega, Daniel",
    numEmpleado: "58712",
    estado: "Rechazado",
    asesor: "Cynthia Cuevas",
    campana: "AGC-Q1",
    fecha: "7 jul",
  },
  {
    id: "3",
    folio: "A1-2024-1801",
    nombre: "Jiménez Vega, Marco",
    numEmpleado: "—",
    estado: "Rechazado",
    asesor: "Cynthia Cuevas",
    campana: "AGC-Q1",
    fecha: "28 jun",
  },
  {
    id: "4",
    folio: "A1-2024-1920",
    nombre: "Alvarado Vega, Pedro",
    numEmpleado: "44102",
    estado: "Interesado",
    asesor: "Ana Belén Ávila",
    campana: "AGC-Q1",
    fecha: "hoy",
  },
  {
    id: "5",
    folio: "A1-2024-1915",
    nombre: "Ríos Morales, Sofía",
    numEmpleado: "12984",
    estado: "Elegible",
    asesor: "Carlos Ramírez",
    campana: "AGC-Q1",
    fecha: "ayer",
  },
  {
    id: "6",
    folio: "A1-2024-1901",
    nombre: "Fernández Castro, Luis",
    numEmpleado: "67201",
    estado: "Comprometido",
    asesor: "Ana Belén Ávila",
    campana: "AGC-Q1",
    fecha: "3 jul",
  },
];

export const AltaUnica: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>("Rechazado");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [campanaAnchor, setCampanaAnchor] = useState<null | HTMLElement>(null);
  const [selectedCampana, setSelectedCampana] = useState<string>("todas");

  // Filtrado de prospectos
  const filteredProspectos = PROSPECTOS_MOCK.filter((p) => {
    // Filtro por Chip de Estado
    if (selectedFilter !== "Todos" && p.estado !== selectedFilter) {
      return false;
    }
    // Filtro por Búsqueda
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        p.nombre.toLowerCase().includes(q) ||
        p.folio.toLowerCase().includes(q) ||
        p.numEmpleado.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2.5 }}>
      {/* SECCIÓN SUPERIOR: BREADCRUMBS, TÍTULO Y BOTONES */}
      <Box>
        {/* Fila de Título y Botones de Acción */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", fontSize: { xs: "1.5rem", md: "1.875rem" } }}>
              Alta Única
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem", mt: 1 }}>
              Da seguimiento al pipeline de prospectos, desde el primer contacto hasta su inscripción.
            </Typography>
          </Box>

          {/* Botones Continuar Alta / Nueva Alta Única */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<SearchIcon sx={{ fontSize: 16 }} />}
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#374151",
                borderColor: "#D1D5DB",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.82rem",
                px: 2,
                py: 0.8,
                "&:hover": {
                  backgroundColor: "#F9FAFB",
                  borderColor: "#9CA3AF",
                },
              }}
            >
              Continuar Alta
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate(AppRoutingPaths.ALTA_UNICA_NUEVA)}
              startIcon={<AddIcon sx={{ fontSize: 18 }} />}
              sx={{
                backgroundColor: "#111827",
                color: "#FFFFFF",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.82rem",
                px: 2.2,
                py: 0.8,
                boxShadow: "0px 2px 6px rgba(17, 24, 39, 0.15)",
                "&:hover": {
                  backgroundColor: "#1F2937",
                },
              }}
            >
              Nueva Alta Única
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* ================= BARRA DE MÉTRICAS PIPELINE ================= */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "stretch",
          overflow: "hidden",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
        }}
      >
        {/* Métrica 1: INTERESADO */}
        <Box
          onClick={() => setSelectedFilter("Interesado")}
          sx={{
            flex: 1,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            borderRight: "1px solid #E5E7EB",
            backgroundColor: selectedFilter === "Interesado" ? "#F9FAFB" : "transparent",
            transition: "background-color 0.15s ease",
            "&:hover": { backgroundColor: "#F9FAFB" },
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1 }}>
              8
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#16A34A",
                fontWeight: 800,
                fontSize: "0.68rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                mt: 0.5,
                display: "block",
              }}
            >
              INTERESADO
            </Typography>
          </Box>
          <ChevronRightIcon sx={{ color: "#D1D5DB", fontSize: 18 }} />
        </Box>

        {/* Métrica 2: ELEGIBLE */}
        <Box
          onClick={() => setSelectedFilter("Elegible")}
          sx={{
            flex: 1,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            borderRight: "1px solid #E5E7EB",
            backgroundColor: selectedFilter === "Elegible" ? "#F9FAFB" : "transparent",
            transition: "background-color 0.15s ease",
            "&:hover": { backgroundColor: "#F9FAFB" },
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1 }}>
              6
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#2563EB",
                fontWeight: 800,
                fontSize: "0.68rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                mt: 0.5,
                display: "block",
              }}
            >
              ELEGIBLE
            </Typography>
          </Box>
          <ChevronRightIcon sx={{ color: "#D1D5DB", fontSize: 18 }} />
        </Box>

        {/* Métrica 3: COMPROMETIDO */}
        <Box
          onClick={() => setSelectedFilter("Comprometido")}
          sx={{
            flex: 1,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            borderRight: "1px solid #E5E7EB",
            backgroundColor: selectedFilter === "Comprometido" ? "#F9FAFB" : "transparent",
            transition: "background-color 0.15s ease",
            "&:hover": { backgroundColor: "#F9FAFB" },
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1 }}>
              3
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#D97706",
                fontWeight: 800,
                fontSize: "0.68rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                mt: 0.5,
                display: "block",
              }}
            >
              COMPROMETIDO
            </Typography>
          </Box>
          <ChevronRightIcon sx={{ color: "#D1D5DB", fontSize: 18 }} />
        </Box>

        {/* Métrica 4: RECHAZADO */}
        <Box
          onClick={() => setSelectedFilter("Rechazado")}
          sx={{
            flex: 1,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: selectedFilter === "Rechazado" ? "#F9FAFB" : "transparent",
            transition: "background-color 0.15s ease",
            "&:hover": { backgroundColor: "#F9FAFB" },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1 }}>
              3
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#DC2626",
                fontWeight: 800,
                fontSize: "0.68rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                mt: 0.5,
                display: "block",
              }}
            >
              RECHAZADO
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ================= BÚSQUEDA SIMPLE & FILTROS ================= */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", mb: 1, fontSize: "0.92rem" }}>
          Búsqueda simple
        </Typography>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            p: 2.5,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
          }}
        >
          {/* Input de Búsqueda y Botón Buscar */}
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F9FAFB",
                borderRadius: "10px",
                px: 2,
                py: 0.8,
                border: "1px solid #E5E7EB",
                transition: "all 0.2s ease",
                "&:focus-within": {
                  borderColor: "#111827",
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              <SearchIcon sx={{ color: "#9CA3AF", fontSize: 20, mr: 1 }} />
              <InputBase
                placeholder="Folio A1, Nº empleado, nombre del prospecto.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  color: "#111827",
                  fontSize: "0.875rem",
                  flex: 1,
                  "& input::placeholder": {
                    color: "#9CA3AF",
                    opacity: 1,
                  },
                }}
              />
            </Box>

            <Button
              variant="contained"
              onClick={() => {}}
              sx={{
                backgroundColor: "#111827",
                color: "#FFFFFF",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                px: 3,
                py: 1,
                "&:hover": {
                  backgroundColor: "#1F2937",
                },
              }}
            >
              Buscar
            </Button>
          </Stack>

          {/* Chips Filtro (Todos, Interesado, Elegible, Comprometido, Rechazado, Campaña) */}
          <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
            {["Todos", "Interesado", "Elegible", "Comprometido", "Rechazado"].map((filter) => {
              const isActive = selectedFilter === filter;
              return (
                <Chip
                  key={filter}
                  label={filter}
                  onClick={() => setSelectedFilter(filter)}
                  sx={{
                    backgroundColor: isActive ? "#111827" : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : "#4B5563",
                    border: isActive ? "1px solid #111827" : "1px solid #E5E7EB",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.78rem",
                    borderRadius: "16px",
                    px: 0.5,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      backgroundColor: isActive ? "#111827" : "#F3F4F6",
                    },
                  }}
                />
              );
            })}

            {/* Dropdown de Campaña */}
            <Chip
              label={`Campaña: ${selectedCampana}`}
              onClick={(e) => setCampanaAnchor(e.currentTarget)}
              deleteIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#6B7280" }} />}
              onDelete={(e) => setCampanaAnchor(e.currentTarget as any)}
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#4B5563",
                border: "1px solid #E5E7EB",
                fontWeight: 500,
                fontSize: "0.78rem",
                borderRadius: "16px",
                px: 0.5,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                },
              }}
            />

            <Menu
              anchorEl={campanaAnchor}
              open={Boolean(campanaAnchor)}
              onClose={() => setCampanaAnchor(null)}
              PaperProps={{
                sx: {
                  borderRadius: "10px",
                  mt: 0.5,
                  boxShadow: "0px 4px 16px rgba(0,0,0,0.1)",
                },
              }}
            >
              <MenuItem onClick={() => { setSelectedCampana("todas"); setCampanaAnchor(null); }} sx={{ fontSize: "0.82rem" }}>
                Campaña: todas
              </MenuItem>
              <MenuItem onClick={() => { setSelectedCampana("AGC-Q1"); setCampanaAnchor(null); }} sx={{ fontSize: "0.82rem" }}>
                AGC-Q1
              </MenuItem>
              <MenuItem onClick={() => { setSelectedCampana("AGC-Q2"); setCampanaAnchor(null); }} sx={{ fontSize: "0.82rem" }}>
                AGC-Q2
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Box>

      {/* ================= TABLA DE ALTA ÚNICA ================= */}
      <AltaUnicaTable rows={filteredProspectos} totalCount={147} />
    </Box>
  );
};

export default AltaUnica;