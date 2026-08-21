import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

type ConfirmacionInscripcionDialogProps = {
    open: boolean;
    onClose?: (close: boolean) => void;
  };

export const ConfirmacionInscripcionDialog: React.FC<ConfirmacionInscripcionDialogProps> = ({ open, onClose }) => {

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
                        backgroundColor: "#EEF2FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <HelpOutlineOutlinedIcon sx={{ color: "#4F46E5", fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", fontSize: "1.05rem", lineHeight: 1.3 }}>
                        ¿Seguro que deseas inscribir a este alumno?
                      </Typography>
                    </Box>
                  </Stack>
        
                  <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.88rem", lineHeight: 1.5, mb: 3 }}>
                    Se generará la matrícula, se creará su Alta Única y se enviará un correo de bienvenida. Esta acción no se puede deshacer desde aquí.
                  </Typography>
        
                  <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={() => handleClose(false)}
                      sx={{
                        backgroundColor: "#FFFFFF",
                        color: "#374151",
                        borderColor: "#E5E7EB",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 600,
                        px: 2.2,
                        py: 0.8,
                        fontSize: "0.85rem",
                        "&:hover": { backgroundColor: "#F9FAFB", borderColor: "#D1D5DB" },
                      }}
                    >
                      Seguir editando
                    </Button>
        
                    <Button
                      variant="contained"
                      onClick={() => {
                        // setOpenConfirmDialog(false);
                        // setOpenSuccessDialog(true);
                        handleClose(true);
                      }}
                      sx={{
                        backgroundColor: "#16A34A",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 700,
                        px: 2.8,
                        py: 0.8,
                        fontSize: "0.85rem",
                        "&:hover": { backgroundColor: "#15803D" },
                      }}
                    >
                      Inscribir
                    </Button>
                  </Stack>
                </DialogContent>
              </Dialog>
    )
};