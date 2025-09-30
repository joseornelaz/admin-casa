import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from '../../../../schemas/authSchema';
import { useAuth } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../../providers/NotificationProvider';
import { AppRoutingPaths } from '@constants';

const Login: React.FC = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // data: LoginFormData
    const onSubmit = async (data: LoginFormData) => {
        const result = await login(data.username, data.password);
        if (result.success) {
            navigate(AppRoutingPaths.HOME);
        } else {
            if (result.cambiarPassword) {
                // setShowChangePassword(true);
                showNotification("Mostrar Cambiar Password", 'info');
            } else {
                showNotification(result.message ?? "Ocurrió un error inesperado", "warning");
            }
        }
    };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Lock
              sx={{
                fontSize: 48,
                color: '#667eea',
                mb: 1
              }}
            />
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Ingresa tus credenciales para continuar
            </Typography>
          </Box>

          <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <TextField
                    label="Usuario"
                    placeholder="Ingresa tu usuario"
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit(onSubmit)();
                        }
                    }}
                />
                    <TextField
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="new-password"
                        type={showPassword ? 'text' : 'password'}
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit(onSubmit)();
                            }
                        }}
                    />
                </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #653a8b 100%)',
                }
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Ingresar
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                size="small"
                sx={{ textTransform: 'none' }}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;