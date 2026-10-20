import React, { useEffect, useState } from "react";
import {
  Box,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Dialog } from "../../../atoms/Dialog/Dialog";
import { useNotification } from "../../../../providers/NotificationProvider";
import { GetMaterias } from "../../../../services/MateriasService";
import { GetTutores } from "../../../../services/TutoresService";
import { GetVigenciaById, PostRegistrarVigencia } from "../../../../services/VigenciasService";
import { tipoGrupoOptions } from "../../../../types/Grupos.interface";
import type { VigenciaPayload } from "../../../../types/Vigencias.interface";

import type {
  RegistroVigenciaFormData,
  StepItem,
  VigenciaDialogProps,
} from "./types";
import { RegistroVigenciaFormSchema } from "./schema";
import { VigenciasStepper } from "./components/VigenciasStepper";
import { ImportExcelBanner } from "./components/ImportExcelBanner";
import { ConfirmarGuardarDialog } from "./components/ConfirmarGuardarDialog";
import { Step1Vigencia } from "./steps/Step1Vigencia";
import { Step2Grupos } from "./steps/Step2Grupos";
import { Step3Clases } from "./steps/Step3Clases";

const STEPS: StepItem[] = [
  { id: 1, label: "Vigencia" },
  { id: 2, label: "Grupos" },
  { id: 3, label: "Clases" },
];

const defaultValues: RegistroVigenciaFormData = {
  // Paso 1: Vigencia
  idMateria: 0,
  nombre: "",
  tipoVigencia: "Normal",
  fechaInicio: "",
  fechaFin: "",

  // Paso 2: Grupos
  nombreGrupo: "",
  descripcionGrupo: "",
  tipoGrupo: 1,
  tutor: 0,

  // Paso 3: Clases
  planEstudio: "",
  servicio: "Video",
  tituloClase: "",
  linkAdmin: "",
  linkTutoria: "",
  descripcionClase: "",
  tipoClase: "Ordinaria",
  materiaClase: "",
  gruposSeleccionados: [],
};

export const RegistroVigenciasDialog: React.FC<VigenciaDialogProps> = ({
  isOpen,
  close,
  idVigencia,
}) => {
  const { showNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Queries para selects
  const { data: materiasData, isLoading: isLoadingMaterias } = GetMaterias({
    enabled: true,
  });
  const materias = materiasData
    ? [{ id: 0, nombre: "Seleccionar" }, ...materiasData]
    : [{ id: 0, nombre: "Seleccionar" }];

  const { data: tutoresData, isLoading: isLoadingTutores } = GetTutores({
    enabled: true,
  });
  const tutores = tutoresData
    ? [{ id: 0, nombre: "Selecciona un tutor" }, ...tutoresData]
    : [{ id: 0, nombre: "Selecciona un tutor" }];

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<RegistroVigenciaFormData>({
    resolver: zodResolver(
      RegistroVigenciaFormSchema(
        materias.map((m: { id: number; nombre: string }) => m.id).filter((id: number) => id !== 0),
        tutores.map((t: { id: number; nombre: string }) => t.id).filter((id: number) => id !== 0),
        tipoGrupoOptions.map((tg) => tg.id)
      )
    ),
    defaultValues,
    mode: "onTouched",
  });

  // Sync con prop isOpen
  useEffect(() => {
    setOpen(isOpen ?? false);
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  // Modo edición si viene idVigencia
  const { data: vigenciaData, isSuccess } = GetVigenciaById(idVigencia ?? 0, {
    enabled: !!idVigencia,
  });

  useEffect(() => {
    if (open && isSuccess && vigenciaData) {
      setIsEditMode(true);
      reset({
        ...defaultValues,
        ...vigenciaData,
      });
    }
  }, [vigenciaData, isSuccess, reset, open]);

  // Cierre del diálogo
  const handleClose = () => {
    reset(defaultValues);
    setIsEditMode(false);
    setOpen(false);
    setCurrentStep(1);
    setShowConfirmModal(false);
    close(false);
  };

  // Navegación entre pasos
  const handleNextStep1 = async () => {
    const isValid = await trigger([
      "idMateria",
      "nombre",
      "tipoVigencia",
      "fechaInicio",
      "fechaFin",
    ]);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handleNextStep2 = async () => {
    const isValid = await trigger(["nombreGrupo", "tipoGrupo", "tutor"]);
    if (isValid) {
      setCurrentStep(3);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId < currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleOpenConfirm = async () => {
    const isValid = await trigger();
    if (isValid) {
      setShowConfirmModal(true);
    }
  };

  // Mutación de guardado
  const createMutation = useMutation({
    mutationFn: PostRegistrarVigencia,
    onSuccess: () => {
      showNotification("Vigencia registrada correctamente", "success");
      reset(defaultValues);
      setLoading(false);
      setShowConfirmModal(false);
      setOpen(false);
      close(true);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      showNotification(
        err?.response?.data?.message ?? "Ocurrió un error inesperado al registrar la vigencia",
        "error"
      );
      setLoading(false);
      setShowConfirmModal(false);
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    const data = getValues();
    const payload: VigenciaPayload = {
      idMateria: data.idMateria,
      nombre: data.nombre,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      fechaProrroga: "",
      tipoVigencia: data.tipoVigencia,
    };
    createMutation.mutate(payload);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return isEditMode ? "Editar Vigencia" : "Nueva Vigencia";
      case 2:
        return "Datos del Grupo";
      case 3:
        return "Configurar Clases";
      default:
        return "Nueva Vigencia";
    }
  };

  const handleImportExcel = () => {
    showNotification("Carga desde archivo Excel seleccionada", "info");
  };

  return (
    <>
      <Dialog
        isOpen={open}
        onClose={handleClose}
        sxProps={{
          margin: "12px",
          width: "560px",
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
          {/* Header Superior con Título y Botón Cerrar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#111827",
                fontSize: "1.25rem",
                letterSpacing: "-0.2px",
              }}
            >
              {getStepTitle()}
            </Typography>
            <IconButton
              onClick={handleClose}
              size="small"
              aria-label="Cerrar diálogo"
              sx={{
                color: "#9CA3AF",
                "&:hover": { color: "#374151", backgroundColor: "#F3F4F6" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2.5, borderColor: "#F3F4F6" }} />

          {/* Stepper Header Bar */}
          <VigenciasStepper
            currentStep={currentStep}
            steps={STEPS}
            onStepClick={handleStepClick}
          />

          {/* Banner Importar desde Excel */}
          <ImportExcelBanner onClick={handleImportExcel} />

          {/* PASO 1: VIGENCIA */}
          {currentStep === 1 && (
            <Step1Vigencia
              control={control}
              errors={errors}
              materias={materias}
              isLoadingMaterias={isLoadingMaterias}
              onNext={handleNextStep1}
              onCancel={handleClose}
            />
          )}

          {/* PASO 2: GRUPOS */}
          {currentStep === 2 && (
            <Step2Grupos
              control={control}
              errors={errors}
              tutores={tutores}
              isLoadingTutores={isLoadingTutores}
              onNext={handleNextStep2}
              onCancel={handleClose}
            />
          )}

          {/* PASO 3: CLASES */}
          {currentStep === 3 && (
            <Step3Clases
              control={control}
              materias={materias.filter((m) => m.id !== 0)}
              isLoadingMaterias={isLoadingMaterias}
              loading={loading}
              onSubmit={handleSubmit(handleOpenConfirm)}
              onCancel={handleClose}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación de Guardado (Imagen 4) */}
      <ConfirmarGuardarDialog
        open={showConfirmModal}
        loading={loading}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={onSubmit}
      />
    </>
  );
};

export default RegistroVigenciasDialog;