import React from "react";
import { Box, Typography, Stack, Grid, Chip } from "@mui/material";
import { type Step4Props } from "./types";

export const Step4Confirmacion: React.FC<Step4Props> = ({
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  curp,
  fechaNacimiento,
  correo,
  telefono,
  rutaEstudios,
  generacionGrupo,
}) => {
  const nombreCompleto = `${apellidoPaterno} ${apellidoMaterno}, ${nombre}`.trim();
  const avatarIniciales = `${apellidoPaterno.charAt(0)}${nombre.charAt(0)}`.toUpperCase() || "MG";

  return (
    <>
      {/* TÍTULO Y DESCRIPCIÓN DE CONFIRMACIÓN */}
      <Box sx={{ maxWidth: "760px", mx: "auto", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
          Confirmación
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
          Revisa los datos antes de crear el Alta Única. La matrícula se generará automáticamente.
        </Typography>
      </Box>

      {/* TARJETA DE RESUMEN DEL PROSPECTO */}
      <Box
        sx={{
          maxWidth: "760px",
          mx: "auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          p: { xs: 2.5, sm: 3.5 },
          mb: 2.5,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
        }}
      >
        {/* Header del prospecto (Avatar, Nombre, Matrícula aviso, Chip Docs. incompletos) */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3, pb: 2.5, borderBottom: "1px solid #F3F4F6" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "#EEF2FF",
                color: "#4F46E5",
                fontWeight: 800,
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {avatarIniciales}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>
                {nombreCompleto || "García López, María Elena"}
              </Typography>
              <Typography variant="caption" sx={{ color: "#6B7280", fontFamily: "monospace", fontSize: "0.78rem" }}>
                Matrícula: será asignada al guardar
              </Typography>
            </Box>
          </Stack>

          <Chip
            label="Docs. incompletos"
            size="small"
            sx={{
              backgroundColor: "#FFF7ED",
              border: "1px solid #FED7AA",
              color: "#C2410C",
              fontWeight: 700,
              fontSize: "0.72rem",
              borderRadius: "12px",
              height: 24,
            }}
          />
        </Stack>

        {/* Grid de Datos Resumidos */}
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
              CURP
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
              {curp || "GARX001201MDFLPR09"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
              FECHA DE NACIMIENTO
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
              {fechaNacimiento || "12 de enero de 2000"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
              CORREO
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
              {correo || "garcia.elena@correo.com"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
              TELÉFONO
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
              {telefono || "55 1234 5678"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
              RUTA DE FORMACIÓN
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
              {rutaEstudios || "Lic. en Administración de Empresas"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
              GENERACIÓN - GRUPO
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
              {generacionGrupo || "Gen 2024-A · Grupo A - Presencial"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* BANNER INFORMATIVO VERDE */}
      <Box
        sx={{
          maxWidth: "760px",
          mx: "auto",
          backgroundColor: "#F0FDF4",
          border: "1px solid #DCFCE7",
          borderRadius: "12px",
          p: 2,
          mb: 6,
        }}
      >
        <Typography variant="body2" sx={{ color: "#16A34A", fontWeight: 600, fontSize: "0.85rem" }}>
          Al confirmar, se creará el Alta Única, se asignará matrícula y se notificará a Servicios Escolares.
        </Typography>
      </Box>
    </>
  );
};
