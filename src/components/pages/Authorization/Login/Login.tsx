import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAuth } from "../../../../hooks";
import { loginSchema, type LoginFormData } from "../../../../schemas/authSchema";
import { AppRoutingPaths } from "@constants";

const GoogleIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
    <path
      fill="#EA4335"
      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
    />
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
    />
    <path
      fill="#FBBC05"
      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
    />
    <path
      fill="#34A853"
      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
    />
  </svg>
);

export const Login: React.FC = () => {
  const { isLoading } = useAuth();
  const navigate = useNavigate();

  // Mode: 'login' | 'forgot'
  const [viewMode, setViewMode] = useState<"login" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password email state
  const [forgotEmail, setForgotEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async () => {
    navigate(AppRoutingPaths.SELECCION_ESPACIO);
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeSent(true);
    setTimeout(() => {
      setCodeSent(false);
      setViewMode("login");
    }, 2000);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#090A0C",
        overflow: "hidden",
        p: { xs: 2, md: 2.5 },
        boxSizing: "border-box",
      }}
    >
      {/* SECCIÓN IZQUIERDA: FORMULARIO Y MARCA */}
      <Box
        sx={{
          width: { xs: "100%", md: "400px", lg: "440px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4, md: 5 },
          py: 2.5,
          color: "#FFFFFF",
          zIndex: 2,
          boxSizing: "border-box",
        }}
      >
        {/* HEADER TOP BRANDING */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: "100%" }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "6px",
              backgroundColor: "#FFFFFF",
              color: "#000000",
              fontWeight: 900,
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            A
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.95rem" }}>
            Administrador Global
          </Typography>
        </Stack>

        {/* VISTA 1: INICIAR SESIÓN */}
        {viewMode === "login" ? (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              width: "100%",
              maxWidth: "360px",
              mx: "auto",
              my: "auto",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#FFFFFF", mb: 0.8, fontSize: "1.85rem" }}>
              Iniciar sesión
            </Typography>
            <Typography variant="body2" sx={{ color: "#9CA3AF", mb: 3.5, fontSize: "0.85rem" }}>
              Ingresa tus credenciales institucionales.
            </Typography>

            <Stack spacing={2}>
              {/* Campo Usuario / Correo */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: "#E5E7EB",
                    mb: 0.6,
                    display: "block",
                    fontSize: "0.78rem",
                  }}
                >
                  Correo electrónico
                </Typography>
                <TextField
                  {...register("username")}
                  fullWidth
                  size="small"
                  placeholder="nombre@institucion.edu.mx"
                  disabled={isLoading}
                  defaultValue="nombre@institucion.edu.mx"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      color: "#111827",
                      fontSize: "0.875rem",
                      "& fieldset": { border: "none" },
                    },
                  }}
                />
                {errors.username && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#F87171", display: "block", fontSize: "0.75rem", mt: 0.4 }}
                  >
                    {errors.username.message}
                  </Typography>
                )}
              </Box>

              {/* Campo Contraseña */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: "#E5E7EB",
                    mb: 0.6,
                    display: "block",
                    fontSize: "0.78rem",
                  }}
                >
                  Contraseña
                </Typography>
                <TextField
                  {...register("password")}
                  fullWidth
                  size="small"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isLoading}
                  defaultValue="prueba123"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            size="small"
                            sx={{ color: "#6B7280" }}
                          >
                            {showPassword ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      color: "#111827",
                      fontSize: "0.875rem",
                      "& fieldset": { border: "none" },
                    },
                  }}
                />
                {errors.password && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#F87171", display: "block", fontSize: "0.75rem", mt: 0.4 }}
                  >
                    {errors.password.message}
                  </Typography>
                )}

                {/* Enlace Olvidé mi contraseña */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.8 }}>
                  <Typography
                    onClick={() => setViewMode("forgot")}
                    sx={{
                      color: "#3B82F6",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Olvidé mi contraseña
                  </Typography>
                </Box>
              </Box>

              {/* Botón de Iniciar sesión */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#111827",
                  textTransform: "none",
                  borderRadius: "10px",
                  fontWeight: 700,
                  py: 1.1,
                  fontSize: "0.875rem",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "#F3F4F6",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: "#9CA3AF" }} />
                ) : (
                  "Iniciar sesión"
                )}
              </Button>

              {/* Divisor o continúa con */}
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ my: 1.5 }}>
                <Divider sx={{ flex: 1, borderColor: "#27272A" }} />
                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.72rem" }}>
                  o continúa con
                </Typography>
                <Divider sx={{ flex: 1, borderColor: "#27272A" }} />
              </Stack>

              {/* Botón Iniciar sesión con Google */}
              <Button
                fullWidth
                variant="outlined"
                onClick={onSubmit}
                sx={{
                  borderColor: "#27272A",
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  textTransform: "none",
                  borderRadius: "10px",
                  fontWeight: 600,
                  py: 1,
                  fontSize: "0.85rem",
                  "&:hover": {
                    backgroundColor: "#18181B",
                    borderColor: "#3F3F46",
                  },
                }}
              >
                <GoogleIcon />
                Iniciar sesión con Google
              </Button>
            </Stack>
          </Box>
        ) : (
          /* VISTA 2: RECUPERAR CONTRASEÑA */
          <Box
            component="form"
            onSubmit={handleSendCode}
            sx={{
              width: "100%",
              maxWidth: "360px",
              mx: "auto",
              my: "auto",
            }}
          >
            {/* Volver a inicio de sesión */}
            <Typography
              onClick={() => setViewMode("login")}
              sx={{
                color: "#9CA3AF",
                fontSize: "0.78rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                mb: 3,
                "&:hover": { color: "#FFFFFF" },
              }}
            >
              ‹ Volver a inicio de sesión
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, color: "#FFFFFF", mb: 0.8, fontSize: "1.85rem" }}>
              Recuperar contraseña
            </Typography>
            <Typography variant="body2" sx={{ color: "#9CA3AF", mb: 3.5, fontSize: "0.85rem", lineHeight: 1.4 }}>
              Ingresa tu correo institucional y te enviaremos un código de verificación.
            </Typography>

            <Stack spacing={2.5}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: "#E5E7EB",
                    mb: 0.6,
                    display: "block",
                    fontSize: "0.78rem",
                  }}
                >
                  Correo electrónico
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="nombre@institucion.edu.mx"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      color: "#111827",
                      fontSize: "0.875rem",
                      "& fieldset": { border: "none" },
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#111827",
                  textTransform: "none",
                  borderRadius: "10px",
                  fontWeight: 700,
                  py: 1.1,
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: "#F3F4F6",
                  },
                }}
              >
                {codeSent ? "Código enviado ✓" : "Enviar código"}
              </Button>
            </Stack>
          </Box>
        )}

        {/* FOOTER INFERIOR */}
        <Box sx={{ width: "100%" }}>
          <Divider sx={{ borderColor: "#27272A", mb: 2 }} />
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontSize: "0.72rem", display: "block", textAlign: "center" }}
          >
            Uso exclusivo para personal autorizado
          </Typography>
        </Box>
      </Box>

      {/* ========================================================= */}
      {/* SECCIÓN DERECHA: HERO CONTAINER CON DUAL SYSTEM THEME     */}
      {/* ========================================================= */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          px: { md: 6, lg: 10 },
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s ease-in-out",
          background:
            viewMode === "login"
              ? `
                radial-gradient(circle at 60% 40%, rgba(30, 35, 45, 0.9) 0%, #0F1115 100%),
                repeating-linear-gradient(45deg, #16181E 0, #16181E 12px, #0F1115 12px, #0F1115 24px)
              `
              : `
                radial-gradient(circle at 85% 25%, rgba(147, 197, 253, 0.6) 0%, transparent 45%),
                radial-gradient(circle at 75% 65%, rgba(191, 219, 254, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 15% 15%, rgba(254, 240, 138, 0.35) 0%, transparent 50%),
                #F5EFE6
              `,
        }}
      >
        {/* TEXTURA DE BLOQUES 3D EN MODO DARK LOGIN */}
        {viewMode === "login" && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.18,
              backgroundImage: `
                linear-gradient(30deg, #334155 12%, transparent 12.5%, transparent 87%, #334151 87.5%, #334155),
                linear-gradient(150deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
                linear-gradient(30deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
                linear-gradient(150deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
                linear-gradient(60deg, #47556977 25%, transparent 25.5%, transparent 75%, #47556977 75%, #47556977),
                linear-gradient(60deg, #47556977 25%, transparent 25.5%, transparent 75%, #47556977 75%, #47556977)
              `,
              backgroundSize: "80px 140px",
              backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px",
              pointerEvents: "none",
            }}
          />
        )}

        <Box sx={{ maxWidth: "560px", zIndex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              letterSpacing: "1.5px",
              fontWeight: 700,
              color: viewMode === "login" ? "#6B7280" : "#78716C",
              textTransform: "uppercase",
              fontSize: "0.68rem",
              display: "block",
              mb: 2,
            }}
          >
            {viewMode === "login"
              ? "ADMINISTRADOR DE OPERACIONES ACADÉMICAS"
              : "PLATAFORMA DE OPERACIONES ACADÉMICAS"}
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: viewMode === "login" ? "#FFFFFF" : "#1C1917",
              lineHeight: 1.15,
              fontSize: { md: "2.2rem", lg: "2.75rem" },
              letterSpacing: "-0.5px",
              mb: 3,
            }}
          >
            Sistema de gestión de operaciones académicas e institucionales.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: viewMode === "login" ? "#9CA3AF" : "#57534E",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Centraliza el ciclo completo del alumno, desde el primer contacto hasta el
            egreso, en un único entorno operativo.
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 20,
            right: 24,
            color: viewMode === "login" ? "#4B5563" : "#A8A29E",
            fontSize: "0.7rem",
          }}
        >
          v2.5.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;