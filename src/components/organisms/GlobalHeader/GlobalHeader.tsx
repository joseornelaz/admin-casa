import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Badge,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths } from "@constants";

interface OrgOption {
  id: string;
  nombre: string;
  badgeText: string;
  badgeBgColor: string;
  badgeTextColor: string;
}

const ORGANIZACIONES_HEADER: OrgOption[] = [
  { id: "ag-college", nombre: "AG College", badgeText: "AG", badgeBgColor: "#111827", badgeTextColor: "#FFFFFF" },
  { id: "coppel-univ", nombre: "Coppel Universidad", badgeText: "CU", badgeBgColor: "#2563EB", badgeTextColor: "#FFFFFF" },
  { id: "umi", nombre: "UMi", badgeText: "UMi", badgeBgColor: "#7C3AED", badgeTextColor: "#FFFFFF" },
];

export const GlobalHeader: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOrg, setSelectedOrg] = useState<OrgOption>(ORGANIZACIONES_HEADER[0]);
  const [orgMenuAnchor, setOrgMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenOrgMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOrgMenuAnchor(event.currentTarget);
  };

  const handleSelectOrg = (org: OrgOption) => {
    setSelectedOrg(org);
    localStorage.setItem("selectedOrganization", JSON.stringify(org));
    setOrgMenuAnchor(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleLogout = () => {
    setUserMenuAnchor(null);
    navigate(AppRoutingPaths.LOGIN);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "56px",
        backgroundColor: "#111315",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2.5,
        boxSizing: "border-box",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        zIndex: 1100,
      }}
    >
      {/* SECCIÓN IZQUIERDA: LOGO + ORGANIZACIÓN */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Brand Badge */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: "pointer" }} onClick={() => navigate(AppRoutingPaths.HOME)}>
          <Box
            sx={{
              width: 28,
              height: 28,
              backgroundColor: "#FFFFFF",
              color: "#111315",
              fontWeight: 900,
              fontSize: "0.85rem",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            A
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#FFFFFF", fontSize: "0.95rem" }}>
            Admin Global
          </Typography>
        </Stack>

        {/* Separador vertical */}
        <Box sx={{ width: "1px", height: "20px", backgroundColor: "rgba(255, 255, 255, 0.15)" }} />

        {/* Selector de Organización (Pill Dropdown) */}
        <Button
          onClick={handleOpenOrgMenu}
          startIcon={
            <Box
              sx={{
                width: 18,
                height: 18,
                backgroundColor: selectedOrg.badgeBgColor === "#111827" ? "#374151" : selectedOrg.badgeBgColor,
                color: selectedOrg.badgeTextColor,
                fontSize: "0.6rem",
                fontWeight: 800,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedOrg.badgeText}
            </Box>
          }
          endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.82rem",
            borderRadius: "8px",
            px: 1.5,
            py: 0.5,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.12)",
            },
          }}
        >
          {selectedOrg.nombre}
        </Button>

        {/* Menú Dropdown de Organizaciones */}
        <Menu
          anchorEl={orgMenuAnchor}
          open={Boolean(orgMenuAnchor)}
          onClose={() => setOrgMenuAnchor(null)}
          PaperProps={{
            sx: {
              backgroundColor: "#1F2937",
              color: "#FFFFFF",
              borderRadius: "10px",
              mt: 1,
              boxShadow: "0px 8px 24px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        >
          {ORGANIZACIONES_HEADER.map((org) => (
            <MenuItem
              key={org.id}
              onClick={() => handleSelectOrg(org)}
              sx={{
                fontSize: "0.85rem",
                fontWeight: 600,
                gap: 1.5,
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: org.badgeBgColor,
                  color: org.badgeTextColor,
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {org.badgeText}
              </Box>
              {org.nombre}
            </MenuItem>
          ))}
        </Menu>
      </Stack>

      {/* SECCIÓN CENTRAL: BUSCADOR GLOBAL */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          borderRadius: "10px",
          px: 1.5,
          py: 0.5,
          width: { md: "320px", lg: "420px" },
          border: "1px solid rgba(255, 255, 255, 0.08)",
          transition: "all 0.2s ease",
          "&:focus-within": {
            borderColor: "rgba(255, 255, 255, 0.25)",
            backgroundColor: "rgba(255, 255, 255, 0.09)",
          },
        }}
      >
        <SearchIcon sx={{ color: "#6B7280", fontSize: 18, mr: 1 }} />
        <InputBase
          placeholder="Buscar alumno, folio A1, módulo..."
          sx={{
            color: "#FFFFFF",
            fontSize: "0.82rem",
            flex: 1,
            "& input::placeholder": {
              color: "#6B7280",
              opacity: 1,
            },
          }}
        />
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            color: "#6B7280",
            fontSize: "0.65rem",
            fontWeight: 700,
            px: 0.8,
            py: 0.2,
            borderRadius: "4px",
            userSelect: "none",
          }}
        >
          ⌘K
        </Box>
      </Box>

      {/* SECCIÓN DERECHA: ACCIONES & PERFIL DE USUARIO */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        {/* Botón Recorrido */}
        <Button
          startIcon={<ExploreOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{
            color: "#9CA3AF",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.78rem",
            borderRadius: "8px",
            px: 1.2,
            py: 0.4,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "#FFFFFF",
            },
          }}
        >
          Recorrido
        </Button>

        {/* Campana de Notificaciones */}
        <IconButton
          size="small"
          sx={{
            color: "#9CA3AF",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: "8px",
            p: 0.8,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "#FFFFFF",
            },
          }}
        >
          <Badge variant="dot" color="error" slotProps={{ badge: { sx: { backgroundColor: "#EF4444" } } }}>
            <NotificationsNoneIcon sx={{ fontSize: 18 }} />
          </Badge>
        </IconButton>

        {/* Perfil de Usuario Dropdown */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          onClick={handleOpenUserMenu}
          sx={{
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: "20px",
            pl: 0.5,
            pr: 1.2,
            py: 0.4,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.09)",
            },
          }}
        >
          <Avatar
            sx={{
              width: 26,
              height: 26,
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.7rem",
            }}
          >
            AA
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#FFFFFF", fontSize: "0.8rem" }}>
            Ana Belén Ávila
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 14, color: "#9CA3AF" }} />
        </Stack>

        {/* Menú de Perfil */}
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={() => setUserMenuAnchor(null)}
          PaperProps={{
            sx: {
              backgroundColor: "#1F2937",
              color: "#FFFFFF",
              borderRadius: "10px",
              mt: 1,
              minWidth: "160px",
              boxShadow: "0px 8px 24px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setUserMenuAnchor(null);
              navigate(AppRoutingPaths.SELECCION_ESPACIO);
            }}
            sx={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            Cambiar espacio
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#F87171" }}>
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default GlobalHeader;
