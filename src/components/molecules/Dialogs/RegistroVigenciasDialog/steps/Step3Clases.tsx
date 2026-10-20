import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, type Control } from "react-hook-form";
import Button from "../../../../atoms/Button/Button";
import type { RegistroVigenciaFormData } from "../types";

export interface Step3ClasesProps {
  control: Control<RegistroVigenciaFormData>;
  materias: { id: number; nombre: string }[];
  isLoadingMaterias: boolean;
  loading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const planesEstudioMock = [
  { id: "plan2024", label: "Plan 2024 - Licenciatura" },
  { id: "plan2025", label: "Plan 2025 - Ingeniería" },
  { id: "plan2026", label: "Plan 2026 - Posgrado" },
];

const serviciosMock = ["Video", "Presencial", "Online", "Clase Grabada"];

const tiposClaseMock = ["Ordinaria", "Extraordinaria", "Recursamiento", "Especial"];

const gruposDisponibles = [
  "Grupo PRUEBA IDS UMi Autoridad - Diseño de Interfaces I",
  "Grupo PRUEBA IDS UMi Autoridad - Diseño de Interfaces II",
];

export const Step3Clases: React.FC<Step3ClasesProps> = ({
  control,
  materias,
  isLoadingMaterias,
  loading,
  onSubmit,
  onCancel,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Fila 1: Plan de estudio (Select), Servicio (Select), Título (TextField) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
          gap: 1.5,
        }}
      >
        <Controller
          name="planEstudio"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="plan-estudio-label">Plan de estudios</InputLabel>
              <Select
                {...field}
                labelId="plan-estudio-label"
                label="Plan de estudios"
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value="">
                  <em>Selecciona un plan...</em>
                </MenuItem>
                {planesEstudioMock.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="servicio"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="servicio-label">Servicio</InputLabel>
              <Select
                {...field}
                labelId="servicio-label"
                label="Servicio"
                sx={{ borderRadius: "8px" }}
              >
                {serviciosMock.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="tituloClase"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="titulo-clase"
              label="Título"
              placeholder="Título"
              fullWidth
              slotProps={{
                input: {
                  sx: { borderRadius: "8px" },
                },
              }}
            />
          )}
        />
      </Box>

      {/* Fila 2: Link de Administrador */}
      <Controller
        name="linkAdmin"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="link-admin"
            label="Link de Administrador"
            placeholder="Link de Administrador"
            fullWidth
            slotProps={{
              input: {
                sx: { borderRadius: "8px" },
              },
            }}
          />
        )}
      />

      {/* Fila 3: Link de tutoría */}
      <Controller
        name="linkTutoria"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="link-tutoria"
            label="Link de tutoría"
            placeholder="Link de tutoría"
            fullWidth
            slotProps={{
              input: {
                sx: { borderRadius: "8px" },
              },
            }}
          />
        )}
      />

      {/* Fila 4: Descripción */}
      <Controller
        name="descripcionClase"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="descripcion-clase"
            label="Descripción"
            placeholder="Descripción del video"
            fullWidth
            multiline
            rows={2}
            slotProps={{
              input: {
                sx: { borderRadius: "8px" },
              },
            }}
          />
        )}
      />

      {/* Fila 5: Tipo y Materia */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1.5,
        }}
      >
        <Controller
          name="tipoClase"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="tipo-clase-label">Tipo</InputLabel>
              <Select
                {...field}
                labelId="tipo-clase-label"
                label="Tipo"
                sx={{ borderRadius: "8px" }}
              >
                {tiposClaseMock.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="materiaClase"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="materia-clase-label">Materia</InputLabel>
              <Select
                {...field}
                disabled={isLoadingMaterias}
                labelId="materia-clase-label"
                label="Materia"
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value="">
                  <em>Selecciona una materia</em>
                </MenuItem>
                {materias.map((m) => (
                  <MenuItem key={m.id} value={m.nombre}>
                    {m.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>

      {/* Fila 6: Grupos (Checkboxes) */}
      <Box sx={{ mt: 1 }}>
        <Typography
          sx={{
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "#4B5563",
            mb: 0.5,
          }}
        >
          Grupos
        </Typography>
        <Controller
          name="gruposSeleccionados"
          control={control}
          render={({ field }) => {
            const selectedList = field.value || [];
            return (
              <FormGroup sx={{ gap: 0.5 }}>
                {gruposDisponibles.map((grupoName) => {
                  const isChecked = selectedList.includes(grupoName);
                  return (
                    <FormControlLabel
                      key={grupoName}
                      control={
                        <Checkbox
                          checked={isChecked}
                          color="success"
                          size="small"
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...selectedList, grupoName]);
                            } else {
                              field.onChange(
                                selectedList.filter((g) => g !== grupoName)
                              );
                            }
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{ color: "#374151", fontSize: "0.88rem" }}
                        >
                          {grupoName}
                        </Typography>
                      }
                    />
                  );
                })}
              </FormGroup>
            );
          }}
        />
      </Box>

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
          disabled={loading}
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
          onClick={onSubmit}
          disabled={loading}
          sxProps={{
            borderRadius: "8px",
            backgroundColor: "#16A34A",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            px: 3.5,
            "&:hover": {
              backgroundColor: "#15803D",
            },
          }}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};
