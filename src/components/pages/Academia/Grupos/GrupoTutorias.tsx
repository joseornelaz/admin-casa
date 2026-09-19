import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  IconButton,
  Collapse,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "../../../atoms/Button/Button";
import { RegistrarClaseDialog } from "../../../molecules/Dialogs/RegistrarClaseDialog/RegistrarClaseDialog";
import { useNotification } from "../../../../providers/NotificationProvider";

export const GrupoTutorias: React.FC = () => {
  const { showNotification } = useNotification();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [expandedTutoria, setExpandedTutoria] = useState<number | null>(1);
  const [recordingLink, setRecordingLink] = useState<string>("");

  const toggleAccordion = (id: number) => {
    setExpandedTutoria(expandedTutoria === id ? null : id);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      showNotification(`Archivo "${e.target.files[0].name}" subido correctamente`, "success");
    }
  };

  const handleAddRecording = () => {
    if (!recordingLink) {
      showNotification("Por favor ingresa el link de la grabación", "error");
      return;
    }
    showNotification("Link de grabación agregado correctamente", "success");
    setRecordingLink("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 0.5 }}>
      {/* Item 1: Tutoría 1 */}
      <Box
        sx={{
          borderRadius: "14px",
          border: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* Accordion Item Header */}
        <Box
          onClick={() => toggleAccordion(1)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            backgroundColor: "#F9FAFB",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <Box
            sx={{
              display: "inline-block",
              px: 1.5,
              py: 0.4,
              borderRadius: "8px",
              backgroundColor: "#E5E7EB",
              color: "#374151",
              fontSize: "0.82rem",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            id Tutoría: 1
          </Box>
          <IconButton size="small" sx={{ color: "#6B7280" }}>
            {expandedTutoria === 1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>

        {/* Accordion Item Content */}
        <Collapse in={expandedTutoria === 1}>
          <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Tags superiores */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.3,
                  borderRadius: "6px",
                  border: "1px solid #E5E7EB",
                  color: "#4B5563",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                Diseño de interfaces
              </Box>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.3,
                  borderRadius: "6px",
                  border: "1px solid #E5E7EB",
                  color: "#4B5563",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                GENERACIÓN 1
              </Box>
            </Box>

            {/* Título de la tutoría e indicadores */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", fontSize: "1.1rem" }}>
                Diseño de Interfaces I | C3 IDS COPPEL
              </Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.2,
                  borderRadius: "16px",
                  backgroundColor: "#F0FDF4",
                  color: "#16A34A",
                  border: "1px solid #BBF7D0",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                Activa
              </Box>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.2,
                  borderRadius: "16px",
                  backgroundColor: "#EFF6FF",
                  color: "#2563EB",
                  border: "1px solid #BFDBFE",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                Visible
              </Box>
            </Box>

            {/* Detalles (Docente, Fecha, Observaciones, Zoom Link) */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#6B7280" }}>
                <PersonOutlinedIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.88rem" }}>
                  Cecilia Fornari
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#6B7280" }}>
                <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.88rem" }}>
                  9 Oct 2025 · 3:00 pm
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.88rem" }}>
                Observaciones: Horario de Mazatlán
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <VideocamOutlinedIcon sx={{ fontSize: 20, color: "#2563EB" }} />
                <Typography
                  component="a"
                  href="https://academiagl-mx.zoom.us/j/89074716925"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{
                    color: "#2563EB",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  academiagl-mx.zoom.us/j/89074716925
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ borderColor: "#F3F4F6", my: 1 }} />

            {/* Sección Recursos */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>
                Recursos
              </Typography>
              <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
                Comparte material con los asistentes para la sesión agendada.
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <input
                  accept="*/*"
                  style={{ display: "none" }}
                  id="recursos-upload-input"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="recursos-upload-input">
                  <Button
                    variant="outlined"
                    onClick={() => document.getElementById("recursos-upload-input")?.click()}
                    icon={<FileUploadOutlinedIcon sx={{ fontSize: 18 }} />}
                    iconPosition="start"
                    sxProps={{
                      borderRadius: "10px",
                      borderColor: "#E5E7EB",
                      color: "#374151",
                      backgroundColor: "#FFFFFF",
                      textTransform: "none",
                      fontWeight: 600,
                      px: 2.5,
                      py: 0.8,
                      "&:hover": { backgroundColor: "#F9FAFB", borderColor: "#D1D5DB" },
                    }}
                  >
                    Subir archivo
                  </Button>
                </label>
              </Box>
            </Box>

            <Divider sx={{ borderColor: "#F3F4F6", my: 1 }} />

            {/* Sección Grabación */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>
                Grabación
              </Typography>
              <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
                Agrega el link de la grabación para que los alumnos puedan verla.
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, mt: 0.5, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                <TextField
                  placeholder="Link de la grabación"
                  value={recordingLink}
                  onChange={(e) => setRecordingLink(e.target.value)}
                  fullWidth
                  size="small"
                  slotProps={{
                    input: {
                      sx: {
                        backgroundColor: "#FAFAFA",
                        borderRadius: "10px",
                        fontSize: "0.9rem",
                        "& fieldset": { borderColor: "#E5E7EB" },
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddRecording}
                  icon={<AddOutlinedIcon sx={{ fontSize: 18 }} />}
                  iconPosition="start"
                  sxProps={{
                    whiteSpace: "nowrap",
                    borderRadius: "10px",
                    backgroundColor: "#1E1E1E",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    "&:hover": { backgroundColor: "#333333" },
                  }}
                >
                  Agregar Grabación
                </Button>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Item 2: Tutoría 2 (Colapsado) */}
      <Box
        sx={{
          borderRadius: "14px",
          border: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <Box
          onClick={() => toggleAccordion(2)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            backgroundColor: "#F9FAFB",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <Box
            sx={{
              display: "inline-block",
              px: 1.5,
              py: 0.4,
              borderRadius: "8px",
              backgroundColor: "#E5E7EB",
              color: "#374151",
              fontSize: "0.82rem",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            id Tutoría: 2
          </Box>
          <IconButton size="small" sx={{ color: "#6B7280" }}>
            {expandedTutoria === 2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>

        <Collapse in={expandedTutoria === 2}>
          <Box sx={{ p: 2.5 }}>
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Detalles de la tutoría 2...
            </Typography>
          </Box>
        </Collapse>
      </Box>

      {/* Botón "+ Nueva clase" */}
      <Box
        onClick={() => setOpenDialog(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          p: 1.8,
          mt: 1,
          borderRadius: "12px",
          border: "1.5px dashed #D1D5DB",
          backgroundColor: "#FAFDFB",
          color: "#4B5563",
          fontWeight: 600,
          fontSize: "0.92rem",
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#F3F4F6",
            borderColor: "#9CA3AF",
          },
        }}
      >
        <AddOutlinedIcon sx={{ fontSize: 20 }} />
        Nueva clase
      </Box>

      {/* Dialogo Agregar Clase */}
      <RegistrarClaseDialog isOpen={openDialog} close={() => setOpenDialog(false)} />
    </Box>
  );
};