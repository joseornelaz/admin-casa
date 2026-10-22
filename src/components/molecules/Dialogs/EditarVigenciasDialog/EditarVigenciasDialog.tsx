import React, { useEffect, useState } from "react";
import {
  Box,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useMutation } from "@tanstack/react-query";

import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { useNotification } from "../../../../providers/NotificationProvider";
import { GetMaterias } from "../../../../services/MateriasService";
import {
  GetVigenciaById,
  PutActualizarVigencia,
} from "../../../../services/VigenciasService";
import {
  VigenciaFormSchema,
  type VigenciaFormData,
} from "../../../../schemas/vigenciaSchema";
import type { VigenciaPayload } from "../../../../types/Vigencias.interface";

export type EditarVigenciasDialogProps = {
  isOpen?: boolean;
  close: (isSaved: boolean) => void;
  idVigencia?: number;
};

const tipoVigenciaOptions = [
  { id: "Normal", label: "Normal" },
  { id: "Prueba", label: "Prueba" },
  { id: "Especial", label: "Especial" },
  { id: "Recursamiento", label: "Recursamiento" },
];

const defaultValues: VigenciaFormData = {
  idMateria: 101,
  nombre: "Vigencia SOI 2025",
  tipoVigencia: "Normal",
  fechaInicio: "",
  fechaFin: "",
  fechaProrroga: "",
};

export const EditarVigenciasDialog: React.FC<EditarVigenciasDialogProps> = ({
  isOpen,
  close,
  idVigencia,
}) => {
  const { showNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Carga de materias
  const { data: materiasData, isLoading: isLoadingMaterias } = GetMaterias({
    enabled: true,
  });
  const materias = materiasData
    ? [{ id: 0, nombre: "Seleccionar" }, ...materiasData]
    : [{ id: 0, nombre: "Seleccionar" }];

  // Formulario con validación Zod
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VigenciaFormData>({
    resolver: zodResolver(
      VigenciaFormSchema(
        materias.map((m: { id: number; nombre: string }) => m.id).filter((id: number) => id !== 0)
      )
    ),
    defaultValues,
    mode: "onTouched",
  });

  // Control de apertura
  useEffect(() => {
    setOpen(isOpen ?? false);
  }, [isOpen]);

  // Obtención de datos actuales de la vigencia si se provee id
  const { data: vigenciaData, isSuccess } = GetVigenciaById(idVigencia ?? 0, {
    enabled: !!idVigencia,
  });

  useEffect(() => {
    if (open && isSuccess && vigenciaData) {
      reset({
        idMateria: vigenciaData.idMateria ?? 101,
        nombre: vigenciaData.nombre ?? "",
        tipoVigencia: vigenciaData.tipoVigencia ?? "Normal",
        fechaInicio: vigenciaData.fechaInicio ?? "",
        fechaFin: vigenciaData.fechaFin ?? "",
        fechaProrroga: vigenciaData.fechaProrroga ?? "",
      });
    }
  }, [vigenciaData, isSuccess, reset, open]);

  // Cierre
  const handleClose = () => {
    reset(defaultValues);
    setOpen(false);
    close(false);
  };

  // Mutación para actualizar
  const updateMutation = useMutation({
    mutationFn: PutActualizarVigencia,
    onSuccess: () => {
      showNotification("Vigencia actualizada correctamente", "success");
      setLoading(false);
      setOpen(false);
      close(true);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      showNotification(
        err?.response?.data?.message ?? "Ocurrió un error inesperado al actualizar la vigencia",
        "error"
      );
      setLoading(false);
    },
  });

  const onSubmit = async (data: VigenciaFormData) => {
    setLoading(true);
    const payload: Partial<VigenciaPayload> = {
      idMateria: data.idMateria,
      nombre: data.nombre,
      tipoVigencia: data.tipoVigencia,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      fechaProrroga: data.fechaProrroga ?? "",
    };

    updateMutation.mutate({
      id: idVigencia ?? 0,
      payload,
    });
  };

  const handleImportExcel = () => {
    showNotification("Carga desde archivo Excel seleccionada", "info");
  };

  return (
    <Dialog
      isOpen={open}
      onClose={handleClose}
      sxProps={{
        margin: "12px",
        width: "520px",
        maxWidth: "95vw",
        borderRadius: "20px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "#FFFFFF",
          padding: { xs: "20px", sm: "28px" },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          {/* Header con icono azul y título */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              mb: 2.5,
            }}
          >
            <CalendarMonthOutlinedIcon
              sx={{
                fontSize: 24,
                color: "#2563EB",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#111827",
                fontSize: "1.25rem",
                letterSpacing: "-0.2px",
              }}
            >
              Editar Vigencia
            </Typography>
          </Box>

          {/* Formulario */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Materia */}
            <Controller
              name="idMateria"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.idMateria}>
                  <InputLabel id="materia-select-label">Materia</InputLabel>
                  <Select
                    {...field}
                    labelId="materia-select-label"
                    label="Materia"
                    disabled={isLoadingMaterias}
                    sx={{ borderRadius: "8px" }}
                  >
                    {materias.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nombre}
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
            <Controller
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
            />

            {/* Tipo de Vigencia */}
            <Controller
              name="tipoVigencia"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.tipoVigencia}>
                  <InputLabel id="tipo-vigencia-select-label">
                    Tipo de Vigencia
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="tipo-vigencia-select-label"
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
                    <FormHelperText>
                      {errors.tipoVigencia.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />

            {/* Fila: Fecha de inicio y Fecha de fin */}
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
                      onChange(
                        dayjsDate && dayjsDate.isValid()
                          ? dayjsDate.format("YYYY-MM-DD")
                          : ""
                      );
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.fechaInicio,
                        helperText: errors.fechaInicio?.message,
                        InputProps: {
                          sx: { borderRadius: "8px" },
                        },
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
                      onChange(
                        dayjsDate && dayjsDate.isValid()
                          ? dayjsDate.format("YYYY-MM-DD")
                          : ""
                      );
                    }}
                    slotProps={{
                      textField: {
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

            {/* Fecha de prórroga */}
            <Controller
              name="fechaProrroga"
              control={control}
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <DatePicker
                  {...fieldProps}
                  label="Fecha de prórroga"
                  value={value ? dayjs(value) : null}
                  onChange={(date) => {
                    const dayjsDate = date as dayjs.Dayjs | null;
                    onChange(
                      dayjsDate && dayjsDate.isValid()
                        ? dayjsDate.format("YYYY-MM-DD")
                        : ""
                    );
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.fechaProrroga,
                      helperText: errors.fechaProrroga?.message,
                      InputProps: {
                        sx: { borderRadius: "8px" },
                      },
                    },
                  }}
                />
              )}
            />

            {/* Separador con círculo en el centro: — o — */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                my: 1.5,
              }}
            >
              <Box sx={{ flex: 1, height: "1px", backgroundColor: "#E5E7EB" }} />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "1.5px solid #9CA3AF",
                  backgroundColor: "#FFFFFF",
                  mx: 1.5,
                }}
              />
              <Box sx={{ flex: 1, height: "1px", backgroundColor: "#E5E7EB" }} />
            </Box>

            {/* Banner: Importar desde Excel */}
            <Box
              onClick={handleImportExcel}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleImportExcel();
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.25,
                py: 1.3,
                px: 2,
                borderRadius: "10px",
                border: "1.5px dashed #E5E7EB",
                backgroundColor: "#FAFDFB",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#F0FDF4",
                  borderColor: "#86EFAC",
                },
                "&:focus-visible": {
                  outline: "2px solid #22C55E",
                  outlineOffset: "2px",
                },
              }}
            >
              <CachedOutlinedIcon sx={{ fontSize: 20, color: "#16A34A" }} />
              <Typography
                sx={{
                  color: "#4B5563",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
              >
                Importar desde Excel
              </Typography>
            </Box>

            {/* Botones de acción inferiores */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                justifyContent: "flex-end",
                mt: 1.5,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClose}
                disabled={loading}
                icon={<CloseIcon sx={{ fontSize: 16, color: "#374151" }} />}
                iconPosition="start"
                sxProps={{
                  borderRadius: "8px",
                  borderColor: "#E5E7EB",
                  color: "#374151",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  px: 2.5,
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
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                isLoading={loading}
                sxProps={{
                  borderRadius: "8px",
                  backgroundColor: "#18181B",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#27272A",
                  },
                }}
              >
                Guardar vigencia
              </Button>
            </Box>
          </Box>
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditarVigenciasDialog;
