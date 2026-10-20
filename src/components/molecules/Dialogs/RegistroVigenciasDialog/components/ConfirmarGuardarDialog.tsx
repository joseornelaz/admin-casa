import React from "react";
import {
  Dialog as MuiDialog,
  DialogContent,
  Box,
  Typography,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Button from "../../../../atoms/Button/Button";

interface ConfirmarGuardarDialogProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmarGuardarDialog: React.FC<ConfirmarGuardarDialogProps> = ({
  open,
  loading = false,
  onClose,
  onConfirm,
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "20px",
            padding: "8px",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Header con icono y título en fila */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                backgroundColor: "#DCFCE7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <SaveOutlinedIcon sx={{ color: "#16A34A", fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#111827", fontSize: "1.25rem" }}
            >
              ¿Guardar cambios?
            </Typography>
          </Box>

          {/* Mensaje descriptivo */}
          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              fontSize: "0.92rem",
              lineHeight: 1.5,
              mt: 0.5,
            }}
          >
            Se creará el grupo con las clases configuradas y quedará disponible
            dentro de la vigencia.
          </Typography>

          {/* Botones de acción */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={loading}
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
              Seguir editando
            </Button>
            <Button
              variant="contained"
              onClick={onConfirm}
              disabled={loading}
              isLoading={loading}
              sxProps={{
                borderRadius: "8px",
                backgroundColor: "#16A34A",
                color: "#FFFFFF",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                px: 3,
                "&:hover": {
                  backgroundColor: "#15803D",
                },
              }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </MuiDialog>
  );
};
