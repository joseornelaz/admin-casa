
import { DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { Dialog } from '../../../atoms/Dialog/Dialog';

type ConfirmDialogProps = {
  isOpen: boolean;
  textoAccion: string;
  textoConfirmacion: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  textoAccion,
  textoConfirmacion,
  onClose,
  onConfirm,
}) => {
  if (!textoConfirmacion) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} sxProps={{ maxWidth: '400px' }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {textoAccion}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{lineHeight: '24px'}}>
            {textoConfirmacion}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" size="small" sx={{ color: '#666', borderColor: '#ccc' }}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          size="small"
          color="primary"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};