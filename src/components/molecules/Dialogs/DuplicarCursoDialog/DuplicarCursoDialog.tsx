import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  Stack,
  Radio,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export interface DuplicarCursoDialogProps {
  open: boolean;
  onClose: () => void;
  courseTitle?: string;
  currentProgram?: string;
  modulesCount?: number;
  onDuplicateSuccess?: (data: {
    targetProgram: string;
    courseTitle: string;
  }) => void;
}

const PROGRAMAS_DESTINO_MOCK = [
  "Ingeniería en Desarrollo de Software",
  "Diplomado en Administración",
  "Diplomado en Inteligencia Artificial",
  "Ingeniería Industrial",
  "Lic. en Contabilidad",
];

export const DuplicarCursoDialog: React.FC<DuplicarCursoDialogProps> = ({
  open,
  onClose,
  courseTitle = "Introducción a la Administración de Empresas",
  currentProgram = "Lic. en Administración de Empresas",
  modulesCount = 10,
  onDuplicateSuccess,
}) => {
  // Step 1: Type selection ('menu')
  // Step 2: Target program selection ('select_program')
  // Step 3: Confirmation ('confirm')
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProgram, setSelectedProgram] = useState<string>("");

  const handleClose = () => {
    setStep(1);
    setSelectedProgram("");
    onClose();
  };

  const handleSelectSameProgram = () => {
    setSelectedProgram(currentProgram);
    setStep(3);
  };

  const handleSelectOtherProgram = () => {
    setStep(2);
  };

  const handleConfirmDuplicate = () => {
    if (onDuplicateSuccess) {
      onDuplicateSuccess({
        targetProgram: selectedProgram || currentProgram,
        courseTitle,
      });
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "20px",
            p: 3,
            boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.15)",
          },
        },
      }}
    >
      {/* CABECERA COMÚN PARA LOS 3 PASOS */}
      <Stack direction="row" spacing={1.8} alignItems="center" sx={{ mb: 2.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            backgroundColor: "#EEF2FF",
            color: "#3B82F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ContentCopyIcon sx={{ fontSize: 20 }} />
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#111827", fontSize: "1.1rem", lineHeight: 1.2 }}
          >
            Duplicar curso
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.82rem", mt: 0.3 }}
          >
            {courseTitle}
          </Typography>
        </Box>
      </Stack>

      {/* ========================================================= */}
      {/* PASO 1: SELECCIÓN DE OPICIÓN DE DUPLICACIÓN               */}
      {/* ========================================================= */}
      {step === 1 && (
        <Stack spacing={1.5}>
          {/* Opción 1: Mismo Programa */}
          <Box
            onClick={handleSelectSameProgram}
            sx={{
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.8,
              cursor: "pointer",
              transition: "all 0.15s ease",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#D1D5DB",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
              },
            }}
          >
            <ContentCopyIcon sx={{ color: "#6B7280", fontSize: 20 }} />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#111827", fontSize: "0.88rem" }}
              >
                Duplicar en el mismo programa
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", fontSize: "0.78rem", mt: 0.2, display: "block" }}
              >
                Crea una copia dentro de {currentProgram}.
              </Typography>
            </Box>
          </Box>

          {/* Opción 2: Otro Programa */}
          <Box
            onClick={handleSelectOtherProgram}
            sx={{
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.8,
              cursor: "pointer",
              transition: "all 0.15s ease",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#D1D5DB",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
              },
            }}
          >
            <ChevronRightIcon sx={{ color: "#6B7280", fontSize: 22 }} />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#111827", fontSize: "0.88rem" }}
              >
                Duplicar a otro programa
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", fontSize: "0.78rem", mt: 0.2, display: "block" }}
              >
                Selecciona un programa académico de destino.
              </Typography>
            </Box>
          </Box>

          {/* Footer Paso 1: Cancelar */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                color: "#374151",
                borderColor: "#E5E7EB",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
                py: 0.8,
                fontSize: "0.85rem",
                "&:hover": { backgroundColor: "#F9FAFB" },
              }}
            >
              Cancelar
            </Button>
          </Box>
        </Stack>
      )}

      {/* ========================================================= */}
      {/* PASO 2: SELECCIÓN DE PROGRAMA DESTINO                     */}
      {/* ========================================================= */}
      {step === 2 && (
        <Stack spacing={1.5}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: "#6B7280", fontSize: "0.75rem", letterSpacing: "0.5px" }}
          >
            PROGRAMA DESTINO
          </Typography>

          <Stack spacing={1}>
            {PROGRAMAS_DESTINO_MOCK.map((prog) => {
              const isSelected = selectedProgram === prog;
              return (
                <Box
                  key={prog}
                  onClick={() => setSelectedProgram(prog)}
                  sx={{
                    border: isSelected ? "1.5px solid #2563EB" : "1px solid #E5E7EB",
                    backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
                    borderRadius: "10px",
                    px: 1.5,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      borderColor: isSelected ? "#2563EB" : "#D1D5DB",
                    },
                  }}
                >
                  <Radio
                    checked={isSelected}
                    onChange={() => setSelectedProgram(prog)}
                    size="small"
                    sx={{ p: 0.5, color: "#D1D5DB", "&.Mui-checked": { color: "#2563EB" } }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? "#1E40AF" : "#374151",
                    }}
                  >
                    {prog}
                  </Typography>
                </Box>
              );
            })}
          </Stack>

          {/* Footer Paso 2: Atrás / Continuar */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.5 }}>
            <Button
              variant="outlined"
              onClick={() => setStep(1)}
              sx={{
                color: "#374151",
                borderColor: "#E5E7EB",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 2.2,
                py: 0.8,
                fontSize: "0.85rem",
                "&:hover": { backgroundColor: "#F9FAFB" },
              }}
            >
              Atrás
            </Button>

            <Button
              variant="contained"
              disabled={!selectedProgram}
              onClick={() => setStep(3)}
              sx={{
                backgroundColor: "#111827",
                color: "#FFFFFF",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                py: 0.8,
                fontSize: "0.85rem",
                "&:hover": { backgroundColor: "#1F2937" },
                "&:disabled": { backgroundColor: "#E5E7EB", color: "#9CA3AF" },
              }}
            >
              Continuar
            </Button>
          </Stack>
        </Stack>
      )}

      {/* ========================================================= */}
      {/* PASO 3: RESUMEN Y CONFIRMACIÓN                            */}
      {/* ========================================================= */}
      {step === 3 && (
        <Stack spacing={2}>
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.82rem", lineHeight: 1.4 }}
          >
            Se creará una copia de este curso, marcada como Borrador.
          </Typography>

          {/* Card Resumen */}
          <Box
            sx={{
              border: "1px solid #E5E7EB",
              backgroundColor: "#F9FAFB",
              borderRadius: "12px",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.2,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem" }}>
                Curso
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827", fontSize: "0.82rem", textAlign: "right" }}
              >
                {courseTitle}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem" }}>
                Programa destino
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827", fontSize: "0.82rem", textAlign: "right" }}
              >
                {selectedProgram || currentProgram}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem" }}>
                Módulos incluidos
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827", fontSize: "0.82rem" }}
              >
                {modulesCount} de {modulesCount}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem" }}>
                Estado de la copia
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827", fontSize: "0.82rem" }}
              >
                Borrador
              </Typography>
            </Stack>
          </Box>

          {/* Footer Paso 3: Atrás / Duplicar curso */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setStep(selectedProgram && selectedProgram !== currentProgram ? 2 : 1)}
              sx={{
                color: "#374151",
                borderColor: "#E5E7EB",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
                py: 0.8,
                fontSize: "0.85rem",
                "&:hover": { backgroundColor: "#F9FAFB" },
              }}
            >
              Atrás
            </Button>

            <Button
              variant="contained"
              onClick={handleConfirmDuplicate}
              sx={{
                backgroundColor: "#111827",
                color: "#FFFFFF",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                px: 2.5,
                py: 0.9,
                fontSize: "0.85rem",
                "&:hover": { backgroundColor: "#1F2937" },
              }}
            >
              Duplicar curso
            </Button>
          </Stack>
        </Stack>
      )}
    </Dialog>
  );
};
