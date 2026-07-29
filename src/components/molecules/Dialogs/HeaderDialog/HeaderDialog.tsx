import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';

type HeaderDialogProps = {
    titulo: string;
    descripcion?: string;
    onClose: () => void;
};

export const HeaderDialog: React.FC<HeaderDialogProps> = ({ titulo, descripcion, onClose }) => {

    const handleClose = () => {
        onClose();
    }

    return (
        <Box sx={{display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
            {/* <DsSvgIcon component={AddDocument} /> */}
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', fontSize: '1.2rem' }}>
                    { titulo }
                </Typography>
                {
                    descripcion && (
                        <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.9rem' }}>
                            {descripcion}
                        </Typography>
                    )
                }
            </Box>
            <IconButton size="small" onClick={handleClose} sx={{ color: '#9CA3AF' }}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}