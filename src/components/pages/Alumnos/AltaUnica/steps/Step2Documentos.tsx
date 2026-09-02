import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Divider,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { type Step2Props } from "./types";

export const Step2Documentos: React.FC<Step2Props> = ({
  rutaFormacion,
  setRutaFormacion,
  modalidadExpediente,
  setModalidadExpediente,
  estatusRecepcion,
  setEstatusRecepcion,
  doc1Accion,
  setDoc1Accion,
  doc1Condicion,
  setDoc1Condicion,
  doc1Obs,
  setDoc1Obs,
  doc2Accion,
  setDoc2Accion,
  doc2Condicion,
  setDoc2Condicion,
  doc2Obs,
  setDoc2Obs,
  doc3Condicion,
  setDoc3Condicion,
  doc3Obs,
  setDoc3Obs,
  openDoc4,
  setOpenDoc4,
  doc4Accion,
  setDoc4Accion,
  doc4Condicion,
  setDoc4Condicion,
  doc4Obs,
  setDoc4Obs,
  openDoc5,
  setOpenDoc5,
  doc5Accion,
  setDoc5Accion,
  doc5Condicion,
  setDoc5Condicion,
  doc5Obs,
  setDoc5Obs,
  openDoc6,
  setOpenDoc6,
  doc6Accion,
  setDoc6Accion,
  doc6Condicion,
  setDoc6Condicion,
  doc6Obs,
  setDoc6Obs,
  doc7Obs,
  setDoc7Obs,
}) => {
  return (
    <>
      {/* TÍTULO Y DESCRIPCIÓN DE DOCUMENTOS */}
      <Box sx={{ maxWidth: "780px", mx: "auto", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
          Documentos
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
          Verifica que la información esté respaldada con la documentación correspondiente para la inscripción.
        </Typography>
      </Box>

      {/* BANNER AZUL INFORMATIVO: RUTA DE FORMACIÓN */}
      <Box
        sx={{
          maxWidth: "780px",
          mx: "auto",
          backgroundColor: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: "16px",
          p: 2.5,
          mb: 3,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1E3A8A", mb: 1.2, fontSize: "0.875rem" }}>
          Para verificar la documentación obligatoria, selecciona la ruta de formación de interés
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={rutaFormacion}
            onChange={(e) => setRutaFormacion(e.target.value)}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              fontSize: "0.875rem",
              color: "#374151",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D1D5DB" },
            }}
          >
            <MenuItem value="Seleccionar ruta...">Seleccionar ruta...</MenuItem>
            <MenuItem value="Licenciatura Coppel 2020">Licenciatura Coppel 2020</MenuItem>
            <MenuItem value="Bachillerato General 2022">Bachillerato General 2022</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* CONTENEDOR PRINCIPAL: EXPEDIENTE DOCUMENTAL */}
      <Box
        sx={{
          maxWidth: "780px",
          mx: "auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          p: { xs: 2.5, sm: 3.5 },
          mb: 6,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
        }}
      >
        {/* Header del Expediente Documental con Barra de Progreso 1/6 */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FolderOutlinedIcon sx={{ color: "#374151", fontSize: 20 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.98rem" }}>
              Expediente documental
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 60, height: 6, backgroundColor: "#E5E7EB", borderRadius: 3, overflow: "hidden" }}>
              <Box sx={{ width: "16.6%", height: "100%", backgroundColor: "#D97706" }} />
            </Box>
            <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.78rem" }}>
              1/6
            </Typography>
          </Stack>
        </Stack>

        {/* Campos de Modalidad y Estatus de Recepción */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.6, display: "block" }}>
              Modalidad del expediente
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={modalidadExpediente}
              onChange={(e) => setModalidadExpediente(e.target.value)}
              sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }}
            />
          </Box>

          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.6, display: "block" }}>
              Estatus de recepción
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={estatusRecepcion}
              onChange={(e) => setEstatusRecepcion(e.target.value)}
              sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }}
            />
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "#F3F4F6", my: 2.5 }} />

        {/* SUB-HEADER: DOCUMENTACIÓN PERSONAL */}
        <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "1px", mb: 2, display: "block" }}>
          DOCUMENTACIÓN PERSONAL
        </Typography>

        {/* ================= DOCUMENTO 1: Acta de Nacimiento (VALIDADO) ================= */}
        <Box
          sx={{
            border: "1px solid #DCFCE7",
            borderRadius: "12px",
            p: 2.5,
            mb: 2.5,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Box sx={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                1
              </Box>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                    Acta de Nacimiento
                  </Typography>
                  <Chip label="Requerido" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#4B5563", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                </Stack>
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                  Original certificada
                </Typography>
              </Box>
            </Stack>

            <Typography variant="caption" sx={{ color: "#16A34A", fontWeight: 800, fontSize: "0.82rem" }}>
              Validado
            </Typography>
          </Stack>

          {/* Archivo Adjunto (Pill PDF) */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#FEF2F2",
              border: "1px solid #FEE2E2",
              borderRadius: "10px",
              px: 1.5,
              py: 0.8,
              gap: 1,
              mb: 2,
            }}
          >
            <PictureAsPdfIcon sx={{ color: "#EF4444", fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.78rem" }}>
              ActaNacimiento.pdf
            </Typography>
            <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.72rem" }}>
              200KB
            </Typography>

            <Stack direction="row" spacing={0.3} sx={{ ml: 1 }}>
              <Tooltip title="Ver"><IconButton size="small" sx={{ p: 0.3, color: "#2563EB" }}><VisibilityOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
              <Tooltip title="Descargar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><FileDownloadOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
              <Tooltip title="Editar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><EditOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
              <Tooltip title="Eliminar"><IconButton size="small" sx={{ p: 0.3, color: "#EF4444" }}><DeleteOutlineIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
            </Stack>
          </Box>

          {/* Form de Validación */}
          <Stack spacing={1.8}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                <TextField fullWidth size="small" value={doc1Accion} onChange={(e) => setDoc1Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                <TextField fullWidth size="small" value={doc1Condicion} onChange={(e) => setDoc1Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
              </Box>
            </Stack>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
              <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc1Obs} onChange={(e) => setDoc1Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
              <Button variant="outlined" size="small" startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem" }}>
                Re-subir
              </Button>
              <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                Guardar cambios
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* ================= DOCUMENTO 2: CURP (RECHAZADO) ================= */}
        <Box
          sx={{
            border: "1px solid #FECACA",
            borderRadius: "12px",
            p: 2.5,
            mb: 2.5,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Box sx={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                2
              </Box>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                    CURP
                  </Typography>
                  <Chip label="Requerido" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#4B5563", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                </Stack>
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                  Clave Única de Registro de Población
                </Typography>
              </Box>
            </Stack>

            <Typography variant="caption" sx={{ color: "#DC2626", fontWeight: 800, fontSize: "0.82rem" }}>
              RECHAZADO
            </Typography>
          </Stack>

          {/* Archivo Adjunto (Pill PDF) */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#FEF2F2",
              border: "1px solid #FEE2E2",
              borderRadius: "10px",
              px: 1.5,
              py: 0.8,
              gap: 1,
              mb: 2,
            }}
          >
            <PictureAsPdfIcon sx={{ color: "#EF4444", fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.78rem" }}>
              HETR11021HYATHNP00.pdf
            </Typography>
            <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.72rem" }}>
              200KB
            </Typography>

            <Stack direction="row" spacing={0.3} sx={{ ml: 1 }}>
              <Tooltip title="Ver"><IconButton size="small" sx={{ p: 0.3, color: "#2563EB" }}><VisibilityOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
              <Tooltip title="Descargar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><FileDownloadOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
              <Tooltip title="Editar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><EditOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
              <Tooltip title="Eliminar"><IconButton size="small" sx={{ p: 0.3, color: "#EF4444" }}><DeleteOutlineIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
            </Stack>
          </Box>

          {/* Form de Validación */}
          <Stack spacing={1.8}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                <TextField fullWidth size="small" value={doc2Accion} onChange={(e) => setDoc2Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                <TextField fullWidth size="small" value={doc2Condicion} onChange={(e) => setDoc2Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
              </Box>
            </Stack>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
              <TextField fullWidth multiline rows={2} value={doc2Obs} onChange={(e) => setDoc2Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
              <Button variant="outlined" size="small" startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem" }}>
                Re-subir
              </Button>
              <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                Guardar cambios
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* ================= DOCUMENTO 3: Certificado de Bachillerato (PENDIENTE DE REVISIÓN) ================= */}
        <Box
          sx={{
            border: "1px solid #FED7AA",
            borderRadius: "12px",
            p: 2.5,
            mb: 2.5,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Box sx={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                3
              </Box>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                    Certificado de Bachillerato
                  </Typography>
                  <Chip label="Requerido" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#4B5563", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                </Stack>
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                  Último grado de estudios completado
                </Typography>
              </Box>
            </Stack>

            <Typography variant="caption" sx={{ color: "#D97706", fontWeight: 800, fontSize: "0.82rem" }}>
              PENDIENTE DE REVISIÓN
            </Typography>
          </Stack>

          {/* Archivo Adjunto (Pill PDF) */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#FEF2F2",
              border: "1px solid #FEE2E2",
              borderRadius: "10px",
              px: 1.5,
              py: 0.8,
              gap: 1,
              mb: 2,
            }}
          >
            <PictureAsPdfIcon sx={{ color: "#EF4444", fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.78rem" }}>
              CERT_BACHILLERATO.pdf
            </Typography>
            <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.72rem" }}>
              512KB
            </Typography>

            <Stack direction="row" spacing={0.3} sx={{ ml: 1 }}>
              <Tooltip title="Ver"><IconButton size="small" sx={{ p: 0.3, color: "#2563EB" }}><VisibilityOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
              <Tooltip title="Descargar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><FileDownloadOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
              <Tooltip title="Editar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><EditOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
              <Tooltip title="Eliminar"><IconButton size="small" sx={{ p: 0.3, color: "#EF4444" }}><DeleteOutlineIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
            </Stack>
          </Box>

          {/* Form de Validación */}
          <Stack spacing={1.8}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
              <TextField fullWidth size="small" value={doc3Condicion} onChange={(e) => setDoc3Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
            </Box>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
              <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc3Obs} onChange={(e) => setDoc3Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
              <Button variant="outlined" size="small" startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem" }}>
                Re-subir
              </Button>
              <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                Guardar cambios
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "#F3F4F6", my: 2.5 }} />

        {/* SUB-HEADER: DOCUMENTACIÓN ESCOLAR */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <SchoolOutlinedIcon sx={{ color: "#6B7280", fontSize: 18 }} />
          <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "1px" }}>
            DOCUMENTACIÓN ESCOLAR
          </Typography>
        </Stack>

        {/* CONTENEDOR UNIFICADO EN ACORDEÓN PARA ITEMS 4, 5 Y 6 */}
        <Box
          sx={{
            border: "1px solid #E5E7EB",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            mb: 3,
          }}
        >
          {/* ITEM 4: Carta de autenticidad */}
          <Box sx={{ borderBottom: "1px solid #E5E7EB" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setOpenDoc4(!openDoc4)}
              sx={{
                p: 2.5,
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                "&:hover": { backgroundColor: "#F9FAFB" },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.78rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  4
                </Box>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                      Carta de autenticidad
                    </Typography>
                    <Chip label="OPCIONAL" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#6B7280", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                  </Stack>
                  <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem", mt: 0.2, display: "block" }}>
                    Aceptación de documentos originales
                  </Typography>
                </Box>
              </Stack>

              <IconButton size="small" sx={{ color: "#6B7280" }}>
                {openDoc4 ? <KeyboardArrowUpIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />}
              </IconButton>
            </Stack>

            {openDoc4 && (
              <Box sx={{ px: 2.5, pb: 2.5, pt: 1, backgroundColor: "#FFFFFF" }}>
                <Box sx={{ mb: 2 }}>
                  <Button variant="outlined" startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 16 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem", py: 0.5, px: 1.5 }}>
                    Subir archivo
                  </Button>
                </Box>

                <Stack spacing={1.8}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                      <TextField fullWidth size="small" value={doc4Accion} onChange={(e) => setDoc4Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                      <TextField fullWidth size="small" value={doc4Condicion} onChange={(e) => setDoc4Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                    </Box>
                  </Stack>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
                    <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc4Obs} onChange={(e) => setDoc4Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                    <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                      Guardar cambios
                    </Button>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>

          {/* ITEM 5: Equivalencia */}
          <Box sx={{ borderBottom: "1px solid #E5E7EB" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setOpenDoc5(!openDoc5)}
              sx={{
                p: 2.5,
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                "&:hover": { backgroundColor: "#F9FAFB" },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.78rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  5
                </Box>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                      Equivalencia
                    </Typography>
                    <Chip label="OPCIONAL" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#6B7280", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                  </Stack>
                  <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem", mt: 0.2, display: "block" }}>
                    Revalidación de Materias
                  </Typography>
                </Box>
              </Stack>

              <IconButton size="small" sx={{ color: "#6B7280" }}>
                {openDoc5 ? <KeyboardArrowUpIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />}
              </IconButton>
            </Stack>

            {openDoc5 && (
              <Box sx={{ px: 2.5, pb: 2.5, pt: 1, backgroundColor: "#FFFFFF" }}>
                <Box sx={{ mb: 2 }}>
                  <Button variant="outlined" startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 16 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem", py: 0.5, px: 1.5 }}>
                    Subir archivo
                  </Button>
                </Box>

                <Stack spacing={1.8}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                      <TextField fullWidth size="small" value={doc5Accion} onChange={(e) => setDoc5Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                      <TextField fullWidth size="small" value={doc5Condicion} onChange={(e) => setDoc5Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                    </Box>
                  </Stack>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
                    <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc5Obs} onChange={(e) => setDoc5Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                    <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                      Guardar cambios
                    </Button>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>

          {/* ITEM 6: Certificado Parcial de Estudios */}
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setOpenDoc6(!openDoc6)}
              sx={{
                p: 2.5,
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                "&:hover": { backgroundColor: "#F9FAFB" },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.78rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  6
                </Box>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                      Certificado Parcial de Estudios
                    </Typography>
                    <Chip label="OPCIONAL" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#6B7280", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                  </Stack>
                  <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem", mt: 0.2, display: "block" }}>
                    Último grado de estudios completado
                  </Typography>
                </Box>
              </Stack>

              <IconButton size="small" sx={{ color: "#6B7280" }}>
                {openDoc6 ? <KeyboardArrowUpIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />}
              </IconButton>
            </Stack>

            {openDoc6 && (
              <Box sx={{ px: 2.5, pb: 2.5, pt: 1, backgroundColor: "#FFFFFF" }}>
                <Box sx={{ mb: 2 }}>
                  <Button variant="outlined" startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 16 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem", py: 0.5, px: 1.5 }}>
                    Subir archivo
                  </Button>
                </Box>

                <Stack spacing={1.8}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                      <TextField fullWidth size="small" value={doc6Accion} onChange={(e) => setDoc6Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                      <TextField fullWidth size="small" value={doc6Condicion} onChange={(e) => setDoc6Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                    </Box>
                  </Stack>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
                    <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc6Obs} onChange={(e) => setDoc6Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                    <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                      Guardar cambios
                    </Button>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#F3F4F6", my: 2.5 }} />

        {/* SUB-HEADER: OTROS DOCUMENTOS */}
        <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "1px", mb: 2, display: "block" }}>
          OTROS DOCUMENTOS
        </Typography>

        {/* ================= DOCUMENTO 7: Fotografías (OPCIONAL) ================= */}
        <Box sx={{ border: "1px solid #E5E7EB", borderRadius: "12px", p: 2.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Box sx={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                7
              </Box>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                    Fotografías
                  </Typography>
                  <Chip label="OPCIONAL" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#6B7280", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                </Stack>
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                  2 fotografías tamaño infantil blanco y negro
                </Typography>
              </Box>
            </Stack>

            <Button variant="outlined" startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 16 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem", py: 0.5, px: 1.5 }}>
              Subir archivo
            </Button>
          </Stack>

          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones y/o comentarios</Typography>
            <TextField fullWidth multiline rows={2} placeholder="Escribe si hay observaciones y/o comentarios" value={doc7Obs} onChange={(e) => setDoc7Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
