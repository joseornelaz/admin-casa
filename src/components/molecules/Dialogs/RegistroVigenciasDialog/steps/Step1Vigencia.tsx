import React from "react";
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Button from "../../../../atoms/Button/Button";
import type { RegistroVigenciaFormData } from "../types";
import { tipoGrupoOptions } from "../../../../../types/Grupos.interface";

export interface Step1VigenciaProps {
  control: Control<RegistroVigenciaFormData>;
  errors: FieldErrors<RegistroVigenciaFormData>;
  materias: { id_curso: number; titulo: string }[];
  isLoadingMaterias: boolean;
  tutores: { id: number; nombre: string }[];
  isLoadingTutores: boolean;
  onNext: () => void;
  onCancel: () => void;
}

const tipoVigenciaOptions = [
  { id: "Normal", label: "Normal" },
  { id: "Prueba", label: "Prueba" },
  { id: "Especial", label: "Especial" },
  { id: "Recursamiento", label: "Recursamiento" },
];

export const Step1Vigencia: React.FC<Step1VigenciaProps> = ({
  control,
  errors,
  materias,
  isLoadingMaterias,
  tutores,
  isLoadingTutores,
  onNext,
  onCancel,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>       

        {/* Materia */}
        <Controller
          name="idMateria"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.idMateria}>
              <InputLabel id="materia-label">Materia</InputLabel>
              <Select
                {...field}
                labelId="materia-label"
                label="Materia"
                disabled={isLoadingMaterias}
                sx={{ borderRadius: "8px" }}
              >
                {materias.map((item) => (
                  <MenuItem key={item.id_curso} value={item.id_curso}>
                    {item.titulo}
                  </MenuItem>
                ))}
              </Select>
              {errors.idMateria && (
                <FormHelperText>{errors.idMateria.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Nombre de la Vigencia */}
        {/* <Controller
          name="nombre"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="nombre-vigencia"
              label="Nombre de la Vigencia"
              placeholder="Ej. Vigencia SOI 2025"
              fullWidth
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
              slotProps={{
                input: {
                  sx: { borderRadius: "8px" },
                },
              }}
            />
          )}
        /> */}

        {/* Tipo de Vigencia */}
        {/* <Controller
          name="tipoVigencia"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.tipoVigencia}>
              <InputLabel id="tipo-vigencia-label">Tipo de Vigencia</InputLabel>
              <Select
                {...field}
                labelId="tipo-vigencia-label"
                label="Tipo de Vigencia"
                sx={{ borderRadius: "8px" }}
              >
                {tipoVigenciaOptions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.tipoVigencia && (
                <FormHelperText>{errors.tipoVigencia.message}</FormHelperText>
              )}
            </FormControl>
          )}
        /> */}

      {/* Nombre del Grupo * */}
        <Controller
          name="nombreGrupo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="nombre-grupo"
              label="Nombre del Grupo *"
              placeholder="Ej. Grupo Diseño Interfaces | Sep 2025"
              fullWidth
              error={!!errors.nombreGrupo}
              helperText={errors.nombreGrupo?.message}
              slotProps={{
                input: {
                  sx: { borderRadius: "8px" },
                },
              }}
            />
          )}
        />

        {/* Descripción del Grupo */}
        <Controller
          name="descripcionGrupo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="descripcion-grupo"
              label="Descripción del Grupo"
              placeholder="Descripción opcional del grupo..."
              fullWidth
              multiline
              rows={3}
              error={!!errors.descripcionGrupo}
              helperText={errors.descripcionGrupo?.message}
              slotProps={{
                input: {
                  sx: { borderRadius: "8px" },
                },
              }}
            />
          )}
        />

        {/* Tipo de Grupo */}
        <Controller
          name="tipoGrupo"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.tipoGrupo}>
              <InputLabel id="tipo-grupo-label">Tipo de Grupo</InputLabel>
              <Select
                {...field}
                labelId="tipo-grupo-label"
                label="Tipo de Grupo"
                sx={{ borderRadius: "8px" }}
              >
                {tipoGrupoOptions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.tipoGrupo && (
                <FormHelperText>{errors.tipoGrupo.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Tutor * */}
        <Controller
          name="tutor"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.tutor}>
              <InputLabel id="tutor-label">Tutor *</InputLabel>
              <Select
                {...field}
                disabled={isLoadingTutores}
                labelId="tutor-label"
                label="Tutor *"
                sx={{ borderRadius: "8px" }}
              >
                {tutores.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
              {errors.tutor && (
                <FormHelperText>{errors.tutor.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Fechas de inicio y fin en fila */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          {/* Fecha de inicio */}
          <Controller
            name="fechaInicio"
            control={control}
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <DatePicker
                {...fieldProps}
                label="Fecha de inicio"
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                  const dayjsDate = date as dayjs.Dayjs | null;
                  onChange(dayjsDate && dayjsDate.isValid() ? dayjsDate.format("YYYY-MM-DD") : "");
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error: !!errors.fechaInicio,
                    helperText: errors.fechaInicio?.message,
                    InputProps: {
                      sx: { borderRadius: "8px" },
                    }
                  },
                }}
              />
            )}
          />

          {/* Fecha de fin */}
          <Controller
            name="fechaFin"
            control={control}
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <DatePicker
                {...fieldProps}
                label="Fecha de fin"
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                  const dayjsDate = date as dayjs.Dayjs | null;
                  onChange(dayjsDate && dayjsDate.isValid() ? dayjsDate.format("YYYY-MM-DD") : "");
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error: !!errors.fechaFin,
                    helperText: errors.fechaFin?.message,
                    InputProps: {
                      sx: { borderRadius: "8px" },
                    },
                  },
                }}
              />
            )}
          />
        </Box>

        <Divider sx={{ my: 0.5, borderColor: "#E5E7EB" }} />

        {/* Botones de acción inferiores */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            mt: 2.5,
          }}
        >
          <Button
            variant="outlined"
            onClick={onCancel}
            sxProps={{
              borderRadius: "8px",
              borderColor: "#E5E7EB",
              color: "#374151",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              px: 3,
              "&:hover": {
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={onNext}
            sxProps={{
              borderRadius: "8px",
              backgroundColor: "#18181B",
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              px: 3.5,
              "&:hover": {
                backgroundColor: "#27272A",
              },
            }}
          >
            Continuar
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
