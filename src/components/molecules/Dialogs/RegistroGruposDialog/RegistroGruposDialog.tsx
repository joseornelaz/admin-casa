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
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Dialog as MuiDialog,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Controller, useForm } from "react-hook-form";
import {
  RegistrarGrupoFormSchema,
  type RegistrarGrupoFormData,
} from "../../../../schemas/registrarGrupoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetGrupoById, PostRegistrarGrupo } from "../../../../services/GruposService";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../../../providers/NotificationProvider";
import { GetTutores } from "../../../../services/TutoresService";
import { GetMaterias } from "../../../../services/MateriasService";
import { tipoGrupoOptions } from "../../../../types/Grupos.interface";

type DialogProps = {
  isOpen?: boolean;
  close: (isSaved: boolean) => void;
  idGrupo?: number;
};

const defaultValues: RegistrarGrupoFormData = {
  nombre: "",
  descripcion: "",
  tipoGrupo: 1,
  tutor: 0,
  planEstudio: "",
  servicio: "Video",
  titulo: "",
  linkAdmin: "",
  linkTutoria: "",
  descripcionClase: "",
  tipoClase: "Ordinaria",
  materia: "",
  grupo1: true,
  grupo2: false,
};

interface StepItem {
  id: number;
  label: string;
}

const STEPS: StepItem[] = [
  { id: 1, label: "Datos" },
  { id: 2, label: "Grupos" },
  { id: 3, label: "Clases" },
];

export const RegistroGruposDialog: React.FC<DialogProps> = ({
  isOpen,
  close,
  idGrupo,
}) => {
  const { showNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_isEditMode, setIsEditMode] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const { data: tutoresData, isLoading: isLoadingTutores } = GetTutores({
    enabled: true,
  });
  const tutores = tutoresData
    ? [{ id: 0, nombre: "Selecciona un tutor" }, ...tutoresData]
    : [{ id: 0, nombre: "Selecciona un tutor" }];

  const { data: materiasData, isLoading: isLoadingMaterias } = GetMaterias({
    enabled: true,
  });
  const materiasList = materiasData ?? [];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<RegistrarGrupoFormData>({
    resolver: zodResolver(
      RegistrarGrupoFormSchema(
        tutores?.map((m: any) => m.id).filter((id: number) => id !== 0) ?? [],
        tipoGrupoOptions?.map((m: any) => m.id) ?? []
      )
    ),
    defaultValues,
  });

  useEffect(() => {
    setOpen(isOpen ?? false);
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  const { data: grupoData, isSuccess } = GetGrupoById(idGrupo ?? 0, {
    enabled: !!idGrupo,
  });

  useEffect(() => {
    if (open && isSuccess && grupoData) {
      setIsEditMode(true);
      reset(grupoData);
    }
  }, [grupoData, isSuccess, reset, open]);

  const handleClose = () => {
    reset(defaultValues);
    setIsEditMode(false);
    setOpen(false);
    setCurrentStep(1);
    setShowConfirmModal(false);
    close(false);
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(["nombre", "tutor", "tipoGrupo"]);
      if (isValid) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOpenConfirm = async () => {
    const isValid = await trigger();
    if (isValid) {
      setShowConfirmModal(true);
    }
  };

  const onSubmit = async (data: RegistrarGrupoFormData) => {
    setLoading(true);
    createMutation.mutate(data);
  };

  const createMutation = useMutation({
    mutationFn: PostRegistrarGrupo,
    onSuccess: () => {
      showNotification(`Grupo registrado correctamente`, "success");
      reset(defaultValues);
      setLoading(false);
      setShowConfirmModal(false);
      setOpen(false);
      close(true);
    },
    onError: (error: any) => {
      showNotification(
        error?.response?.data?.message ?? "Ocurrió un error inesperado",
        "error"
      );
      setLoading(false);
      setShowConfirmModal(false);
    },
  });

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Crear Grupo";
      case 2:
        return "Seleccionar Grupos";
      case 3:
        return "Configurar Clases";
      default:
        return "Crear Grupo";
    }
  };

  return (
    <>
      <Dialog isOpen={open} sxProps={{ margin: "5px", width: "560px", maxWidth: "95vw" }}>
        <DialogContent sx={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "20px" }}>
          {/* Header Superior con Título y Botón Cerrar */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827", fontSize: "1.3rem" }}>
              {getStepTitle()}
            </Typography>
            <IconButton onClick={handleClose} size="small" sx={{ color: "#9CA3AF" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Stepper Header Bar */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1, mb: 3 }}>
            {STEPS.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isLast = index === STEPS.length - 1;

              return (
                <React.Fragment key={step.id}>
                  <Box
                    onClick={() => setCurrentStep(step.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                      backgroundColor: isActive ? "rgb(238, 242, 255)" : isCompleted ? "#F0FDF4" : "transparent",
                      color: isActive ? "#2563EB" : isCompleted ? "#16A34A" : "#6B7280",
                      borderRadius: "16px",
                      px: 1.5,
                      py: 0.5,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: isActive
                          ? "#2563EB"
                          : isCompleted
                          ? "#16A34A"
                          : "#E5E7EB",
                        color: isActive || isCompleted ? "#FFFFFF" : "#6B7280",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isCompleted ? <CheckIcon sx={{ fontSize: 13 }} /> : step.id}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        color: isActive ? "#2563EB" : isCompleted ? "#16A34A" : "#6B7280",
                      }}
                    >
                      {step.label}
                    </Typography>
                  </Box>

                  {!isLast && (
                    <Typography variant="caption" sx={{ color: "#D1D5DB", px: 0.5 }}>
                      —
                    </Typography>
                  )}
                </React.Fragment>
              );
            })}
          </Box>

          {/* Botón / Contenedor Importar desde Excel */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              p: 1.5,
              mb: 2.5,
              borderRadius: "10px",
              border: "1.5px dashed #A7F3D0",
              backgroundColor: "#FAFDFB",
              color: "#16A34A",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#F0FDF4",
                borderColor: "#4ADE80",
              },
            }}
          >
            <CachedOutlinedIcon sx={{ fontSize: 20, color: "#16A34A" }} />
            Importar desde Excel
          </Box>

          {/* PASO 1: DATOS */}
          {currentStep === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Nombre del Grupo */}
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="nombre"
                    label="Nombre del Grupo *"
                    placeholder="Ej. Grupo Diseño Interfaces | Sep 2025"
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

              {/* Descripción del Grupo */}
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="descripcion"
                    label="Descripción del Grupo"
                    placeholder="Descripción opcional del grupo..."
                    fullWidth
                    multiline
                    rows={3}
                    slotProps={{
                      input: {
                        sx: { borderRadius: "8px" },
                      },
                    }}
                  />
                )}
              />

              {/* Tipo de Grupo - Select 1 (Imagen 1) */}
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

              {/* Tutor - Select 2 (Imagen 1) */}
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

              {/* Acciones del Formulario */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  disabled={loading}
                  sxProps={{
                    borderRadius: "8px",
                    borderColor: "#E5E7EB",
                    color: "#374151",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNextStep}
                  disabled={loading}
                  sxProps={{
                    borderRadius: "8px",
                    backgroundColor: "#1E1E1E",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    "&:hover": { backgroundColor: "#333333" },
                  }}
                >
                  Continuar
                </Button>
              </Box>
            </Box>
          )}

          {/* PASO 2: GRUPOS */}
          {currentStep === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body2" sx={{ color: "#6B7280", mb: 1 }}>
                Selecciona los grupos a los cuales aplicará esta configuración:
              </Typography>
              <FormGroup sx={{ gap: 1 }}>
                <Controller
                  name="grupo1"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={!!field.value} color="success" size="small" />}
                      label={
                        <Typography variant="body2" sx={{ color: "#374151", fontSize: "0.88rem" }}>
                          Grupo PRUEBA IDS UMi Autoridad - Diseño de Interfaces I
                        </Typography>
                      }
                    />
                  )}
                />
                <Controller
                  name="grupo2"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={!!field.value} color="success" size="small" />}
                      label={
                        <Typography variant="body2" sx={{ color: "#374151", fontSize: "0.88rem" }}>
                          Grupo PRUEBA IDS UMi Autoridad - Diseño de Interfaces II
                        </Typography>
                      }
                    />
                  )}
                />
              </FormGroup>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={handlePrevStep}
                  sxProps={{
                    borderRadius: "8px",
                    borderColor: "#E5E7EB",
                    color: "#374151",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Anterior
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNextStep}
                  sxProps={{
                    borderRadius: "8px",
                    backgroundColor: "#1E1E1E",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    "&:hover": { backgroundColor: "#333333" },
                  }}
                >
                  Continuar
                </Button>
              </Box>
            </Box>
          )}

          {/* PASO 3: CLASES */}
          {currentStep === 3 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Fila 1: Plan de estudio (Select 3), Servicio (Select 4), Título (Input) */}
              <Box sx={{ display: "flex", gap: 1.5 }}>
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
                        <MenuItem value="plan2024">Plan 2024 - Licenciatura</MenuItem>
                        <MenuItem value="plan2025">Plan 2025 - Ingeniería</MenuItem>
                        <MenuItem value="plan2026">Plan 2026 - Posgrado</MenuItem>
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
                        <MenuItem value="Video">Video</MenuItem>
                        <MenuItem value="Presencial">Presencial</MenuItem>
                        <MenuItem value="Online">Online</MenuItem>
                        <MenuItem value="Clase Grabada">Clase Grabada</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name="titulo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
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

              {/* Fila 5: Tipo (Select 5) y Materia (Select 6) */}
              <Box sx={{ display: "flex", gap: 1.5 }}>
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
                        <MenuItem value="Ordinaria">Ordinaria</MenuItem>
                        <MenuItem value="Extraordinaria">Extraordinaria</MenuItem>
                        <MenuItem value="Recursamiento">Recursamiento</MenuItem>
                        <MenuItem value="Especial">Especial</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name="materia"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="materia-label">Materia</InputLabel>
                      <Select
                        {...field}
                        disabled={isLoadingMaterias}
                        labelId="materia-label"
                        label="Materia"
                        sx={{ borderRadius: "8px" }}
                      >
                        <MenuItem value="">
                          <em>Selecciona una materia</em>
                        </MenuItem>
                        {materiasList.map((item: any) => (
                          <MenuItem key={item.id} value={item.nombre}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>

              {/* Fila 6: Grupos (Checkboxes) */}
              <Box sx={{ mt: 1 }}>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#4B5563", mb: 0.5 }}>
                  Grupos
                </Typography>
                <FormGroup sx={{ gap: 0.5 }}>
                  <Controller
                    name="grupo1"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={!!field.value} color="success" size="small" />}
                        label={
                          <Typography variant="body2" sx={{ color: "#374151", fontSize: "0.85rem" }}>
                            Grupo PRUEBA IDS UMi Autoridad - Diseño de Interfaces I
                          </Typography>
                        }
                      />
                    )}
                  />
                  <Controller
                    name="grupo2"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={!!field.value} color="success" size="small" />}
                        label={
                          <Typography variant="body2" sx={{ color: "#374151", fontSize: "0.85rem" }}>
                            Grupo PRUEBA IDS UMi Autoridad - Diseño de Interfaces I
                          </Typography>
                        }
                      />
                    )}
                  />
                </FormGroup>
              </Box>

              {/* Acciones del Formulario */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  disabled={loading}
                  sxProps={{
                    borderRadius: "8px",
                    borderColor: "#E5E7EB",
                    color: "#374151",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  onClick={handleOpenConfirm}
                  disabled={loading}
                  sxProps={{
                    borderRadius: "8px",
                    backgroundColor: "#16A34A",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    "&:hover": { backgroundColor: "#15803D" },
                  }}
                >
                  Guardar
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación de Guardado (Imagen 3) */}
      <MuiDialog
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "8px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                backgroundColor: "#DCFCE7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AssignmentTurnedInOutlinedIcon sx={{ color: "#16A34A", fontSize: 26 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", fontSize: "1.2rem" }}>
              ¿Guardar cambios?
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: 1.5 }}>
              Se creará el grupo con las clases configuradas y quedará disponible dentro de la vigencia.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end", mt: 1 }}>
              <Button
                variant="outlined"
                onClick={() => setShowConfirmModal(false)}
                disabled={loading}
                sxProps={{
                  borderRadius: "8px",
                  borderColor: "#E5E7EB",
                  color: "#374151",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Seguir editando
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                sxProps={{
                  borderRadius: "8px",
                  backgroundColor: "#16A34A",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  "&:hover": { backgroundColor: "#15803D" },
                }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </MuiDialog>
    </>
  );
};