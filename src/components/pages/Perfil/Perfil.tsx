import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Alert,
  IconButton,
  List,
  ListItem,
  Divider,
  Stack,
} from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import { TitleHeader } from "../../molecules/TitleHeader/TitleHeader";
import { useAuth } from "../../../hooks";

// Estilos globales reutilizables para tarjetas del módulo de Perfil
const cardStyle = {
  p: 3,
  borderRadius: "16px",
  border: "1px solid #EAEAEA",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
  backgroundColor: "#FFFFFF",
};

const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "#888888",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  mb: 0.5,
};

const valueStyle = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#2C2C2C",
};

export const Perfil: React.FC = () => {
  const { user } = useAuth(); // Hook de autenticación para obtener datos del usuario y funciones relacionadas
  // Estados locales para controles interactivos
  const [rutaFormacion, setRutaFormacion] = useState("Licenciatura en Administración");
  const [idioma, setIdioma] = useState<"es" | "en">("es");
  
  const fullName = `${user?.nombre || ""} ${user?.apellido_paterno || ""} ${user?.apellido_materno || ""}`.trim();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", p: 1, backgroundColor: "#FAF9F8" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TitleHeader text="Perfil" subTitle="Tu información de cuenta, sesión y actividad en CASA." />
      </Box>

      {/* Grid Principal del Dashboard */}
      <Grid container spacing={2.5}>
        
        {/* ==================== COLUMNA IZQUIERDA ==================== */}
        <Grid size={{ xs: 12, md: 4, lg: 3.5 }}>
          <Stack spacing={2.5}>
            
            {/* 1. Tarjeta de Usuario / Foto */}
            <Paper sx={{ ...cardStyle, textAlign: "center", py: 4 }}>
              <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "#2F66F6",
                    fontSize: "2rem",
                    fontWeight: 700,
                    margin: "0 auto",
                  }}
                >
                  {fullName.split(" ").map(name => name[0] || "").join("")}
                </Avatar>
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: -4,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E0E0E0",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    "&:hover": { backgroundColor: "#F5F5F5" },
                  }}
                >
                  <PhotoCameraOutlinedIcon fontSize="small" sx={{ color: "#666" }} />
                </IconButton>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#111" }}>
                {fullName}
              </Typography>
              <Typography variant="body2" sx={{ color: "#777", mb: 2.5, mt: 0.5 }}>
                {user?.tipo_usuario || ""}
              </Typography>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "10px",
                  borderColor: "#E0E0E0",
                  color: "#444",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 0.8,
                  "&:hover": { borderColor: "#B0B0B0", backgroundColor: "#FAF9F8" },
                }}
              >
                Cambiar fotografía
              </Button>
            </Paper>

            {/* 2. Tarjeta Resumen */}
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Resumen
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">Estatus</Typography>
                  <Typography variant="body2" sx={{ color: "#2e7d32", fontWeight: 700 }}>Activo</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">2FA</Typography>
                  <Chip
                    label="• Desactivada"
                    size="small"
                    sx={{ backgroundColor: "#F0F0F0", color: "#666", fontWeight: 600, fontSize: "0.75rem" }}
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">Sesiones activas</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>3</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">Última sesión</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Hoy, 08:02</Typography>
                </Box>
              </Stack>
            </Paper>

          </Stack>
        </Grid>

        {/* ==================== COLUMNA DERECHA ==================== */}
        <Grid size={{ xs: 12, md: 8, lg: 8.5 }}>
          <Stack spacing={2.5}>

            {/* 3. Información Personal */}
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2.5 }}>
                Información personal
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={labelStyle}>NOMBRE</Typography>
                  <Typography sx={valueStyle}>{fullName}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={labelStyle}>CORREO</Typography>
                  <Typography sx={valueStyle}>{user?.correo || ""}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={labelStyle}>ROL</Typography>
                  <Typography sx={valueStyle}>{user?.tipo_usuario || ""}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={labelStyle}>ORGANIZACIÓN</Typography>
                  <Typography sx={valueStyle}>{user?.nombre_empresa}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={labelStyle}>ÚLTIMA SESIÓN INICIADA</Typography>
                  <Typography sx={valueStyle}>Hoy, 08:02</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={labelStyle}>ESTATUS</Typography>
                  <Typography sx={{ ...valueStyle, color: "#2e7d32" }}>Activo</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* 4. Contexto y alcance de acceso */}
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Contexto y alcance de acceso
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={labelStyle}>ORGANIZACIÓN</Typography>
                  <Typography sx={valueStyle}>AG College</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={labelStyle}>ROL</Typography>
                  <Typography sx={valueStyle}>Administrador Global</Typography>
                </Grid>
              </Grid>

              <Typography sx={{ ...labelStyle, mt: 1 }}>ALCANCE DE ACCESO</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1.5,
                  borderRadius: "10px",
                  backgroundColor: "#EEF4FF",
                  color: "#3B82F6",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "1px solid #DBEAFE",
                  mb: 2,
                }}
              >
                <LanguageOutlinedIcon fontSize="small" />
                Acceso global — todos los campus y programas
              </Box>

              <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}>
                <Chip label="Grupo Educativo AGC" size="small" sx={{ bgcolor: "#F3F4F6", color: "#4B5563", fontWeight: 500 }} />
                <Chip label="Campus Norte" size="small" sx={{ bgcolor: "#F3F4F6", color: "#4B5563", fontWeight: 500 }} />
                <Chip label="Campus Sur" size="small" sx={{ bgcolor: "#F3F4F6", color: "#4B5563", fontWeight: 500 }} />
              </Stack>

              <Typography sx={labelStyle}>RUTA DE FORMACIÓN POR DEFECTO AL INICIAR SESIÓN</Typography>
              <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
                <Select
                  value={rutaFormacion}
                  onChange={(e) => setRutaFormacion(e.target.value)}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  <MenuItem value="Licenciatura en Administración">Licenciatura en Administración</MenuItem>
                  <MenuItem value="Ingeniería en Sistemas">Ingeniería en Sistemas</MenuItem>
                  <MenuItem value="Maestría en Educación">Maestría en Educación</MenuItem>
                </Select>
              </FormControl>
            </Paper>

            {/* 5. Seguridad y sesión */}
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Seguridad y sesión
              </Typography>

              {/* Contraseña */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.5 }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    Contraseña
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                    Última actualización hace 3 meses
                  </Typography>
                </Box>
                <Button variant="outlined" size="small" sx={{ textTransform: "none", borderRadius: "8px", color: "#444", borderColor: "#D0D0D0" }}>
                  Cambiar contraseña
                </Button>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* Autenticación de dos factores */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.5 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                      Autenticación de dos factores
                    </Typography>
                    <Chip label="• Desactivada" size="small" sx={{ bgcolor: "#F0F0F0", color: "#666", height: 22, fontSize: "0.75rem" }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem", mt: 0.5 }}>
                    Agrega una capa extra de seguridad a tu cuenta
                  </Typography>
                </Box>
                <Button variant="outlined" size="small" sx={{ textTransform: "none", borderRadius: "8px", color: "#444", borderColor: "#D0D0D0" }}>
                  Activar
                </Button>
              </Box>

              {/* Alerta de Seguridad */}
              <Alert
                severity="warning"
                icon={<WarningAmberOutlinedIcon fontSize="inherit" />}
                sx={{
                  mt: 2,
                  mb: 3,
                  borderRadius: "10px",
                  backgroundColor: "#FFFBEB",
                  color: "#B45309",
                  border: "1px solid #FCD34D",
                  "& .MuiAlert-icon": { color: "#B45309" },
                  fontSize: "0.85rem",
                }}
              >
                Tu cuenta tiene acceso global sin una segunda capa de verificación. Activa 2FA para reducir el riesgo de acceso no autorizado.
              </Alert>

              {/* Sesiones activas */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  Sesiones activas
                </Typography>
                <Button color="error" size="small" sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.825rem" }}>
                  Cerrar todas las demás
                </Button>
              </Box>

              <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {/* Sesión 1 */}
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderColor: "#F0F0F0" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "#F3F4F6", color: "#666", width: 36, height: 36, borderRadius: "8px" }}>
                      <LaptopOutlinedIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>Chrome · macOS</Typography>
                        <Chip label="Esta sesión" size="small" sx={{ bgcolor: "#DCFCE7", color: "#15803D", height: 20, fontSize: "0.7rem", fontWeight: 700 }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">Hermosillo, MX · ahora</Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Sesión 2 */}
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderColor: "#F0F0F0" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "#F3F4F6", color: "#666", width: 36, height: 36, borderRadius: "8px" }}>
                      <SmartphoneOutlinedIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>App móvil · iPhone</Typography>
                      <Typography variant="caption" color="text.secondary">Hermosillo, MX · hace 2 h</Typography>
                    </Box>
                  </Box>
                  <Button size="small" color="inherit" sx={{ textTransform: "none", color: "#666", fontSize: "0.8rem" }}>Cerrar</Button>
                </Paper>

                {/* Sesión 3 */}
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderColor: "#F0F0F0" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "#F3F4F6", color: "#666", width: 36, height: 36, borderRadius: "8px" }}>
                      <LaptopOutlinedIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>Edge · Windows</Typography>
                      <Typography variant="caption" color="text.secondary">Culiacán, MX · hace 1 día</Typography>
                    </Box>
                  </Box>
                  <Button size="small" color="inherit" sx={{ textTransform: "none", color: "#666", fontSize: "0.8rem" }}>Cerrar</Button>
                </Paper>
              </List>
            </Paper>

            {/* 6. Apariencia */}
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Apariencia
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderColor: "#111",
                      borderWidth: "1.5px",
                      cursor: "pointer",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WbSunnyOutlinedIcon fontSize="small" />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>Claro</Typography>
                    </Box>
                    <CheckCircleOutlinedIcon fontSize="small" sx={{ color: "#111", ml: "auto" }} />
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderColor: "#EAEAEA",
                      opacity: 0.6,
                      backgroundColor: "#FAFAFA",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DarkModeOutlinedIcon fontSize="small" />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#777" }}>Oscuro</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#A0A0A0", letterSpacing: "0.5px" }}>
                      PRÓXIMAMENTE
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Typography sx={labelStyle}>IDIOMA DE LA INTERFAZ</Typography>
              <Paper
                variant="outlined"
                sx={{
                  display: "inline-flex",
                  p: 0.5,
                  borderRadius: "10px",
                  bgcolor: "#F3F3F3",
                  borderColor: "transparent",
                }}
              >
                <Button
                  onClick={() => setIdioma("es")}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 3,
                    py: 0.5,
                    color: idioma === "es" ? "#FFFFFF" : "#666666",
                    backgroundColor: idioma === "es" ? "#1E1E1E" : "transparent",
                    "&:hover": { backgroundColor: idioma === "es" ? "#1E1E1E" : "#E5E5E5" },
                  }}
                >
                  Español
                </Button>
                <Button
                  onClick={() => setIdioma("en")}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 0.5,
                    color: idioma === "en" ? "#FFFFFF" : "#666666",
                    backgroundColor: idioma === "en" ? "#1E1E1E" : "transparent",
                    "&:hover": { backgroundColor: idioma === "en" ? "#1E1E1E" : "#E5E5E5" },
                  }}
                >
                  English
                </Button>
              </Paper>
            </Paper>

            {/* 7. Historial de actividad */}
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Historial de actividad
              </Typography>
              <Paper variant="outlined" sx={{ borderRadius: "12px", overflow: "hidden", borderColor: "#EAEAEA" }}>
                <List disablePadding>
                  {[
                    { action: "Inicio de sesión", time: "hace 12 min" },
                    { action: "Publicó el curso Matemáticas para Negocios", time: "hace 25 min" },
                    { action: "Lanzó Encuesta de Egresados 2026", time: "hace 40 min" },
                    { action: "Actualizó permisos de Hugo Paredes Vidal", time: "hace 2 horas" },
                    { action: "Generó Reporte de Inscripción", time: "ayer" },
                  ].map((item, index, array) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ py: 1.5, px: 2, display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#666" }} />
                          <Typography variant="body2" sx={{ fontWeight: 500, color: "#333" }}>
                            {item.action}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: "#888" }}>
                          {item.time}
                        </Typography>
                      </ListItem>
                      {index < array.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Paper>

            {/* 8. Cuenta / Exportar mis datos */}
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Cuenta
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    Exportar mis datos
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                    Descarga tu información de cuenta y actividad en CASA.
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    borderColor: "#D0D0D0",
                    color: "#444",
                    fontWeight: 600,
                    px: 2,
                    py: 0.8,
                  }}
                >
                  Solicitar exportación
                </Button>
              </Box>
            </Paper>

          </Stack>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Perfil;