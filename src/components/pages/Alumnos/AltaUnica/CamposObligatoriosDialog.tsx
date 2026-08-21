import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

type CamposObligatoriosDialogProps = {
    open: boolean;
    onClose?: (close: boolean) => void;
  };

export const CamposObligatoriosDialog: React.FC<CamposObligatoriosDialogProps> = ({ open, onClose }) => {

    const handleClose = (close: boolean) => {
        if (onClose)
            onClose(close);
    }

  return (
    <Dialog
        open={open}
        onClose={() => handleClose(false)}
        slotProps={{
            paper: {
                sx: {
                    borderRadius: "16px",
                    p: 2.5,
                    maxWidth: "460px",
                    width: "100%",
                },
            },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                backgroundColor: "#FFF7ED",
                border: "1px solid #FED7AA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ReportProblemOutlinedIcon sx={{ color: "#D97706", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", fontSize: "1.05rem", lineHeight: 1.3 }}>
                Faltan campos obligatorios
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.88rem", lineHeight: 1.5, mb: 3 }}>
            No se puede inscribir al alumno todavía. Revisa el Paso 1 — falta seleccionar el <strong>Tipo de usuario</strong> (Colaborador o Familiar) antes de continuar.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => handleClose(false)}
              sx={{
                backgroundColor: "#111827",
                color: "#FFFFFF",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                px: 2.8,
                py: 0.8,
                fontSize: "0.85rem",
                "&:hover": { backgroundColor: "#1F2937" },
              }}
            >
              Entendido
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
  );
};