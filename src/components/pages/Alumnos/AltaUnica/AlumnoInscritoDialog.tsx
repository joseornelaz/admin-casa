import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


type AlumnoInscritoDialogProps = {
    open: boolean;
    onClose?: (close: boolean) => void;
    onViewDetails?: () => void;
};

export const AlumnoInscritoDialog: React.FC<AlumnoInscritoDialogProps> = ({ open, onClose, onViewDetails }) => {

    const handleClose = (close: boolean) => {
        if (onClose)
            onClose(close);
    }

    const handleViewDetails = () => {
        if (onViewDetails)
            onViewDetails();
    }

    return (
        <Dialog
            open={open}
            onClose={() => {
                handleClose(false);
            //   navigate(AppRoutingPaths.ALTA_UNICA);
            }}
            slotProps={{
                paper: {
                sx: {
                    borderRadius: "16px",
                    p: 3,
                    maxWidth: "460px",
                    width: "100%",
                },
                },
            }}
        >
                <DialogContent sx={{ p: 0, textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      backgroundColor: "#F0FDF4",
                      color: "#16A34A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <CheckCircleOutlinedIcon sx={{ fontSize: 32 }} />
                  </Box>
        
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", fontSize: "1.2rem", mb: 0.5 }}>
                    ¡Alumno inscrito!
                  </Typography>
        
                  <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.85rem", mb: 2.5 }}>
                    Se envió un correo de bienvenida a <strong>garcia.elena@correo.com</strong> con sus datos de acceso.
                  </Typography>
        
                  <Box
                    sx={{
                      backgroundColor: "#F9FAFB",
                      border: "1px solid #F3F4F6",
                      borderRadius: "12px",
                      p: 2,
                      textAlign: "left",
                      mb: 3,
                    }}
                  >
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>Nombre</Typography>
                        <Typography variant="caption" sx={{ color: "#111827", fontWeight: 700 }}>García López, María Elena</Typography>
                      </Stack>
        
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>Matrícula</Typography>
                        <Typography variant="caption" sx={{ color: "#111827", fontWeight: 800, fontFamily: "monospace" }}>AGC-2026-0412</Typography>
                      </Stack>
        
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>Usuario</Typography>
                        <Typography variant="caption" sx={{ color: "#111827", fontFamily: "monospace" }}>garcia.elena</Typography>
                      </Stack>
        
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>ID Alumno</Typography>
                        <Typography variant="caption" sx={{ color: "#111827", fontFamily: "monospace" }}>STU-004120</Typography>
                      </Stack>
        
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>Programa</Typography>
                        <Typography variant="caption" sx={{ color: "#111827", fontWeight: 600 }}>Lic. en Administración de Empresas</Typography>
                      </Stack>
        
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>Plan</Typography>
                        <Typography variant="caption" sx={{ color: "#111827", fontWeight: 600 }}>IDS Coppel</Typography>
                      </Stack>
                    </Stack>
                  </Box>
        
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleViewDetails();
                    //   navigate(AppRoutingPaths.ALTA_UNICA);
                    }}
                    endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      backgroundColor: "#111827",
                      color: "#FFFFFF",
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 700,
                      px: 3,
                      py: 0.9,
                      fontSize: "0.85rem",
                      "&:hover": { backgroundColor: "#1F2937" },
                    }}
                  >
                    Ver detalles
                  </Button>
                </DialogContent>
              </Dialog>
    )
}