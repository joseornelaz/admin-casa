import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AppRoutingPaths } from "@constants";

export interface ProgramaAcademico {
  id: string;
  nombre: string;
  generacion: string;
  alumnosCount: number;
  esReciente?: boolean;
  estado: "activa" | "futura" | "finalizada";
}

export interface Organizacion {
  id: string;
  nombre: string;
  badgeText: string;
  badgeBgColor: string;
  badgeTextColor: string;
  programasCount: number;
  alumnosCount: number;
  programas: ProgramaAcademico[];
}

const ORGANIZACIONES_MOCK: Organizacion[] = [
  {
    id: "ag-college",
    nombre: "AG College",
    badgeText: "AG",
    badgeBgColor: "#111827",
    badgeTextColor: "#FFFFFF",
    programasCount: 4,
    alumnosCount: 1247,
    programas: [
      {
        id: "ing-soft",
        nombre: "Ingeniería en Desarrollo de Software",
        generacion: "Gen 2024-A",
        alumnosCount: 48,
        esReciente: true,
        estado: "activa",
      },
      {
        id: "dip-admin",
        nombre: "Diplomado en Administración",
        generacion: "Gen 2024-A",
        alumnosCount: 32,
        estado: "activa",
      },
      {
        id: "dip-ia",
        nombre: "Diplomado en Inteligencia Artificial",
        generacion: "Gen 2024-B",
        alumnosCount: 28,
        estado: "activa",
      },
      {
        id: "prep",
        nombre: "Preparatoria",
        generacion: "Gen 2025-A",
        alumnosCount: 18,
        estado: "futura",
      },
    ],
  },
  {
    id: "coppel-univ",
    nombre: "Coppel Universidad",
    badgeText: "CU",
    badgeBgColor: "#2563EB",
    badgeTextColor: "#FFFFFF",
    programasCount: 2,
    alumnosCount: 834,
    programas: [
      {
        id: "lic-gest",
        nombre: "Licenciatura en Gestión de Negocios",
        generacion: "Gen 2024-A",
        alumnosCount: 450,
        estado: "activa",
      },
      {
        id: "ing-ind",
        nombre: "Ingeniería Industrial y de Sistemas",
        generacion: "Gen 2024-B",
        alumnosCount: 384,
        estado: "activa",
      },
    ],
  },
  {
    id: "umi",
    nombre: "UMi",
    badgeText: "UMi",
    badgeBgColor: "#7C3AED",
    badgeTextColor: "#FFFFFF",
    programasCount: 3,
    alumnosCount: 267,
    programas: [
      {
        id: "mae-inn",
        nombre: "Maestría en Innovación Educativa",
        generacion: "Gen 2024-A",
        alumnosCount: 120,
        estado: "activa",
      },
      {
        id: "dip-lid",
        nombre: "Diplomado en Liderazgo",
        generacion: "Gen 2024-B",
        alumnosCount: 85,
        estado: "activa",
      },
      {
        id: "cur-trans",
        nombre: "Curso de Transformación Digital",
        generacion: "Gen 2025-A",
        alumnosCount: 62,
        estado: "futura",
      },
    ],
  },
];

interface OrgBadgeProps {
  text: string;
  bgColor: string;
  textColor: string;
  size?: "small" | "medium" | "large";
}

const OrgBadge: React.FC<OrgBadgeProps> = ({ text, bgColor, textColor, size = "medium" }) => {
  const dimensions =
    size === "small"
      ? { minWidth: 26, height: 26, fontSize: "0.7rem", px: "6px", borderRadius: "6px" }
      : size === "medium"
      ? { minWidth: 32, height: 32, fontSize: "0.78rem", px: "8px", borderRadius: "8px" }
      : { minWidth: 38, height: 38, fontSize: "0.85rem", px: "10px", borderRadius: "8px" };

  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        fontWeight: 800,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        boxSizing: "border-box",
        userSelect: "none",
        flexShrink: 0,
        letterSpacing: text.length > 2 ? "-0.5px" : "0px",
        fontFamily: "inherit",
        ...dimensions,
      }}
    >
      {text}
    </Box>
  );
};

export const SeleccionEspacio: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"tabs" | "list">("tabs");
  const [selectedOrgId, setSelectedOrgId] = useState<string>("ag-college");
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>("ing-soft");
  const [expandedOrgId, setExpandedOrgId] = useState<string | false>("ag-college");

  const selectedOrg = ORGANIZACIONES_MOCK.find((o) => o.id === selectedOrgId) || ORGANIZACIONES_MOCK[0];

  const handleSelectProgram = (orgId: string, programId: string) => {
    setSelectedOrgId(orgId);
    setSelectedProgramId(programId);
  };

  const handleIngresar = () => {
    if (!selectedProgramId) return;
    const programObj = selectedOrg.programas.find((p) => p.id === selectedProgramId);
    localStorage.setItem("selectedOrganization", JSON.stringify(selectedOrg));
    localStorage.setItem("selectedProgram", JSON.stringify(programObj));
    navigate(AppRoutingPaths.HOME);
  };

  const handleAccordionChange = (orgId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedOrgId(isExpanded ? orgId : false);
    setSelectedOrgId(orgId);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F9FAFB",
        overflow: "hidden",
      }}
    >
      {/* SECCIÓN IZQUIERDA: PANEL OSCURO (PERFIL & MODO DE VISTA) */}
      <Box
        sx={{
          width: { xs: "100%", md: "380px", lg: "430px" },
          backgroundColor: "#121316",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          px: { xs: 3, sm: 5 },
          py: 4,
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        {/* Top Header: Rol de usuario / Identificador */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            variant="rounded"
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "#1F2937",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.875rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            A
          </Avatar>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.95rem" }}>
            Administrador Global
          </Typography>
        </Stack>

        {/* Agrupador Central: Bienvenida y Selector de Vista */}
        <Box sx={{ my: "auto" }}>
          <Typography
            variant="caption"
            sx={{
              letterSpacing: "2px",
              fontWeight: 700,
              color: "#6B7280",
              textTransform: "uppercase",
              fontSize: "0.7rem",
              display: "block",
              mb: 1.5,
            }}
          >
            BIENVENIDO
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.2,
              mb: 1.5,
              fontSize: { xs: "1.75rem", md: "2.2rem" },
            }}
          >
            Selecciona tu espacio de trabajo
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#9CA3AF",
              lineHeight: 1.6,
              mb: 4,
              fontSize: "0.875rem",
              maxWidth: "340px",
            }}
          >
            Elige la organización y el programa académico en los que trabajarás durante esta sesión.
          </Typography>

          {/* Toggle de Vista: Tabs / Lista */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" sx={{ color: "#9CA3AF", fontSize: "0.8rem", mr: 0.5 }}>
              Vista
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                borderRadius: "10px",
                p: "3px",
              }}
            >
              <Button
                onClick={() => setViewMode("tabs")}
                startIcon={<GridViewIcon sx={{ fontSize: 16 }} />}
                sx={{
                  backgroundColor: viewMode === "tabs" ? "#FFFFFF" : "transparent",
                  color: viewMode === "tabs" ? "#111827" : "#9CA3AF",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  borderRadius: "8px",
                  px: 1.8,
                  py: 0.5,
                  minWidth: "auto",
                  boxShadow: viewMode === "tabs" ? "0px 2px 4px rgba(0,0,0,0.15)" : "none",
                  "&:hover": {
                    backgroundColor: viewMode === "tabs" ? "#FFFFFF" : "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Tabs
              </Button>

              <Button
                onClick={() => setViewMode("list")}
                startIcon={<FormatListBulletedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  backgroundColor: viewMode === "list" ? "#FFFFFF" : "transparent",
                  color: viewMode === "list" ? "#111827" : "#9CA3AF",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  borderRadius: "8px",
                  px: 1.8,
                  py: 0.5,
                  minWidth: "auto",
                  boxShadow: viewMode === "list" ? "0px 2px 4px rgba(0,0,0,0.15)" : "none",
                  "&:hover": {
                    backgroundColor: viewMode === "list" ? "#FFFFFF" : "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Lista
              </Button>
            </Box>
          </Stack>
        </Box>

        {/* Footer info */}
        <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.75rem" }}>
          Podrás cambiar de espacio en cualquier momento
        </Typography>
      </Box>

      {/* SECCIÓN DERECHA: SELECCIÓN DE ORGANIZACIÓN & PROGRAMAS */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 4, md: 6 },
          py: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {viewMode === "tabs" ? (
            /* ================= VISTA TABS ================= */
            <>
              {/* Tabs de Organizaciones */}
              <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ mb: 1 }}>
                {ORGANIZACIONES_MOCK.map((org) => {
                  const isActive = selectedOrgId === org.id;
                  return (
                    <Button
                      key={org.id}
                      onClick={() => {
                        setSelectedOrgId(org.id);
                        const firstProg = org.programas[0]?.id || null;
                        setSelectedProgramId(firstProg);
                      }}
                      startIcon={
                        <OrgBadge
                          text={org.badgeText}
                          bgColor={org.badgeBgColor}
                          textColor={org.badgeTextColor}
                          size="small"
                        />
                      }
                      sx={{
                        backgroundColor: isActive ? "#FFFFFF" : "#F3F4F6",
                        color: isActive ? "#111827" : "#6B7280",
                        border: isActive ? "1px solid #E5E7EB" : "1px solid transparent",
                        boxShadow: isActive ? "0px 2px 6px rgba(0, 0, 0, 0.06)" : "none",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        px: 2,
                        py: 1,
                        "&:hover": {
                          backgroundColor: isActive ? "#FFFFFF" : "#E5E7EB",
                        },
                      }}
                    >
                      {org.nombre}
                    </Button>
                  );
                })}
              </Stack>

              <Typography
                variant="caption"
                sx={{
                  letterSpacing: "1px",
                  fontWeight: 700,
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                }}
              >
                PROGRAMAS
              </Typography>

              {/* Tarjeta de Contenedor de Programas */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
                  overflow: "hidden",
                }}
              >
                {/* Header de la Organización Seleccionada */}
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid #F3F4F6",
                  }}
                >
                  <OrgBadge
                    text={selectedOrg.badgeText}
                    bgColor={selectedOrg.badgeBgColor}
                    textColor={selectedOrg.badgeTextColor}
                    size="medium"
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>
                      {selectedOrg.nombre}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                      {selectedOrg.programasCount} programas · {selectedOrg.alumnosCount.toLocaleString()} alumnos
                    </Typography>
                  </Box>
                </Stack>

                {/* Lista de Radio Buttons de Programas */}
                <Box>
                  {selectedOrg.programas.map((prog, index) => {
                    const isSelected = selectedProgramId === prog.id;
                    return (
                      <Box
                        key={prog.id}
                        onClick={() => handleSelectProgram(selectedOrg.id, prog.id)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          px: 2.5,
                          py: 1.8,
                          cursor: "pointer",
                          backgroundColor: isSelected ? "#F9FAFB" : "transparent",
                          borderBottom:
                            index < selectedOrg.programas.length - 1 ? "1px solid #F3F4F6" : "none",
                          transition: "background-color 0.15s ease",
                          "&:hover": {
                            backgroundColor: "#F9FAFB",
                          },
                        }}
                      >
                        <Radio
                          checked={isSelected}
                          onChange={() => handleSelectProgram(selectedOrg.id, prog.id)}
                          size="small"
                          sx={{
                            color: "#D1D5DB",
                            "&.Mui-checked": {
                              color: "#111827",
                            },
                            mr: 1,
                          }}
                        />

                        <Box sx={{ flex: 1 }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: isSelected ? 700 : 600,
                                color: "#111827",
                                fontSize: "0.875rem",
                              }}
                            >
                              {prog.nombre}
                            </Typography>
                            {prog.esReciente && (
                              <Chip
                                label="reciente"
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: "0.65rem",
                                  fontWeight: 600,
                                  backgroundColor: "#F3F4F6",
                                  color: "#6B7280",
                                  borderRadius: "4px",
                                }}
                              />
                            )}
                          </Stack>

                          <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                            {prog.generacion} {prog.estado} · {prog.alumnosCount} alumnos
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </>
          ) : (
            /* ================= VISTA LISTA (ACCORDIONS) ================= */
            <>
              <Typography
                variant="caption"
                sx={{
                  letterSpacing: "1px",
                  fontWeight: 700,
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                }}
              >
                ORGANIZACIONES
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
                  overflow: "hidden",
                }}
              >
                {ORGANIZACIONES_MOCK.map((org, index) => {
                  const isExpanded = expandedOrgId === org.id;

                  return (
                    <Accordion
                      key={org.id}
                      expanded={isExpanded}
                      onChange={handleAccordionChange(org.id)}
                      disableGutters
                      elevation={0}
                      sx={{
                        backgroundColor: "transparent",
                        borderRadius: "0 !important",
                        border: "none",
                        borderBottom:
                          index < ORGANIZACIONES_MOCK.length - 1 ? "1px solid #E5E7EB" : "none",
                        overflow: "hidden",
                        "&:before": { display: "none" },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#9CA3AF" }} />}
                        sx={{
                          px: 3,
                          py: 1,
                          "& .MuiAccordionSummary-content": {
                            my: 1,
                          },
                        }}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <OrgBadge
                            text={org.badgeText}
                            bgColor={org.badgeBgColor}
                            textColor={org.badgeTextColor}
                            size="medium"
                          />
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>
                              {org.nombre}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                              {org.programasCount} programas · {org.alumnosCount.toLocaleString()} alumnos
                            </Typography>
                          </Box>
                        </Stack>
                      </AccordionSummary>

                      <AccordionDetails sx={{ p: 0, borderTop: "1px solid #F3F4F6" }}>
                        {org.programas.map((prog, idx) => {
                          const isSelected = selectedOrgId === org.id && selectedProgramId === prog.id;

                          return (
                            <Box
                              key={prog.id}
                              onClick={() => handleSelectProgram(org.id, prog.id)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                px: 3,
                                py: 1.8,
                                cursor: "pointer",
                                backgroundColor: isSelected ? "#F9FAFB" : "transparent",
                                borderBottom:
                                  idx < org.programas.length - 1 ? "1px solid #F3F4F6" : "none",
                                "&:hover": {
                                  backgroundColor: "#F9FAFB",
                                },
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: isSelected ? 700 : 600,
                                    color: "#111827",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {prog.nombre}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                                  {prog.generacion} {prog.estado} · {prog.alumnosCount} alumnos
                                </Typography>
                              </Box>

                              <ChevronRightIcon sx={{ color: "#D1D5DB", fontSize: 18 }} />
                            </Box>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Box>

              <Typography
                variant="caption"
                sx={{
                  color: "#9CA3AF",
                  textAlign: "center",
                  display: "block",
                  mt: 1,
                  fontSize: "0.75rem",
                }}
              >
                Selecciona la organización en la que deseas trabajar.
              </Typography>
            </>
          )}

          {/* Botón de Acción Principal: Ingresar al sistema */}
          <Button
            fullWidth
            variant="contained"
            disabled={!selectedProgramId}
            onClick={handleIngresar}
            sx={{
              backgroundColor: selectedProgramId ? "#111827" : "#D1D5DB",
              color: selectedProgramId ? "#FFFFFF" : "#9CA3AF",
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 700,
              py: 1.6,
              mt: 2,
              fontSize: "0.9rem",
              boxShadow: selectedProgramId ? "0px 4px 12px rgba(17, 24, 39, 0.2)" : "none",
              "&:hover": {
                backgroundColor: selectedProgramId ? "#1F2937" : "#D1D5DB",
              },
              "&:disabled": {
                backgroundColor: "#D1D5DB",
                color: "#9CA3AF",
              },
            }}
          >
            Ingresar al sistema
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SeleccionEspacio;
