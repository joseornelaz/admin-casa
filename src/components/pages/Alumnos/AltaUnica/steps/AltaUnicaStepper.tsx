import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export interface StepItem {
  id: number;
  label: string;
}

export interface DynamicStepperProps {
  currentStep: number;
  steps?: StepItem[];
  onStepClick?: (stepId: number) => void;
}

export const DEFAULT_ALTA_UNICA_STEPS: StepItem[] = [
  { id: 1, label: "Datos Personales" },
  { id: 2, label: "Documentos" },
  { id: 3, label: "Inscripción" },
  { id: 4, label: "Confirmación" },
];

export const AltaUnicaStepper: React.FC<DynamicStepperProps> = ({
  currentStep,
  steps = DEFAULT_ALTA_UNICA_STEPS,
  onStepClick,
}) => {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <Box
              onClick={() => onStepClick && onStepClick(step.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                backgroundColor: isActive ? "rgb(238, 242, 255)" : "transparent",
                color: isActive ? "#000000" : isCompleted ? "#16A34A" : "#6B7280",
                borderRadius: "16px",
                px: 1.5,
                py: 0.4,
                cursor: onStepClick ? "pointer" : "default",
                transition: "all 0.2s ease",
              }}
            >
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: isActive
                    ? "#2B5CE6"
                    : isCompleted
                    ? "#F0FDF4"
                    : "#E5E7EB",
                  color: isActive
                    ? "#FFFFFF"
                    : isCompleted
                    ? "#16A34A"
                    : "#6B7280",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isCompleted ? <CheckIcon sx={{ fontSize: 12 }} /> : step.id}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  color: isActive ? "#000000" : isCompleted ? "#16A34A" : "#6B7280",
                }}
              >
                {step.label}
              </Typography>
            </Box>

            {!isLast && (
              <Typography variant="caption" sx={{ color: "#D1D5DB" }}>
                —
              </Typography>
            )}
          </React.Fragment>
        );
      })}
    </Stack>
  );
};
