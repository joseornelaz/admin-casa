import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAuth } from "../../../../hooks";
// import { useNotification } from "../../../../providers/NotificationProvider";
import { loginSchema, type LoginFormData } from "../../../../schemas/authSchema";
import { AppRoutingPaths } from "@constants";

import LogoGRG from "@assets/grg-logos/grg-logo-white.png";

export const Login: React.FC = () => {
  // Hooks y Lógica
  const { isLoading } = useAuth();
  const navigate = useNavigate();
  // const { showNotification } = useNotification();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // data: LoginFormData
  const onSubmit = async () => {
    // const _result = await login(data.username, data.password);
    navigate(AppRoutingPaths.HOME);
    /*if (result.success) {
      navigate(AppRoutingPaths.HOME);
    } else {
      if (result.cambiarPassword) {
        showNotification("Mostrar Cambiar Password", "info");
      } else {
        showNotification(
          result.message ?? "Ocurrió un error inesperado",
          "warning"
        );
      }
    }*/
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#121316",
        overflow: "hidden",
        p: { xs: 2, md: 2.5 },
        boxSizing: "border-box",
      }}
    >
      {/* SECCIÓN IZQUIERDA: FORMULARIO Y MARCA */}
        <Box
            sx={{
                width: { xs: "100%", md: "380px", lg: "420px" },
                maxWidth: { xs: "500px", md: "none" },
                mx: { xs: "auto", md: 0 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: { xs: "center", md: "stretch" },
                px: { xs: 2, sm: 4 },
                py: 2,
                color: "#FFFFFF",
                zIndex: 2,
            }}
        >
        {/* AGRUPADOR CENTRAL: LOGO + FORMULARIO */}
            <Box
                sx={{
                width: "100%",
                maxWidth: "360px",
                mx: "auto",
                my: "auto", // Mantiene el bloque en el centro vertical absoluto
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                }}
            >
                {/* Header / Logo */}
                <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    justifyContent={{ xs: "center", md: "flex-start" }}
                    sx={{ width: "100%", mb: 6 }} // Controlas la distancia con el MB (mb: 3 o mb: 2 para pegarlo más)
                    >
                    <Box
                        component="img"
                        src={LogoGRG}
                        alt="Logo Universidad GRG"
                        sx={{
                        width: "auto",
                        objectFit: "contain",
                        }}
                    />
                </Stack>

    {/* Formulario Principal */}
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Iniciar sesión
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#9CA3AF", mb: 4, fontWeight: 400 }}
      >
        Ingresa tus credenciales institucionales
      </Typography>

      <Stack spacing={2.5}>
        {/* Campo Usuario / Correo */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: "#E5E7EB",
              mb: 0.8,
              display: "block",
              fontSize: "0.75rem",
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
            value={"prueba@institucion.edu.mx"}
            sx={{
              mb: "3px",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                color: "#111827",
                fontSize: "0.875rem",
                "& fieldset": { border: "none" },
              },
            }}
          />
          {errors.username && (
            <Typography
              variant="caption"
              sx={{
                color: "#F87171",
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {errors.username.message}
            </Typography>
          )}
        </Box>

        {/* Campo Contraseña */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: "#E5E7EB",
              mb: 0.8,
              display: "block",
              fontSize: "0.75rem",
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
            value={"prueba123"}
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
              mb: "3px",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                color: "#111827",
                fontSize: "0.875rem",
                "& fieldset": { border: "none" },
              },
            }}
          />
          <Box
            sx={[
              errors.password
                ? { display: "flex", justifyContent: "space-between" }
                : null,
            ]}
          >
            {errors.password && (
              <Typography
                variant="caption"
                sx={{
                  color: "#F87171",
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                {errors.password.message}
              </Typography>
            )}
            <Box
              sx={[
                !errors.password
                  ? { display: "flex", justifyContent: "flex-end" }
                  : null,
              ]}
            >
              <Link
                underline="hover"
                sx={{
                  color: "#60A5FA",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Olvidé mi contraseña
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Botón de Enviar */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#111827",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 700,
            py: 1.2,
            mt: 1,
            fontSize: "0.875rem",
            "&:hover": {
              backgroundColor: "#F3F4F6",
            },
            "&:disabled": {
              backgroundColor: "#374151",
              color: "#9CA3AF",
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "#9CA3AF" }} />
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </Stack>
    </Box>
  </Box>

            {/* Footer */}
            <Box sx={{ textAlign: "center", width: "100%", opacity: 0.7 }}>
                <Divider sx={{ borderColor: "#374151", mb: 2 }} />
                <Typography
                variant="caption"
                sx={{ color: "#9CA3AF", fontSize: "0.7rem" }}
                >
                Uso exclusivo para personal autorizado
                </Typography>
            </Box>
        </Box>

      {/* ========================================================= */}
      {/* SECCIÓN DERECHA: BANNER DE BIENVENIDA / GRADIENTE MESH       */}
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
          background: `
            radial-gradient(circle at 85% 20%, rgba(147, 197, 253, 0.7) 0%, transparent 45%),
            radial-gradient(circle at 75% 60%, rgba(191, 219, 254, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 10% 10%, rgba(254, 240, 138, 0.4) 0%, transparent 50%),
            #F5EFE6
          `,
        }}
      >
        <Box sx={{ maxWidth: "560px", zIndex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              letterSpacing: "1.5px",
              fontWeight: 700,
              color: "#78716C",
              textTransform: "uppercase",
              fontSize: "0.7rem",
              display: "block",
              mb: 2,
            }}
          >
            Plataforma de operaciones académicas
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#1C1917",
              lineHeight: 1.15,
              fontSize: { md: "2.25rem", lg: "2.75rem" },
              letterSpacing: "-0.5px",
              mb: 3,
            }}
          >
            Sistema de gestión de operaciones académicas e institucionales.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#57534E",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Centraliza el ciclo completo del alumno, desde el primer contacto hasta
            el egreso, en un único entorno operativo.
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 20,
            right: 24,
            color: "#A8A29E",
            fontSize: "0.7rem",
          }}
        >
          v2.5.0
        </Typography>
      </Box> {/* FIN DERECHA */}
    </Box>
  );
};

export default Login;