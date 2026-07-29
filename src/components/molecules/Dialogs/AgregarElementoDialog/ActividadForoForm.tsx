import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Controller, useForm } from "react-hook-form";

type ActividadForoFormProps = {
    onClose: () => void;
    onBack: () => void;
    onSubmit?: (data: any) => void;
    initialData?: any;
}

export const ActividadForoForm: React.FC<ActividadForoFormProps> = ({ onClose, onBack, onSubmit, initialData }) => {
    
    const { control, handleSubmit } = useForm({
            defaultValues: initialData || {
                nombre: '',
                descripcion: '',
                fechaInicio: '',
                fechaFin: '',
            },
        });
    
        const handleBack = () => {
            onBack();
        }
    
        const handleClose = () => {
            onClose();
        }
    
        const handleSave = () => {
            handleSubmit((data) => {
                if(onSubmit) onSubmit(data);
            })();
        }

    return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="small" onClick={handleBack} sx={{ color: '#6B7280', p: 0 }}>
            <ChevronLeftIcon />
          </IconButton>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem', lineHeight: 1.2 }}>
              Contenido HTML
            </Typography>
            <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
              Copia y pega el contenido HTML
            </Typography>
          </Box>
        </Stack>
        <IconButton size="small" onClick={handleClose} sx={{ color: '#9CA3AF' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Formulario */}
      <Stack spacing={2.5}>
        <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    id="nombre"
                    label="Nombre del elemento *"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    sx={{
                        mb:0,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#FAFAFA'
                        }
                    }}
                />
            )}
        />

        <Box>
          <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600, display: 'block', mb: 0.8 }}>
            Contenido HTML
          </Typography>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    id="nombre"
                    label="Nombre del elemento *"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    multiline
                    rows={5}
                    placeholder="Pega o escribe el contenido HTML aquí..."
                    sx={{
                        mb:0,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#FAFAFA',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem'
                        }
                    }}
                />
                )}
            />
          <Typography variant="caption" sx={{ color: '#9CA3AF', display: 'block', mt: 1, fontSize: '0.75rem' }}>
            Copia y pega el HTML del contenido; se renderizará directamente para el alumno.
          </Typography>
        </Box>

        {/* Botones de Acción */}
        <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleBack}
            sx={{
              borderColor: '#E5E7EB',
              color: '#374151',
              borderRadius: '10px',
              textTransform: 'none',
              py: 1.2,
              fontWeight: 600
            }}
          >
            Atrás
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: '#B82338',
              color: '#FFF',
              borderRadius: '10px',
              textTransform: 'none',
              py: 1.2,
              fontWeight: 600,
              '&:hover': { backgroundColor: '#991B1B' }
            }}
          >
            Guardar elemento
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}