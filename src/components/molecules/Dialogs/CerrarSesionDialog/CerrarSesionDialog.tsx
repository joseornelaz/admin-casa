import { DialogContent, Typography, Button, Box } from '@mui/material';
import { Dialog } from '../../../atoms/Dialog/Dialog';
import { flexColumn } from '@styles';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

type CerrarSesionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const CerrarSesionDialog: React.FC<CerrarSesionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {

  return (
    <Dialog isOpen={isOpen} onClose={onClose} sxProps={{ maxWidth: '400px' }}>
      <DialogContent>
        <Box sx={{...flexColumn, textAlign: 'center', gap: 2, p: 2}}>
            <LogoutOutlinedIcon sx={{ fontSize: 36, color: 'rgb(185, 28, 28)' }} />
            <Typography variant="h4" color="textPrimary" sx={{ fontWeight: 'bold', mb: 2 }}>
                ¿Cerrar sesión?
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{lineHeight: '24px'}}>
                Tu sesión activa se cerrará. Deberás autenticarte nuevamente para ingresar al sistema.
            </Typography> 
            <Button 
                onClick={onConfirm} 
                variant="contained" 
                sx={{ color: '#FFF', borderColor: 'rgb(185, 28, 28)', backgroundColor: 'rgb(185, 28, 28)' }}
                fullWidth
            >
            Cerrar Sesión
            </Button>
            <Button
                onClick={onClose}
                variant="outlined"
                sx={{ color: '#666', borderColor: '#ccc' }}
                fullWidth
            >
            Mantener Sesión
            </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};