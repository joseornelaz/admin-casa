import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { GrupoFormSchema, type GrupoFormData } from "../../../../schemas/grupoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../atoms/Button/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNotification } from "../../../../providers/NotificationProvider";

type GrupoEditFormProps = {
  initialValues?: Partial<GrupoFormData>;
  onSave?: (data: GrupoFormData) => void;
};

const defaultFormValues: GrupoFormData = {
  nombre: "Grupo Diseño Interfaces | Sep 2025",
  planEstudio: "IDS Coppel",
  rutaEstudio: "IDS Coppel",
  tutor: "fatimadelara",
  correoTutor: "tutor.interfaces1@umi.edu.mx",
  administrador: "Cecilia Fornari",
  fechaRegistro: "24 de Agosto del 2025",
  fechaModificacion: "31 de Septiembre del 2025",
  descripcion: "Sin comentarios",
  activo: true,
  habilitado: true,
  normal: true,
};

export const GrupoEditForm: React.FC<GrupoEditFormProps> = ({
  initialValues,
  onSave,
}) => {
  const { showNotification } = useNotification();

  const planesOptions = [
    { id: "IDS Coppel", nombre: "IDS Coppel" },
    { id: "IDS General", nombre: "IDS General" },
    { id: "Plan 2025", nombre: "Plan 2025" },
  ];

  const rutasOptions = [
    { id: "IDS Coppel", nombre: "IDS Coppel" },
    { id: "Ruta 2025", nombre: "Ruta 2025" },
  ];

  const tutoresOptions = [
    { id: "fatimadelara", nombre: "fatimadelara" },
    { id: "maria.lopez", nombre: "maria.lopez" },
  ];

  const administradoresOptions = [
    { id: "Cecilia Fornari", nombre: "Cecilia Fornari" },
    { id: "Carlos García", nombre: "Carlos García" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GrupoFormData>({
    resolver: zodResolver(GrupoFormSchema()),
    defaultValues: {
      ...defaultFormValues,
      ...initialValues,
    },
  });

  const onSubmit = (data: GrupoFormData) => {
    if (onSave) {
      onSave(data);
    } else {
      showNotification("Detalles del grupo actualizados correctamente", "success");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F0F7FF",
        borderRadius: "16px",
        border: "1px solid #DBEAFE",
        p: { xs: 2, sm: 3 },
      }}
    >
      {/* Header Sección Detalles del Grupo */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
        <InfoOutlinedIcon sx={{ color: "#2563EB", fontSize: 24, mt: 0.2 }} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#111827", fontSize: "1.15rem", lineHeight: 1.2 }}
          >
            Detalles del Grupo
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#2563EB", fontWeight: 500, fontSize: "0.88rem", mt: 0.3 }}
          >
            Detalles generales del grupo
          </Typography>
        </Box>
      </Box>

      {/* Switches de Estatus */}
      <Box sx={{ mb: 2.5 }}>
        <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Controller
            name="activo"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Activo"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                    color: "#374151",
                    fontSize: "0.95rem",
                  },
                }}
              />
            )}
          />
          <Controller
            name="habilitado"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Habilitado"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                    color: "#374151",
                    fontSize: "0.95rem",
                  },
                }}
              />
            )}
          />
          <Controller
            name="normal"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Normal"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                    color: "#374151",
                    fontSize: "0.95rem",
                  },
                }}
              />
            )}
          />
        </FormGroup>
      </Box>

      {/* Formulario de Detalles */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Fila 1: Nombre del Grupo y Plan de Estudios */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre del Grupo"
                  variant="outlined"
                  fullWidth
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                  slotProps={{
                    input: {
                      sx: {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="planEstudio"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.planEstudio}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2563EB",
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  <InputLabel id="plan-estudio-edit-label">Plan de Estudios</InputLabel>
                  <Select
                    {...field}
                    labelId="plan-estudio-edit-label"
                    label="Plan de Estudios"
                    value={field.value ?? "IDS Coppel"}
                  >
                    {planesOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Fila 2: Ruta de Estudios */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="rutaEstudio"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.rutaEstudio}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <InputLabel id="ruta-estudio-edit-label">Ruta de Estudios</InputLabel>
                  <Select
                    {...field}
                    labelId="ruta-estudio-edit-label"
                    label="Ruta de Estudios"
                    value={field.value ?? "IDS Coppel"}
                  >
                    {rutasOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Fila 3: Tutor y Correo Tutor */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="tutor"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.tutor}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <InputLabel id="tutor-edit-label">Tutor</InputLabel>
                  <Select
                    {...field}
                    labelId="tutor-edit-label"
                    label="Tutor"
                    value={field.value ?? "fatimadelara"}
                  >
                    {tutoresOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="correoTutor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo Tutor"
                  variant="outlined"
                  fullWidth
                  error={!!errors.correoTutor}
                  helperText={errors.correoTutor?.message}
                  slotProps={{
                    input: {
                      sx: {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Fila 4: Administrador */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="administrador"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.administrador}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <InputLabel id="admin-edit-label">Administrador</InputLabel>
                  <Select
                    {...field}
                    labelId="admin-edit-label"
                    label="Administrador"
                    value={field.value ?? "Cecilia Fornari"}
                  >
                    {administradoresOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Fila 5: Fecha de registro y Fecha de modificación */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="fechaRegistro"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha de registro"
                  variant="outlined"
                  fullWidth
                  slotProps={{
                    input: {
                      sx: {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="fechaModificacion"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha de modificación"
                  variant="outlined"
                  fullWidth
                  slotProps={{
                    input: {
                      sx: {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Fila 6: Descripción del Grupo */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="descripcion"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción del Grupo"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  slotProps={{
                    input: {
                      sx: {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Botón de Acción Guardar */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleSubmit(onSubmit)}
            icon={<EditOutlinedIcon sx={{ fontSize: 18, color: "#374151" }} />}
            iconPosition="start"
            sxProps={{
              borderRadius: "10px",
              borderColor: "#D1D5DB",
              backgroundColor: "#FFFFFF",
              color: "#374151",
              fontWeight: 600,
              textTransform: "none",
              px: 3,
              py: 0.8,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#9CA3AF",
              },
            }}
          >
            Guardar
          </Button>
        </Box>
      </form>
    </Box>
  );
};