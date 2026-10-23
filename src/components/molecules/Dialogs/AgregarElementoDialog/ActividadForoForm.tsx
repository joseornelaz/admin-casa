import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Controller, useForm } from "react-hook-form";
import type { RecursosResponse } from '../../../../types/Cursos.interface';

type ActividadForoFormProps = {
    onClose: () => void;
    onBack: () => void;
    onSubmit?: (data: { titulo: string; descripcion_html: string, tipo_material: string }) => void;
    isEditMode?: boolean;
    recursoData?: RecursosResponse;
}

export const ActividadForoForm: React.FC<ActividadForoFormProps> = ({ onClose, onBack, onSubmit, recursoData, isEditMode = false }) => {
  const [isSaving, setIsSaving] = React.useState(false);
  const { control, handleSubmit, reset } = useForm({
      defaultValues: recursoData || {
          titulo: '',
          descripcion_html: '',
          tipo_material: '',
      },
  });

  useEffect(() => {
      if (recursoData) {
        reset({
          titulo: recursoData.titulo || "",
          descripcion_html: recursoData.descripcion_html || "",
          tipo_material: "web",
        });
      }
    }, [recursoData, reset]);

  const handleBack = () => {
      onBack();
  }

  const handleClose = () => {
    if (!isSaving) {
      onClose();
    }
  }

  const handleSave = () => {
      setIsSaving(true);
      handleSubmit((data) => {
          if(onSubmit) onSubmit(data);
      })();
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          {
            !isEditMode && (
              <IconButton size="small" onClick={handleBack} sx={{ color: '#6B7280', p: 0 }}>
                <ChevronLeftIcon />
              </IconButton>
            )
          }
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
            name="titulo"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    id="titulo"
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
            name="descripcion_html"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    id="descripcion_html"
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
            disabled={isSaving}
            sx={{
              borderColor: '#E5E7EB',
              color: '#374151',
              borderRadius: '10px',
              textTransform: 'none',
              py: 1.2,
              fontWeight: 600
            }}
          >
            {
              !isEditMode ? 'Atrás' : 'Cancelar'
            }
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            disabled={isSaving}
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
            {
              !isEditMode ? 'Guardar elemento' : 'Editar elemento'
            }
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}