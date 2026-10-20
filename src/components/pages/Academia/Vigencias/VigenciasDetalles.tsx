import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Drawer,
  AvatarGroup,
  Avatar
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useNavigate, useParams } from "react-router-dom";

import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { EditarVigenciasDialog } from "../../../molecules/Dialogs/EditarVigenciasDialog";
import { RegistroGruposDialog } from "../../../molecules/Dialogs/RegistroGruposDialog/RegistroGruposDialog";
import { GrupoEdit } from "../Grupos/GrupoEdit";
import { AppRoutingPaths } from "@constants";

interface GrupoItemData {
  id: number;
  idCode: string;
  colorVariant: "amber" | "blue" | "sky";
  nombre: string;
  institution: string;
  program: string;
  tutor: string;
  alumnosCount: number;
  tipoGrupo: string;
  estatus: string;
  initials: string[];
}

const mockGruposData: GrupoItemData[] = [
  {
    id: 1,
    idCode: "GRUPO-0001",
    colorVariant: "amber",
    nombre: "Diseño de Interfaces I GRUPO A",
    institution: "Coppel",
    program: "Prepa Coppel",
    tutor: "Fátima Fernández de Lara ...",
    alumnosCount: 28,
    tipoGrupo: "NORMAL",
    estatus: "ACTIVO",
    initials: ["CL", "MV", "RE"],
  },
  {
    id: 2,
    idCode: "GRUPO-0002",
    colorVariant: "blue",
    nombre: "Diseño de Interfaces I GRUPO B",
    institution: "AG College",
    program: "Prepa Coppel",
    tutor: "Fátima Fernández de Lara ...",
    alumnosCount: 32,
    tipoGrupo: "NORMAL",
    estatus: "ACTIVO",
    initials: ["IN", "AR", "LR"],
  },
  {
    id: 3,
    idCode: "GRUPO-0003",
    colorVariant: "sky",
    nombre: "Diseño de Interfaces I GRUPO C",
    institution: "AG College",
    program: "Prepa Coppel",
    tutor: "Fátima Fernández de Lara ...",
    alumnosCount: 24,
    tipoGrupo: "NORMAL",
    estatus: "ACTIVO",
    initials: ["LM", "CM", "EV"],
  },
];

const VigenciasDetalles: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isOpenEditVigencia, setIsOpenEditVigencia] = useState(false);
  const [isOpenCrearGrupo, setIsOpenCrearGrupo] = useState(false);
  const [isOpenDrawerGrupo, setIsOpenDrawerGrupo] = useState(false);
  const [, setSelectedGrupo] = useState<GrupoItemData | null>(null);

  const [activeFilters, setActiveFilters] = useState<string[]>(["Coppel"]);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setFilterMenuAnchor(null);
  };

  const handleRemoveFilter = (filterName: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filterName));
  };

  const handleOpenGrupoEdit = (grupo: GrupoItemData) => {
    setSelectedGrupo(grupo);
    setIsOpenDrawerGrupo(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Breadcrumb Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, fontSize: "13px" }}>
        <Typography
          onClick={() => navigate(AppRoutingPaths.HOME)}
          sx={{ color: "#6B7280", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        >
          Inicio
        </Typography>
        <Typography sx={{ color: "#9CA3AF" }}>&gt;</Typography>
        <Typography sx={{ color: "#6B7280" }}>Académico</Typography>
        <Typography sx={{ color: "#9CA3AF" }}>&gt;</Typography>
        <Typography
          onClick={() => navigate(AppRoutingPaths.VIGENCIAS)}
          sx={{ color: "#6B7280", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        >
          Vigencias
        </Typography>
        <Typography sx={{ color: "#9CA3AF" }}>&gt;</Typography>
        <Typography sx={{ color: "#D97706", fontWeight: 600 }}>Detalles de la Vigencia</Typography>
      </Box>

      {/* Page Title Header */}
      <TitleHeader
        text="Detalles de la Vigencia"
        subTitle="Monitorea y gestiona fechas límite, grupos y alumnos por materia"
      />

      {/* CARD 1: Main Vigencia Details Header Card */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          p: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Top Bar: Code Tag + Status Badges + Edit Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                backgroundColor: "#FEF3C7",
                color: "#D97706",
                border: "1px solid #FCD34D",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                px: 1.25,
                py: 0.35,
                borderRadius: "6px",
              }}
            >
              VIGENCIA-0001
            </Box>

            <Box
              sx={{
                backgroundColor: "#F3F4F6",
                color: "#4B5563",
                fontSize: "11px",
                fontWeight: 600,
                px: 1,
                py: 0.35,
                borderRadius: "4px",
                letterSpacing: "0.5px",
              }}
            >
              NORMAL
            </Box>

            <Box
              sx={{
                backgroundColor: "#F0FDF4",
                color: "#16A34A",
                fontSize: "11px",
                fontWeight: 700,
                px: 1.25,
                py: 0.35,
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#16A34A",
                }}
              />
              ACTIVA
            </Box>
          </Box>

          <IconButton
            onClick={() => setIsOpenEditVigencia(true)}
            sx={{
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              width: 36,
              height: 36,
              color: "#374151",
              "&:hover": {
                borderColor: "#9CA3AF",
                backgroundColor: "#F9FAFB",
              },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "#111827",
            lineHeight: 1.3,
          }}
        >
          Diseño de Interfaces I IDS COPPEL C2 – Sep 25
        </Typography>

        {/* Subtitle / Institution line */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <Typography
            sx={{
              color: "#D97706",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Coppel
          </Typography>
          <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>·</Typography>
          <Typography sx={{ color: "#6B7280", fontSize: "13px" }}>Prepa Coppel</Typography>
          <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>·</Typography>
          <Typography sx={{ color: "#6B7280", fontSize: "13px" }}>Coppel 2022</Typography>
        </Box>

        {/* Meta Line: Author, Assigned Groups, Creation Date */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", my: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#6B7280" }}>
            <PersonOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>Cecilia Fornari</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#6B7280" }}>
            <OutlinedFlagIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>3 grupos asignados</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#6B7280" }}>
            <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>
              Creación: 26 sep 2025
            </Typography>
          </Box>
        </Box>

        {/* Dates 4-Column Row with Vertical Dividers */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pt: 2,
            mt: 1,
            borderTop: "1px solid #E5E7EB",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: { xs: 2, md: 0 },
          }}
        >
          {/* Column 1 */}
          <Box sx={{ flex: 1, pr: { md: 2.5 } }}>
            <Typography sx={{ fontSize: "12px", color: "#6B7280", fontWeight: 500, mb: 0.5 }}>
              Fecha inicio de Asesor
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: "#6B7280" }} />
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
                24/Septiembre/2025
              </Typography>
            </Box>
          </Box>

          {/* Column 2 */}
          <Box
            sx={{
              flex: 1,
              px: { md: 2.5 },
              borderLeft: { md: "1px solid #E5E7EB" },
            }}
          >
            <Typography sx={{ fontSize: "12px", color: "#6B7280", fontWeight: 500, mb: 0.5 }}>
              Fecha Límite de carga
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: "#6B7280" }} />
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
                24/Septiembre/2025
              </Typography>
            </Box>
          </Box>

          {/* Column 3 */}
          <Box
            sx={{
              flex: 1,
              px: { md: 2.5 },
              borderLeft: { md: "1px solid #E5E7EB" },
            }}
          >
            <Typography sx={{ fontSize: "12px", color: "#6B7280", fontWeight: 500, mb: 0.5 }}>
              Fecha Inicio del Estudiante
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: "#6B7280" }} />
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
                24/Septiembre/2025
              </Typography>
            </Box>
          </Box>

          {/* Column 4 */}
          <Box
            sx={{
              flex: 1,
              pl: { md: 2.5 },
              borderLeft: { md: "1px solid #E5E7EB" },
            }}
          >
            <Typography sx={{ fontSize: "12px", color: "#6B7280", fontWeight: 500, mb: 0.5 }}>
              Fecha Fin del curso
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: "#6B7280" }} />
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
                24/Septiembre/2025
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* CARD 2: "Estado de la Vigencia" (Metric Cards Section) */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          p: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
          <ShowChartOutlinedIcon sx={{ fontSize: 18, color: "#374151", mt: "3px" }} />
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#111827", lineHeight: 1.2 }}>
              Estado de la Vigencia
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#6B7280", mt: 0.25 }}>
              Resumen de la vigencia y su contenido.
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* Metric 1 */}
          <Grid size={{xs:12, sm:4}}>
            <Box
              sx={{
                height: "100%",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                p: "20px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#EFF6FF",
                  borderRadius: "8px",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OutlinedFlagIcon sx={{ fontSize: 18, color: "#2563EB" }} />
              </Box>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6B7280",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  mt: 0.5,
                }}
              >
                GRUPOS ACTIVOS
              </Typography>
              <Typography sx={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                3
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
                en los últimos 2 meses
              </Typography>
            </Box>
          </Grid>

          {/* Metric 2 */}
          <Grid size={{xs:12, sm:4}}>
            <Box
              sx={{
                height: "100%",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                p: "20px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#EFF6FF",
                  borderRadius: "8px",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersonOutlinedIcon sx={{ fontSize: 18, color: "#2563EB" }} />
              </Box>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6B7280",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  mt: 0.5,
                }}
              >
                ESTUDIANTES
              </Typography>
              <Typography sx={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                345
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
                Activos
              </Typography>
            </Box>
          </Grid>

          {/* Metric 3 */}
          <Grid size={{xs:12, sm:4}}>
            <Box
              sx={{
                height: "100%",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                p: "20px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#EFF6FF",
                  borderRadius: "8px",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShowChartOutlinedIcon sx={{ fontSize: 18, color: "#2563EB" }} />
              </Box>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6B7280",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  mt: 0.5,
                }}
              >
                CALIFICACIÓN
              </Typography>
              <Typography sx={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                8.6
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
                Promedio general
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* CARD 3: "Grupos (3)" Section */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          p: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Header Row: Title + Crear Grupo Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FolderOutlinedIcon sx={{ fontSize: 20, color: "#374151" }} />
            <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#111827" }}>
              Grupos ({mockGruposData.length})
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => setIsOpenCrearGrupo(true)}
            startIcon={<AddOutlinedIcon />}
            sx={{
              backgroundColor: "#18181B",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "13px",
              px: 2,
              py: 0.75,
              "&:hover": {
                backgroundColor: "#27272A",
              },
            }}
          >
            Crear Grupo
          </Button>
        </Box>

        {/* Filter Chips Row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {activeFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onDelete={() => handleRemoveFilter(filter)}
              deleteIcon={<CloseIcon sx={{ fontSize: "14px !important", color: "#FFFFFF !important" }} />}
              sx={{
                backgroundColor: "#18181B",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "12px",
                height: "32px",
                borderRadius: "20px",
                px: 0.5,
              }}
            />
          ))}

          <Button
            onClick={handleOpenFilterMenu}
            endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
            sx={{
              backgroundColor: "#F3F4F6",
              color: "#374151",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "12px",
              borderRadius: "20px",
              px: 1.5,
              py: 0.4,
              height: "32px",
              border: "1px solid #E5E7EB",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            Normal
          </Button>

          <Button
            onClick={handleOpenFilterMenu}
            endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
            sx={{
              backgroundColor: "#F3F4F6",
              color: "#374151",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "12px",
              borderRadius: "20px",
              px: 1.5,
              py: 0.4,
              height: "32px",
              border: "1px solid #E5E7EB",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            Habilitados
          </Button>

          <Button
            onClick={handleOpenFilterMenu}
            endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
            sx={{
              backgroundColor: "#F3F4F6",
              color: "#374151",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "12px",
              borderRadius: "20px",
              px: 1.5,
              py: 0.4,
              height: "32px",
              border: "1px solid #E5E7EB",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            Activos
          </Button>

          <Menu
            anchorEl={filterMenuAnchor}
            open={Boolean(filterMenuAnchor)}
            onClose={handleCloseFilterMenu}
            PaperProps={{
              sx: { borderRadius: "8px", mt: 0.5, minWidth: 130 },
            }}
          >
            <MenuItem onClick={handleCloseFilterMenu} sx={{ fontSize: "13px" }}>
              Todos
            </MenuItem>
            <MenuItem onClick={handleCloseFilterMenu} sx={{ fontSize: "13px" }}>
              Normal
            </MenuItem>
            <MenuItem onClick={handleCloseFilterMenu} sx={{ fontSize: "13px" }}>
              Prueba
            </MenuItem>
          </Menu>
        </Box>

        {/* Group Cards List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", mt: 1 }}>
          {mockGruposData.map((grupo) => {
            const isAmber = grupo.colorVariant === "amber";
            const isBlue = grupo.colorVariant === "blue";
            const tagBg = isAmber ? "#FEF3C7" : isBlue ? "#EFF6FF" : "#E0F2FE";
            const tagColor = isAmber ? "#D97706" : isBlue ? "#2563EB" : "#0284C7";
            const tagBorder = isAmber ? "#FCD34D" : isBlue ? "#BFDBFE" : "#7DD3FC";

            return (
              <Box
                key={grupo.id}
                sx={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  p: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  transition: "box-shadow 0.2s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                {/* Top Row: Code Tag + Status Badges */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box
                    sx={{
                      backgroundColor: tagBg,
                      color: tagColor,
                      border: `1px solid ${tagBorder}`,
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      px: 1.25,
                      py: 0.35,
                      borderRadius: "6px",
                    }}
                  >
                    {grupo.idCode}
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        backgroundColor: "#F3F4F6",
                        color: "#4B5563",
                        fontSize: "11px",
                        fontWeight: 600,
                        px: 1,
                        py: 0.35,
                        borderRadius: "4px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {grupo.tipoGrupo}
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#F0FDF4",
                        color: "#16A34A",
                        fontSize: "11px",
                        fontWeight: 700,
                        px: 1.25,
                        py: 0.35,
                        borderRadius: "9999px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "#16A34A",
                        }}
                      />
                      {grupo.estatus}
                    </Box>
                  </Box>
                </Box>

                {/* Group Title */}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#111827",
                    lineHeight: 1.3,
                  }}
                >
                  {grupo.nombre}
                </Typography>

                {/* Institution / Program / Tutor Subtitle */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                  <Typography
                    sx={{
                      color: isAmber ? "#D97706" : "#2563EB",
                      fontWeight: 600,
                      fontSize: "13px",
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {grupo.institution}
                  </Typography>
                  <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>·</Typography>
                  <Typography sx={{ color: "#6B7280", fontSize: "13px" }}>{grupo.program}</Typography>
                  <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>·</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#6B7280", fontSize: "13px" }}>
                    <PersonOutlinedIcon sx={{ fontSize: 15 }} />
                    <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>{grupo.tutor}</Typography>
                  </Box>
                </Box>

                {/* Bottom Row: Stacked Avatars + "Ver detalle >" */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    pt: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AvatarGroup
                      max={4}
                      sx={{
                        "& .MuiAvatar-root": {
                          width: 26,
                          height: 26,
                          fontSize: "11px",
                          fontWeight: 700,
                          border: "2px solid #FFFFFF",
                        },
                      }}
                    >
                      <Avatar sx={{ bgcolor: "#3B82F6", color: "#FFFFFF" }}>{grupo.initials[0]}</Avatar>
                      <Avatar sx={{ bgcolor: "#EC4899", color: "#FFFFFF" }}>{grupo.initials[1]}</Avatar>
                      <Avatar sx={{ bgcolor: "#F59E0B", color: "#FFFFFF" }}>{grupo.initials[2]}</Avatar>
                      <Avatar sx={{ bgcolor: "#8B5CF6", color: "#FFFFFF" }}>
                        +{grupo.alumnosCount - 3}
                      </Avatar>
                    </AvatarGroup>
                    <Typography sx={{ color: "#6B7280", fontSize: "13px", fontWeight: 500 }}>
                      {grupo.alumnosCount} alumnos
                    </Typography>
                  </Box>

                  <Typography
                    onClick={() => handleOpenGrupoEdit(grupo)}
                    sx={{
                      color: "#2563EB",
                      fontWeight: 600,
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Ver detalle
                    <ChevronRightOutlinedIcon sx={{ fontSize: 18 }} />
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Edit Vigencia Dialog */}
      <EditarVigenciasDialog
        isOpen={isOpenEditVigencia}
        idVigencia={id ? Number(id) : undefined}
        close={() => setIsOpenEditVigencia(false)}
      />

      {/* Create Group Dialog */}
      <RegistroGruposDialog
        isOpen={isOpenCrearGrupo}
        close={() => setIsOpenCrearGrupo(false)}
      />

      {/* Group Detail Sidenav Drawer */}
      <Drawer
        anchor="right"
        open={isOpenDrawerGrupo}
        onClose={() => setIsOpenDrawerGrupo(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "730px",
            p: 3,
          },
        }}
      >
        <GrupoEdit closeDrawer={() => setIsOpenDrawerGrupo(false)} />
      </Drawer>
    </Box>
  );
};

export default VigenciasDetalles;