import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Collapse,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AppRoutingPaths } from "@constants";

interface GlobalSidenavProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface ProgramaOption {
  id: string;
  nombre: string;
}

const PROGRAMAS_MOCK: ProgramaOption[] = [
  { id: "ing-soft", nombre: "Ingeniería en Desarrollo de Software" },
  { id: "dip-admin", nombre: "Diplomado en Administración" },
  { id: "dip-ia", nombre: "Diplomado en Inteligencia Artificial" },
  { id: "prep", nombre: "Preparatoria" },
];

export const GlobalSidenav: React.FC<GlobalSidenavProps> = ({
  collapsed: externalCollapsed,
  onToggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(false);
  const [academicoOpen, setAcademicoOpen] = useState<boolean>(true);

  // Estado para el programa seleccionado y el menú desplegable
  const [selectedProg, setSelectedProg] = useState<ProgramaOption>(PROGRAMAS_MOCK[1]); // Diplomado en Administración
  const [progMenuAnchor, setProgMenuAnchor] = useState<null | HTMLElement>(null);

  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const handleOpenProgMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProgMenuAnchor(event.currentTarget);
  };

  const handleSelectProg = (prog: ProgramaOption) => {
    setSelectedProg(prog);
    localStorage.setItem("selectedProgram", JSON.stringify(prog));
    setProgMenuAnchor(null);
  };

  const handleCambiarCuenta = () => {
    setProgMenuAnchor(null);
    navigate(AppRoutingPaths.SELECCION_ESPACIO);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      sx={{
        width: isCollapsed ? "68px" : "250px",
        height: "100%",
        backgroundColor: "#111315",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: isCollapsed ? 1 : 2,
        py: 2,
        boxSizing: "border-box",
        flexShrink: 0,
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        userSelect: "none",
        position: "relative",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Botón flotante para colapsar/expandir (Chevron) */}
      <IconButton
        onClick={handleToggle}
        size="small"
        sx={{
          position: "absolute",
          top: 14,
          right: -13,
          zIndex: 1200,
          backgroundColor: "#1F2937",
          color: "#FFFFFF",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.4)",
          width: 26,
          height: 26,
          "&:hover": {
            backgroundColor: "#374151",
          },
        }}
      >
        {isCollapsed ? (
          <ChevronRightIcon sx={{ fontSize: 16 }} />
        ) : (
          <ChevronLeftIcon sx={{ fontSize: 16 }} />
        )}
      </IconButton>

      {/* SECCIÓN SUPERIOR: CARD DE CONTEXTO & LISTA DE MENÚS */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", pr: 0.2 }}>
        {/* Active Program Card (Clic para desplegar menú) */}
        {isCollapsed ? (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 0.5 }}>
            <Tooltip title={`${selectedProg.nombre} - Programa activo`} placement="right">
              <Box
                onClick={handleOpenProgMenu}
                sx={{
                  width: 38,
                  height: 38,
                  backgroundColor: "#191B20",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                AG
              </Box>
            </Tooltip>
          </Box>
        ) : (
          <Box
            onClick={handleOpenProgMenu}
            sx={{
              backgroundColor: "#191B20",
              borderRadius: "12px",
              p: 1.5,
              mb: 2,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              cursor: "pointer",
              transition: "all 0.15s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <Box
              sx={{
                width: 26,
                height: 26,
                backgroundColor: "#FFFFFF",
                color: "#111315",
                fontWeight: 800,
                fontSize: "0.7rem",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              AG
            </Box>
            <Box sx={{ flex: 1, overflow: "hidden" }}>
              <Typography
                variant="body2"
                noWrap
                sx={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.8rem", lineHeight: 1.2 }}
              >
                {selectedProg.nombre}
              </Typography>
              <Stack direction="row" spacing={0.6} alignItems="center" sx={{ mt: 0.3 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#3B82F6" }} />
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.68rem" }}>
                  Programa activo
                </Typography>
              </Stack>
            </Box>

            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#6B7280" }} />
          </Box>
        )}

        {/* MENÚ DESPLEGABLE DE PROGRAMAS */}
        <Menu
          anchorEl={progMenuAnchor}
          open={Boolean(progMenuAnchor)}
          onClose={() => setProgMenuAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              backgroundColor: "#16181C",
              color: "#FFFFFF",
              borderRadius: "14px",
              mt: 1,
              width: "250px",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              py: 1.2,
              px: 0.5,
            },
          }}
        >
          {/* Header del menú */}
          <Typography
            variant="caption"
            sx={{
              color: "#6B7280",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "1px",
              px: 1.5,
              py: 0.5,
              display: "block",
              textTransform: "uppercase",
            }}
          >
            PROGRAMAS — AG COLLEGE
          </Typography>

          {/* Lista de programas */}
          <Stack spacing={0.4} sx={{ my: 0.5 }}>
            {PROGRAMAS_MOCK.map((prog) => {
              const isSelected = selectedProg.id === prog.id;
              return (
                <MenuItem
                  key={prog.id}
                  onClick={() => handleSelectProg(prog)}
                  sx={{
                    borderRadius: "8px",
                    mx: 0.8,
                    py: 1,
                    px: 1.2,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.2,
                    backgroundColor: isSelected ? "rgba(255, 255, 255, 0.08)" : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  {/* Radio box indicator */}
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "3px",
                      border: isSelected ? "none" : "1.5px solid #4B5563",
                      backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                      mt: 0.3,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isSelected && (
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "1px",
                          backgroundColor: "#111827",
                        }}
                      />
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: isSelected ? 700 : 500,
                      color: "#FFFFFF",
                      lineHeight: 1.3,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {prog.nombre}
                  </Typography>
                </MenuItem>
              );
            })}
          </Stack>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

          {/* Opción Cambiar Cuenta / Espacio */}
          <MenuItem
            onClick={handleCambiarCuenta}
            sx={{
              borderRadius: "8px",
              mx: 0.8,
              py: 0.8,
              px: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              color: "#9CA3AF",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#FFFFFF",
              },
            }}
          >
            <LogoutOutlinedIcon sx={{ fontSize: 18, transform: "rotate(180deg)" }} />
            <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 600 }}>
              Cambiar cuenta
            </Typography>
          </MenuItem>
        </Menu>

        {/* Separador cuando está colapsado */}
        {isCollapsed && <Box sx={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", mb: 2, mx: 0.5 }} />}

        {/* Item Inicio */}
        <Tooltip title={isCollapsed ? "Inicio" : ""} placement="right">
          <Box
            onClick={() => navigate(AppRoutingPaths.HOME)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed ? "center" : "flex-start",
              gap: 1.5,
              px: isCollapsed ? 0 : 1.8,
              py: isCollapsed ? 1.2 : 1,
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: isActive(AppRoutingPaths.HOME)
                ? isCollapsed
                  ? "#2D3139"
                  : "#FFFFFF"
                : "transparent",
              color: isActive(AppRoutingPaths.HOME)
                ? isCollapsed
                  ? "#FFFFFF"
                  : "#111827"
                : "#D1D5DB",
              mb: 2,
              transition: "all 0.15s ease",
              "&:hover": {
                backgroundColor: isActive(AppRoutingPaths.HOME)
                  ? isCollapsed
                    ? "#374151"
                    : "#FFFFFF"
                  : "rgba(255, 255, 255, 0.06)",
                color: isActive(AppRoutingPaths.HOME) && !isCollapsed ? "#111827" : "#FFFFFF",
              },
            }}
          >
            <HomeOutlinedIcon sx={{ fontSize: isCollapsed ? 22 : 20 }} />
            {!isCollapsed && (
              <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                Inicio
              </Typography>
            )}
          </Box>
        </Tooltip>

        {/* ================= GRUPO: ALUMNOS ================= */}
        {isCollapsed ? (
          <Box sx={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", my: 1.5, mx: 0.5 }} />
        ) : (
          <Typography
            variant="caption"
            sx={{
              color: "#6B7280",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "1.2px",
              px: 1.8,
              mb: 0.8,
              display: "block",
            }}
          >
            ALUMNOS
          </Typography>
        )}

        <Stack spacing={0.4} sx={{ mb: 1 }}>
          {/* Consulta de Alumnos */}
          <Tooltip title={isCollapsed ? "Consulta de Alumnos" : ""} placement="right">
            <Box
              onClick={() => navigate(AppRoutingPaths.CONSULTA)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                gap: 1.5,
                px: isCollapsed ? 0 : 1.8,
                py: isCollapsed ? 1 : 0.8,
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: isActive(AppRoutingPaths.CONSULTA) ? "rgba(255, 255, 255, 0.1)" : "transparent",
                color: isActive(AppRoutingPaths.CONSULTA) ? "#FFFFFF" : "#9CA3AF",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#FFFFFF",
                },
              }}
            >
              <SearchIcon sx={{ fontSize: isCollapsed ? 20 : 18 }} />
              {!isCollapsed && (
                <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 500 }}>
                  Consulta de Alumnos
                </Typography>
              )}
            </Box>
          </Tooltip>

          {/* Alta Única */}
          <Tooltip title={isCollapsed ? "Alta Única" : ""} placement="right">
            <Box
              onClick={() => navigate(AppRoutingPaths.ALTA_UNICA)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                gap: 1.5,
                px: isCollapsed ? 0 : 1.8,
                py: isCollapsed ? 1 : 0.8,
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: isActive(AppRoutingPaths.ALTA_UNICA) ? "rgba(255, 255, 255, 0.1)" : "transparent",
                color: isActive(AppRoutingPaths.ALTA_UNICA) ? "#FFFFFF" : "#9CA3AF",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#FFFFFF",
                },
              }}
            >
              <PersonAddOutlinedIcon sx={{ fontSize: isCollapsed ? 20 : 18 }} />
              {!isCollapsed && (
                <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 500 }}>
                  Alta Única
                </Typography>
              )}
            </Box>
          </Tooltip>
        </Stack>

        {/* ================= GRUPO: GESTIÓN ================= */}
        {isCollapsed ? (
          <Box sx={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", my: 1.5, mx: 0.5 }} />
        ) : (
          <Typography
            variant="caption"
            sx={{
              color: "#6B7280",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "1.2px",
              px: 1.8,
              mb: 0.8,
              display: "block",
            }}
          >
            GESTIÓN
          </Typography>
        )}

        <Stack spacing={0.4} sx={{ mb: 1 }}>
          {/* Captura de Asesores */}
          <Tooltip title={isCollapsed ? "Captura de Asesores" : ""} placement="right">
            <Box
              onClick={() => navigate(AppRoutingPaths.CONSULTA)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                gap: 1.5,
                px: isCollapsed ? 0 : 1.8,
                py: isCollapsed ? 1 : 0.8,
                borderRadius: "8px",
                cursor: "pointer",
                color: "#9CA3AF",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#FFFFFF",
                },
              }}
            >
              <AssignmentIndOutlinedIcon sx={{ fontSize: isCollapsed ? 20 : 18 }} />
              {!isCollapsed && (
                <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 500 }}>
                  Captura de Asesores
                </Typography>
              )}
            </Box>
          </Tooltip>

          {/* Reportes */}
          <Tooltip title={isCollapsed ? "Reportes" : ""} placement="right">
            <Box
              onClick={() => navigate(AppRoutingPaths.REPORTES)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                gap: 1.5,
                px: isCollapsed ? 0 : 1.8,
                py: isCollapsed ? 1 : 0.8,
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: isActive(AppRoutingPaths.REPORTES) ? "rgba(255, 255, 255, 0.1)" : "transparent",
                color: isActive(AppRoutingPaths.REPORTES) ? "#FFFFFF" : "#9CA3AF",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#FFFFFF",
                },
              }}
            >
              <BarChartOutlinedIcon sx={{ fontSize: isCollapsed ? 20 : 18 }} />
              {!isCollapsed && (
                <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 500 }}>
                  Reportes
                </Typography>
              )}
            </Box>
          </Tooltip>
        </Stack>

        {/* ================= GRUPO: ACADÉMICO ================= */}
        {isCollapsed ? (
          <Box sx={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", my: 1.5, mx: 0.5 }} />
        ) : (
          <Typography
            variant="caption"
            sx={{
              color: "#6B7280",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "1.2px",
              px: 1.8,
              mb: 0.8,
              display: "block",
            }}
          >
            ACADÉMICO
          </Typography>
        )}

        <Stack spacing={0.4} sx={{ mb: 1 }}>
          <Tooltip title={isCollapsed ? "Académico" : ""} placement="right">
            <Box
              onClick={() => (isCollapsed ? navigate(AppRoutingPaths.PERIODOS) : setAcademicoOpen(!academicoOpen))}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "space-between",
                px: isCollapsed ? 0 : 1.8,
                py: isCollapsed ? 1 : 0.8,
                borderRadius: "8px",
                cursor: "pointer",
                color: "#D1D5DB",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#FFFFFF",
                },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <SchoolOutlinedIcon sx={{ fontSize: isCollapsed ? 20 : 18 }} />
                {!isCollapsed && (
                  <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    Académico
                  </Typography>
                )}
              </Stack>
              {!isCollapsed &&
                (academicoOpen ? (
                  <ExpandLessIcon sx={{ fontSize: 16, color: "#6B7280" }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: 16, color: "#6B7280" }} />
                ))}
            </Box>
          </Tooltip>

          {/* Sub-elementos cuando no está colapsado */}
          {!isCollapsed && (
            <Collapse in={academicoOpen} timeout="auto">
              <Stack spacing={0.3} sx={{ pl: 4, pt: 0.4 }}>
                <Typography
                  variant="body2"
                  onClick={() => navigate(AppRoutingPaths.PERIODOS)}
                  sx={{
                    fontSize: "0.78rem",
                    py: 0.5,
                    cursor: "pointer",
                    color: isActive(AppRoutingPaths.PERIODOS) ? "#FFFFFF" : "#9CA3AF",
                    fontWeight: isActive(AppRoutingPaths.PERIODOS) ? 700 : 400,
                    "&:hover": { color: "#FFFFFF" },
                  }}
                >
                  Periodos de inscripción
                </Typography>

                <Typography
                  variant="body2"
                  onClick={() => navigate(AppRoutingPaths.VIGENCIAS)}
                  sx={{
                    fontSize: "0.78rem",
                    py: 0.5,
                    cursor: "pointer",
                    color: isActive(AppRoutingPaths.VIGENCIAS) || isActive(AppRoutingPaths.GRUPOS) ? "#FFFFFF" : "#9CA3AF",
                    fontWeight: isActive(AppRoutingPaths.VIGENCIAS) ? 700 : 400,
                    "&:hover": { color: "#FFFFFF" },
                  }}
                >
                  Grupos y vigencias
                </Typography>

                <Typography
                  variant="body2"
                  onClick={() => navigate(AppRoutingPaths.CURSOS)}
                  sx={{
                    fontSize: "0.78rem",
                    py: 0.5,
                    cursor: "pointer",
                    color: isActive(AppRoutingPaths.CURSOS) ? "#FFFFFF" : "#9CA3AF",
                    fontWeight: isActive(AppRoutingPaths.CURSOS) ? 700 : 400,
                    "&:hover": { color: "#FFFFFF" },
                  }}
                >
                  Cursos
                </Typography>
              </Stack>
            </Collapse>
          )}
        </Stack>

        {/* ================= OTROS GRUPOS ================= */}
        {isCollapsed && <Box sx={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", my: 1.5, mx: 0.5 }} />}

        {/* Gestión Escolar */}
        <Tooltip title={isCollapsed ? "Gestión Escolar" : ""} placement="right">
          <Box
            onClick={() => navigate(AppRoutingPaths.GRUPOS)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed ? "center" : "flex-start",
              gap: 1.5,
              px: isCollapsed ? 0 : 1.8,
              py: isCollapsed ? 1 : 0.8,
              borderRadius: "8px",
              cursor: "pointer",
              color: "#9CA3AF",
              mb: 0.8,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                color: "#FFFFFF",
              },
            }}
          >
            <GroupOutlinedIcon sx={{ fontSize: isCollapsed ? 20 : 18 }} />
            {!isCollapsed && (
              <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 500 }}>
                Gestión Escolar
              </Typography>
            )}
          </Box>
        </Tooltip>

        {/* Usuarios */}
        <Tooltip title={isCollapsed ? "Usuarios" : ""} placement="right">
          <Box
            onClick={() => navigate(AppRoutingPaths.CONSULTA)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed ? "center" : "flex-start",
              gap: 1.5,
              px: isCollapsed ? 0 : 1.8,
              py: isCollapsed ? 1 : 0.8,
              borderRadius: "8px",
              cursor: "pointer",
              color: "#9CA3AF",
              mb: 1.5,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                color: "#FFFFFF",
              },
            }}
          >
            <PeopleOutlineIcon sx={{ fontSize: isCollapsed ? 20 : 18 }} />
            {!isCollapsed && (
              <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 500 }}>
                Usuarios
              </Typography>
            )}
          </Box>
        </Tooltip>

        {/* INSUMOS */}
        {!isCollapsed && (
          <Typography
            variant="caption"
            sx={{
              color: "#6B7280",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "1.2px",
              px: 1.8,
              mb: 0.8,
              display: "block",
            }}
          >
            INSUMOS
          </Typography>
        )}

        <Tooltip title={isCollapsed ? "Campus Digital" : ""} placement="right">
          <Box
            onClick={() => navigate(AppRoutingPaths.HOME)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed ? "center" : "flex-start",
              gap: 1.5,
              px: isCollapsed ? 0 : 1.8,
              py: isCollapsed ? 1 : 0.8,
              borderRadius: "8px",
              cursor: "pointer",
              color: "#9CA3AF",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                color: "#FFFFFF",
              },
            }}
          >
            <ComputerOutlinedIcon sx={{ fontSize: isCollapsed ? 20 : 18 }} />
            {!isCollapsed && (
              <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 500 }}>
                Campus Digital
              </Typography>
            )}
          </Box>
        </Tooltip>
      </Box>

      {/* SECCIÓN INFERIOR: USER SESSION FOOTER */}
      <Box
        sx={{
          pt: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
        }}
      >
        {isCollapsed ? (
          <Tooltip title="Ana Belén Ávila - Cerrar sesión" placement="right">
            <Avatar
              onClick={() => navigate(AppRoutingPaths.LOGIN)}
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              AA
            </Avatar>
          </Tooltip>
        ) : (
          <>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ overflow: "hidden" }}>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#2563EB",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                }}
              >
                AA
              </Avatar>
              <Box sx={{ overflow: "hidden" }}>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.8rem", lineHeight: 1.2 }}
                >
                  Cerrar sesión
                </Typography>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{ color: "#9CA3AF", fontSize: "0.7rem", display: "block" }}
                >
                  Ana Belén Ávila
                </Typography>
              </Box>
            </Stack>

            <IconButton
              size="small"
              onClick={() => navigate(AppRoutingPaths.LOGIN)}
              sx={{
                color: "#9CA3AF",
                "&:hover": { color: "#FFFFFF", backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <LogoutOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default GlobalSidenav;
