import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";

type LoadingDialogProps = {
  isOpen: boolean;
  onClose?: () => void;  
};

export const LoadingDialog: React.FC<LoadingDialogProps> = ({ isOpen, onClose}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            disableEscapeKeyDown
            aria-labelledby="loading-dialog-title"
            slotProps={{
                paper: {
                    sx: {
                        minWidth: 280,
                        borderRadius: 2,
                        boxShadow: '0 16px 40px rgba(17, 24, 39, 0.18)',
                    },
                },
            }}
        >
            {/* <LinearProgress aria-label="Loading…" /> */}
            <Box
                role="status"
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                }}
            >
                <Box
                    aria-label="Cargando contenido"
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: '#2563EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'loading-dialog-pulse 1100ms ease-in-out infinite',
                        '@keyframes loading-dialog-pulse': {
                            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                            '50%': { opacity: 0.65, transform: 'scale(0.9)' },
                        },
                    }}
                >
                    <Typography sx={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1 }}>
                        ...
                    </Typography>
                </Box>
                <Typography id="loading-dialog-title" variant="subtitle1" sx={{ fontWeight: 700, color: '#111827' }}>
                    Cargando contenido
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', textAlign: 'center' }}>
                    Obteniendo módulos, lecciones y recursos.
                </Typography>
            </Box>
            {/* <Typography component="h4" variant="h4" color="primary" dangerouslySetInnerHTML={{__html: Text}} sx={{textAlign: 'center'}} /> */}
        </Dialog>
    )
}
