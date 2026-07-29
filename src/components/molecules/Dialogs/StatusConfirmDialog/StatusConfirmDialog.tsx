
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

type StatusConfirmDialogProps = {
  isOpen: boolean;
  grupo: any;
  onClose: () => void;
  onConfirm: (grupo: any) => void;
};

export const StatusConfirmDialog: React.FC<StatusConfirmDialogProps> = ({
  isOpen,
  grupo,
  onClose,
  onConfirm,
}) => {
  if (!grupo) return null;

  const isActivo = grupo.estado === 'Activo';
  const nuevoEstatus = isActivo ? 'Inactivo' : 'Activo';

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        ¿Cambiar estatus del grupo?
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          ¿Estás seguro de que deseas cambiar el estatus de <strong>{grupo.nombre}</strong> a{' '}
          <strong style={{ color: isActivo ? '#d32f2f' : '#2e7d32' }}>{nuevoEstatus}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" size="small" sx={{ color: '#666', borderColor: '#ccc' }}>
          Cancelar
        </Button>
        <Button
          onClick={() => onConfirm(grupo)}
          variant="contained"
          size="small"
          color={isActivo ? 'error' : 'success'}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};