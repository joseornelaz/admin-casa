import React from "react";
import {
  Card,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

interface StudentItem {
  id: string;
  name: string;
  code: string;
  initials: string;
  color: string;
  bgColor: string;
}

const recentStudentsData: StudentItem[] = [
  {
    id: "1",
    name: "García López, María E.",
    code: "AGC-2023-001",
    initials: "MG",
    color: "#2563EB",
    bgColor: "#EFF6FF",
  },
  {
    id: "2",
    name: "Ramírez Torres, Carlos",
    code: "AGC-2022-087",
    initials: "CR",
    color: "#D97706",
    bgColor: "#FEF3C7",
  },
  {
    id: "3",
    name: "Vega Pérez, Valentina",
    code: "AGC-2024-012",
    initials: "VP",
    color: "#059669",
    bgColor: "#D1FAE5",
  },
  {
    id: "4",
    name: "Morales Vega, José",
    code: "AGC-2023-045",
    initials: "JM",
    color: "#E11D48",
    bgColor: "#FFE4E6",
  },
];

export const RecentStudentsCard: React.FC = () => {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid #F3F4F6" }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}
        >
          Alumnos recientes
        </Typography>
      </Box>

      <List disablePadding sx={{ py: 1 }}>
        {recentStudentsData.map((student) => (
          <ListItem
            key={student.id}
            sx={{
              px: 2.5,
              py: 1,
              cursor: "pointer",
              "&:hover": { backgroundColor: "#F9FAFB" },
            }}
          >
            <ListItemAvatar sx={{ minWidth: 48 }}>
              <Avatar
                sx={{
                  bgcolor: student.bgColor,
                  color: student.color,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  width: 36,
                  height: 36,
                }}
              >
                {student.initials}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#1F2937",
                    fontSize: "0.85rem",
                    lineHeight: 1.2,
                  }}
                >
                  {student.name}
                </Typography>
              }
              secondary={
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9CA3AF",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.3px",
                  }}
                >
                  {student.code}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};