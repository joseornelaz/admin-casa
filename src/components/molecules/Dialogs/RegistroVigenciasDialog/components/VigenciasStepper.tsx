import React from "react";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import type { StepItem } from "../types";

export interface VigenciasStepperProps {
  currentStep: number;
  steps: StepItem[];
  onStepClick?: (stepId: number) => void;
}

export const VigenciasStepper: React.FC<VigenciasStepperProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1.5,
        mb: 2.5,
        userSelect: "none",
      }}
    >
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const isLast = index === steps.length - 1;
        const canClick = isCompleted && !!onStepClick;

        return (
          <React.Fragment key={step.id}>
            <Box
              onClick={() => {
                if (canClick) onStepClick(step.id);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: isActive
                  ? "rgb(238, 242, 255)"
                  : isCompleted
                  ? "#F0FDF4"
                  : "transparent",
                color: isActive ? "#2563EB" : isCompleted ? "#16A34A" : "#6B7280",
                borderRadius: "18px",
                px: 1.5,
                py: 0.5,
                cursor: canClick ? "pointer" : "default",
                transition: "all 0.2s ease-in-out",
                "&:hover": canClick
                  ? {
                      backgroundColor: "#DCFCE7",
                    }
                  : {},
              }}
            >
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: isActive
                    ? "#2563EB"
                    : isCompleted
                    ? "#DCFCE7"
                    : "#E5E7EB",
                  color: isActive
                    ? "#FFFFFF"
                    : isCompleted
                    ? "#16A34A"
                    : "#6B7280",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: isCompleted ? "1px solid #86EFAC" : "none",
                }}
              >
                {isCompleted ? <CheckIcon sx={{ fontSize: 13 }} /> : step.id}
              </Box>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: isActive || isCompleted ? 700 : 500,
                  fontSize: "0.85rem",
                  color: isActive ? "#2563EB" : isCompleted ? "#16A34A" : "#6B7280",
                }}
              >
                {step.label}
              </Typography>
            </Box>

            {!isLast && (
              <Typography variant="body2" sx={{ color: "#D1D5DB", fontWeight: 400 }}>
                —
              </Typography>
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};
