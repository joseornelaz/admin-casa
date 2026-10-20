import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import Button from "../../../../atoms/Button/Button";
import type { RegistroVigenciaFormData } from "../types";
import { tipoGrupoOptions } from "../../../../../types/Grupos.interface";

export interface Step2GruposProps {
  control: Control<RegistroVigenciaFormData>;
  errors: FieldErrors<RegistroVigenciaFormData>;
  tutores: { id: number; nombre: string }[];
  isLoadingTutores: boolean;
  onNext: () => void;
  onCancel: () => void;
}

export const Step2Grupos: React.FC<Step2GruposProps> = ({
  control,
  errors,
  tutores,
  isLoadingTutores,
  onNext,
  onCancel,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
  );
};
