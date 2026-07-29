import React from "react";
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  Stack,
} from "@mui/material";

// Iconos MUI
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import { RecentStudentsCard } from "./RecentStudentsCard";
import { RecentCard } from "./RecentsCard";
import { AccesoRapidoCard } from "./AccesoRapidoCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { KpiCard } from "./KpiCard";
import { AttentionAlert } from "./AttentionAlert";
import { UpcomingEvents } from "./UpcomingEvents";

// COMPONENTE PRINCIPAL (VISTA HOME)
export const Home: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
        // p: { xs: 2, md: 4 },
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            color: "#9CA3AF",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontSize: "0.7rem",
            display: "block",
            mb: 0.5,
          }}
        >
          MIÉRCOLES, 2 DE JULIO DE 2026
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Typography variant="h4" sx={{ color: "#111827" }}>
            Buenos días, Ana
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <ButtonGroup variant="outlined" sx={{ backgroundColor: "#FFFFFF" }}>
              <Button
                startIcon={<AddIcon fontSize="small" />}
                sx={{
                  color: "#374151",
                  borderColor: "#D1D5DB",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  px: 2,
                  "&:hover": { borderColor: "#9CA3AF" },
                }}
              >
                Nueva encuesta
              </Button>
              <Button
                size="small"
                sx={{
                  color: "#374151",
                  borderColor: "#D1D5DB",
                  px: 0.5,
                  "&:hover": { borderColor: "#9CA3AF" },
                }}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>

            <Button
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "#111827",
                color: "#FFFFFF",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                borderRadius: "8px",
                px: 2.5,
                "&:hover": { backgroundColor: "#1F2937" },
              }}
            >
              Nueva Alta
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* 2. Grid KPIs: Corregido con Grid v5 CSS Grid Flex / container spacing */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        <KpiCard
          icon={<PeopleOutlineIcon sx={{ color: "#2563EB", fontSize: 20 }} />}
          iconBg="#EFF6FF"
          category="Alumnos Activos"
          value="1,247"
          subtext="+14 este mes"
          subtextType="success"
          showMiniChart
        />
        <KpiCard
          icon={<DescriptionOutlinedIcon sx={{ color: "#9333EA", fontSize: 20 }} />}
          iconBg="#F3E8FF"
          category="Alta Única"
          value="48"
          subtext="Esta semana"
        />
        <KpiCard
          icon={<CheckCircleOutlinedIcon sx={{ color: "#D97706", fontSize: 20 }} />}
          iconBg="#FEF3C7"
          category="Tareas Pendientes"
          value="7"
          subtext="2 urgentes"
          subtextType="warning"
        />
        <KpiCard
          icon={<SchoolOutlinedIcon sx={{ color: "#059669", fontSize: 20 }} />}
          iconBg="#D1FAE5"
          category="Generaciones Activas"
          value="3"
          subtext="Gen 22–A, 23–B, 24–A"
        />
      </Box>

      {/* 3. Banner Alerta */}
      <Box sx={{ mb: 3 }}>
        <AttentionAlert />
      </Box>

      {/* 4. Calendario */}
      <Box sx={{ mb: 3 }}>
        <UpcomingEvents />
      </Box>

      {/* 5. Sección Inferior en 2 columnas: Actividad (68%) + Lateral (32%) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 340px", lg: "1fr 380px" },
          gap: 2.5,
        }}
      >
        {/* Lado Izquierdo: Actividad Reciente */}
        <Box>
          <RecentActivityCard />
        </Box>

        {/* Lado Derecho: Acceso rápido & Recientes */}
        <Stack spacing={2.5}>
          {/* Widget: Acceso rápido */}
          <AccesoRapidoCard />
          {/* Widget: Recientes */}
          <RecentCard />
          {/* Widget: Alumnos recientes */}
          <RecentStudentsCard />
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;