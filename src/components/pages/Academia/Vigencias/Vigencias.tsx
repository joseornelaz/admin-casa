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
  useTheme
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { Search } from "../../../molecules/Search/Search";
import { EmptyState } from "../../../molecules/EmptyState/EmptyState";
import { RegistroVigenciasDialog } from "../../../molecules/Dialogs/RegistroVigenciasDialog/RegistroVigenciasDialog";
import { AppRoutingPaths } from "@constants";

export interface VigenciaItemData {
  id: number;
  idCode: string;
  colorVariant: "amber" | "blue" | "purple";
  nombre: string;
  institution: string;
  program: string;
  generation: string;
  author?: string;
  assignedGroups: number;
  creationDate?: string;
  startDate: string;
  endDate: string;
  tipoVigencia: "NORMAL" | "PRUEBA";
  estatus: "ACTIVA" | "INACTIVA";
}

const mockVigencias: VigenciaItemData[] = [
  {
    id: 650,
    idCode: "VIGENCIA-0001",
    colorVariant: "amber",
    nombre: "Diseño de Interfaces I IDS COPPEL C2 – Sep 25",
    institution: "Coppel",
    program: "Prepa Coppel",
    generation: "Coppel 2022",
    author: "Cecilia Fornari",
    assignedGroups: 3,
    creationDate: "26 sep 2025",
    startDate: "1 Sep 2025",
    endDate: "30 Sep 2025",
    tipoVigencia: "NORMAL",
    estatus: "ACTIVA",
  },
  {
    id: 651,
    idCode: "VIGENCIA-0002",
    colorVariant: "blue",
    nombre: "Sistemas Operativos I LAE",
    institution: "AG College",
    program: "AG College",
    generation: "AG College 2020",
    author: "Cynthia Cuevas",
    assignedGroups: 1,
    creationDate: "28 sep 2025",
    startDate: "1 Oct 2025",
    endDate: "30 Oct 2025",
    tipoVigencia: "PRUEBA",
    estatus: "ACTIVA",
  },
];

const Vigencias: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isOpenRegistrar, setIsOpenRegistrar] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Activas", "Habilitadas"]);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setFilterMenuAnchor(null);
  };

  const handleToggleFilter = (filterName: string) => {
    if (activeFilters.includes(filterName)) {
      setActiveFilters(activeFilters.filter((f) => f !== filterName));
    } else {
      setActiveFilters([...activeFilters, filterName]);
    }
    handleCloseFilterMenu();
  };

  const handleRemoveFilter = (filterName: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filterName));
  };

  const handleDetails = (item: VigenciaItemData) => {
    navigate(AppRoutingPaths.VIGENCIAS_DETALLE.replace(":id", String(item.id)));
  };

  const handleEdit = (_item: VigenciaItemData) => {
    setIsOpenRegistrar(true);
  };

  const filteredItems = mockVigencias.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.nombre.toLowerCase().includes(q) ||
      item.institution.toLowerCase().includes(q) ||
      item.idCode.toLowerCase().includes(q)
    );
  });

  const availableFilterOptions = ["Normal", "Activas", "Habilitadas", "Pruebas"];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Title Header and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TitleHeader
          text="Vigencias"
          subTitle="Monitorea y gestiona fechas importantes, grupos y alumnos"
        />
        <Button
          variant="contained"
          onClick={() => setIsOpenRegistrar(true)}
          startIcon={<AddOutlinedIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            px: 2.5,
            py: 1,
          }}
        >
          Crear vigencia
        </Button>
      </Box>

      {/* Search Bar */}
      <Search
        placeholder="Buscar vigencias por nombre, institución o código..."
        onSearch={({ searchText }) => setSearchQuery(searchText)}
      />

      {/* Toolbar Row: Title Count, Filters, and View Switcher */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          pt: 1,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "1.125rem", color: "#111827" }}>
          Vigencias ({filteredItems.length})
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Normal + Filter Dropdown Button */}
          <Button
            onClick={handleOpenFilterMenu}
            endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
            sx={{
              backgroundColor: "#F3F4F6",
              color: "#374151",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "13px",
              borderRadius: "20px",
              px: 2,
              py: 0.5,
              height: "32px",
              border: "1px solid #E5E7EB",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            Normal +
          </Button>
          <Menu
            anchorEl={filterMenuAnchor}
            open={Boolean(filterMenuAnchor)}
            onClose={handleCloseFilterMenu}
            PaperProps={{
              sx: { borderRadius: "8px", mt: 0.5, minWidth: 140 },
            }}
          >
            {availableFilterOptions.map((opt) => (
              <MenuItem
                key={opt}
                onClick={() => handleToggleFilter(opt)}
                selected={activeFilters.includes(opt)}
                sx={{ fontSize: "13px" }}
              >
                {opt}
              </MenuItem>
            ))}
          </Menu>

          {/* Active Filter Chips */}
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
                "& .MuiChip-deleteIcon": {
                  color: "#FFFFFF",
                  "&:hover": { color: "#E4E4E7" },
                },
              }}
            />
          ))}

          {/* View Mode Toggle: Lista / Cuadrícula */}
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              p: "3px",
              border: "1px solid #E5E7EB",
            }}
          >
            <Button
              onClick={() => setViewMode("list")}
              startIcon={<FormatListBulletedIcon sx={{ fontSize: 18 }} />}
              sx={{
                textTransform: "none",
                fontSize: "13px",
                fontWeight: viewMode === "list" ? 600 : 500,
                color: viewMode === "list" ? "#111827" : "#6B7280",
                backgroundColor: viewMode === "list" ? "#FFFFFF" : "transparent",
                boxShadow: viewMode === "list" ? "0px 1px 2px rgba(0, 0, 0, 0.08)" : "none",
                borderRadius: "6px",
                px: 1.5,
                py: 0.4,
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: viewMode === "list" ? "#FFFFFF" : "rgba(0,0,0,0.04)",
                },
              }}
            >
              Lista
            </Button>
            <Button
              onClick={() => setViewMode("grid")}
              startIcon={<GridViewOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{
                textTransform: "none",
                fontSize: "13px",
                fontWeight: viewMode === "grid" ? 600 : 500,
                color: viewMode === "grid" ? "#111827" : "#6B7280",
                backgroundColor: viewMode === "grid" ? "#FFFFFF" : "transparent",
                boxShadow: viewMode === "grid" ? "0px 1px 2px rgba(0, 0, 0, 0.08)" : "none",
                borderRadius: "6px",
                px: 1.5,
                py: 0.4,
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: viewMode === "grid" ? "#FFFFFF" : "rgba(0,0,0,0.04)",
                },
              }}
            >
              Cuadrícula
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content Area */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No existen vigencias."
          subTitle="Crea una vigencia para poder gestionar grupos y estudiantes."
          buttonText="Crear vigencia"
          buttonWidth={160}
          onButtonClick={() => setIsOpenRegistrar(true)}
        />
      ) : viewMode === "list" ? (
        /* LIST VIEW */
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredItems.map((item) => {
            const isAmber = item.colorVariant === "amber";
            return (
              <Box
                key={item.id}
                sx={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  p: "20px 24px",
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
                      backgroundColor: isAmber ? "#FEF3C7" : "#EFF6FF",
                      color: isAmber ? "#D97706" : "#2563EB",
                      border: `1px solid ${isAmber ? "#FCD34D" : "#BFDBFE"}`,
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      px: 1.25,
                      py: 0.35,
                      borderRadius: "6px",
                    }}
                  >
                    {item.idCode}
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
                      {item.tipoVigencia}
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
                      {item.estatus}
                    </Box>
                  </Box>
                </Box>

                {/* Title */}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#111827",
                    lineHeight: 1.3,
                  }}
                >
                  {item.nombre}
                </Typography>

                {/* Institution / Program / Generation Subtitle */}
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
                    {item.institution}
                  </Typography>
                  <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>·</Typography>
                  <Typography sx={{ color: "#6B7280", fontSize: "13px" }}>{item.program}</Typography>
                  <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>·</Typography>
                  <Typography sx={{ color: "#6B7280", fontSize: "13px" }}>{item.generation}</Typography>
                </Box>

                {/* Meta Line: Author, Assigned Groups, Creation Date */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", mt: 0.5 }}>
                  {item.author && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#6B7280", fontSize: "13px" }}>
                      <PersonOutlinedIcon sx={{ fontSize: 16 }} />
                      <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>{item.author}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#6B7280", fontSize: "13px" }}>
                    <OutlinedFlagIcon sx={{ fontSize: 16 }} />
                    <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>
                      {item.assignedGroups} {item.assignedGroups === 1 ? "grupo asignado" : "grupos asignados"}
                    </Typography>
                  </Box>
                  {item.creationDate && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#6B7280", fontSize: "13px" }}>
                      <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />
                      <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>
                        Creación: {item.creationDate}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Bottom Row: Date Pill + Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    pt: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      backgroundColor: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      px: 1.5,
                      py: 0.75,
                    }}
                  >
                    <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: "#6B7280" }} />
                    <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>
                      {item.startDate}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#9CA3AF" }}>&gt;</Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>
                      {item.endDate}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleDetails(item)}
                      sx={{
                        textTransform: "none",
                        color: "#374151",
                        borderColor: "#D1D5DB",
                        fontWeight: 600,
                        fontSize: "13px",
                        height: 36,
                        borderRadius: "8px",
                        px: 2,
                        "&:hover": {
                          borderColor: "#9CA3AF",
                          backgroundColor: "#F9FAFB",
                        },
                      }}
                    >
                      Ver detalles
                    </Button>
                    <IconButton
                      onClick={() => handleEdit(item)}
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
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        /* GRID VIEW */
        <Grid container spacing={2}>
          {filteredItems.map((item) => {
            const isAmber = item.colorVariant === "amber";
            return (
              <Grid key={item.id} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    p: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                    },
                  }}
                >
                  <Box>
                    {/* Top Row: Code Tag + Status Badge */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box
                        sx={{
                          backgroundColor: isAmber ? "#FEF3C7" : "#EFF6FF",
                          color: isAmber ? "#D97706" : "#2563EB",
                          border: `1px solid ${isAmber ? "#FCD34D" : "#BFDBFE"}`,
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          px: 1.25,
                          py: 0.35,
                          borderRadius: "6px",
                        }}
                      >
                        {item.idCode}
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
                        {item.estatus}
                      </Box>
                    </Box>

                    {/* Title */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "#111827",
                        lineHeight: 1.3,
                        mt: 1.5,
                        mb: 0.5,
                      }}
                    >
                      {item.nombre}
                    </Typography>

                    {/* Institution / Program Subtitle */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Typography
                        sx={{
                          color: isAmber ? "#D97706" : "#2563EB",
                          fontWeight: 600,
                          fontSize: "13px",
                          cursor: "pointer",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {item.institution}
                      </Typography>
                      <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>·</Typography>
                      <Typography sx={{ color: "#6B7280", fontSize: "13px" }}>{item.program}</Typography>
                    </Box>

                    {/* Meta: Assigned Groups */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#6B7280", mt: 1.5, mb: 2 }}>
                      <OutlinedFlagIcon sx={{ fontSize: 16 }} />
                      <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>
                        {item.assignedGroups} {item.assignedGroups === 1 ? "grupo asignado" : "grupos asignados"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Full Width Action Button */}
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleDetails(item)}
                    sx={{
                      textTransform: "none",
                      color: "#4B5563",
                      borderColor: "#E5E7EB",
                      fontWeight: 500,
                      fontSize: "13px",
                      py: 1,
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 0.5,
                      "&:hover": {
                        backgroundColor: "#F9FAFB",
                        borderColor: "#D1D5DB",
                      },
                    }}
                  >
                    Ver detalles
                    <ChevronRightOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Dialog for creating / editing vigencia */}
      <RegistroVigenciasDialog
        isOpen={isOpenRegistrar}
        close={() => setIsOpenRegistrar(false)}
      />
    </Box>
  );
};

export default Vigencias;