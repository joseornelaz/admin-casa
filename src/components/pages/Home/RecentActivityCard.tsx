import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

export const RecentActivityCard: React.FC = () => {
  const activities = [
    {
      id: 1,
      icon: <CloseIcon sx={{ color: "#EF4444", fontSize: 16 }} />,
      iconBg: "#FEE2E2",
      title: "Baja procesada — ",
      boldText: "García Morales, Luis",
      subtitle: "Servicios Escolares · AGC-2021-089",
      time: "hace 12 min",
    },
    {
      id: 2,
      icon: <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#10B981" }} />,
      iconBg: "#ECFDF5",
      title: "Nueva Alta — ",
      boldText: "Rodríguez Pérez, Carmen",
      subtitle: "Inscripciones · AGC-2026-012",
      time: "hace 34 min",
    },
    {
      id: 3,
      icon: <AccessTimeIcon sx={{ color: "#F59E0B", fontSize: 16 }} />,
      iconBg: "#FEF3C7",
      title: "Cambio de asesor — Folio ",
      boldText: "A1-2024-1834",
      subtitle: "Alta Única · Alvarado Vega, Pedro",
      time: "hace 1 h",
    },
    {
      id: 4,
      icon: <SchoolOutlinedIcon sx={{ color: "#2563EB", fontSize: 16 }} />,
      iconBg: "#EFF6FF",
      title: "Calificaciones registradas — ",
      boldText: "MAT-301 · Gen 2022-A",
      subtitle: "Académico · 34 alumnos",
      time: "hace 2 h",
    },
    {
      id: 5,
      icon: <AssessmentOutlinedIcon sx={{ color: "#6B7280", fontSize: 16 }} />,
      iconBg: "#F3F4F6",
      title: "Reporte generado — ",
      boldText: "Alumnos por materia Q2 2026",
      subtitle: "Reportes · por Administrador Global",
      time: "hace 3 h",
    },
  ];

  return (
    <Card elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: "12px", height: "100%" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #F3F4F6",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
          Actividad reciente
        </Typography>
        <Button
          sx={{
            color: "#2563EB",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.8rem",
            p: 0,
          }}
        >
          Ver todo
        </Button>
      </Box>

      <List disablePadding>
        {activities.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem sx={{ px: 2, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: item.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontSize: "0.85rem", color: "#374151" }}>
                    {item.title}
                    <Box component="span" sx={{ fontWeight: 700, color: "#111827" }}>
                      {item.boldText}
                    </Box>
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                    {item.subtitle}
                  </Typography>
                }
              />
              <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                {item.time}
              </Typography>
            </ListItem>
            {index < activities.length - 1 && <Divider sx={{ borderColor: "#F9FAFB", mt: 1, mb: 1 }} />}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};