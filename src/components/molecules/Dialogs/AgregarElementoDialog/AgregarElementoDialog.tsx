import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';

// Iconos MUI
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { ContenidoEvaluacionForm } from './ContenidoEvaluacionForm';
import { ActividadForoForm } from './ActividadForoForm';
import { CreateRecurso } from '../../../../services/CursosService';
import type { ModulosResponse } from '../../../../types/Cursos.interface';
import { useQueryClient } from '@tanstack/react-query';
import { MODULOS_CURSOS } from '../../../../types/endpoints';

export type StepType = 'menu' | 'contenido' | 'actividad' | 'foro' | 'evaluacion';
export type TipoElemento = 'contenido' | 'actividad' | 'foro' | 'evaluacion';

export interface ElementoCapturedData {
  tipoElemento: TipoElemento;
  tipoLabel: string;
  isFromModulo: boolean;
  nombre: string;
  descripcion?: string;
  contenidoHtml?: string;
  archivo?: File | null;
  fechaInicio?: string;
  fechaFin?: string;
  formData: any;
}

interface AgregarElementoDialogProps {
  open: boolean;
  onClose?: () => void;
  onSave?: (data: ElementoCapturedData) => void;
  isFromModulo?: boolean; // Prop para indicar si se está agregando desde un módulo
  modulo?: ModulosResponse | null; // ID de la lección para asociar el recurso
}

export const AgregarElementoDialog: React.FC<AgregarElementoDialogProps> = ({
  open,
  onClose,
  onSave,
  isFromModulo = false, // Valor por defecto
  modulo,
}) => {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState<StepType>('menu');
  const [tipoRecurso, setTipoRecurso] = useState<number | null>(null);

  // Resetear estados al cerrar
  const handleClose = () => {
    setCurrentStep('menu');
    onClose?.();
  };

  const handleBack = () => {
    setCurrentStep('menu');
  };

  const getTipoLabel = (step: StepType): string => {
    switch (step) {
      case 'contenido':
        return 'Contenido';
      case 'actividad':
        return 'Actividad';
      case 'foro':
        return 'Foro';
      case 'evaluacion':
        return 'Evaluación';
      default:
        return '';
    }
  };

  const handleFormSubmit = async (formData: any) => {
    if (currentStep === 'menu') return;

    const titulo = formData?.titulo || formData?.nombre || '';
    const descripcion_html = formData?.descripcion_html || formData?.descripcion || formData?.contenidoHtml || '';
    const file = formData?.file || formData?.archivo || null;

    const resultData: ElementoCapturedData = {
      tipoElemento: currentStep,
      tipoLabel: getTipoLabel(currentStep),
      isFromModulo,
      nombre: titulo,
      descripcion: descripcion_html,
      contenidoHtml: descripcion_html,
      archivo: file,
      fechaInicio: formData?.fechaInicio || '',
      fechaFin: formData?.fechaFin || '',
      formData,
    };

    const leccionId = modulo?.id_leccion || modulo?.id_modulo;

    if (!isFromModulo && leccionId) {
      try {
        await CreateRecurso(leccionId, {
          id_recurso: 0,
          id_leccion: leccionId,
          titulo: titulo,
          id_tipo_recurso: tipoRecurso!,
          package_uuid: '',
          descripcion_html: descripcion_html,
          url: formData?.url || '',
          tipo_material: formData?.tipo_material || '',
          tipo_examen: formData?.tipo_examen || '',
          file: file,
        });
        await queryClient.invalidateQueries({
          queryKey: [MODULOS_CURSOS.GET_LISTAR_RECURSOS_MODULO.key],
        });
      } catch (error) {
        console.error("Error al registrar el recurso:", error);
      }
    }

    onSave?.(resultData);
    handleClose();
  };

  // Opciones del Menú Principal
  const options = [
    {
      id: 'contenido',
      title: 'Contenido',
      description: 'PDF, video, HTML, SCORM o enlace',
      icon: <DescriptionOutlinedIcon sx={{ color: '#2563EB', fontSize: 22 }} />,
      bgColor: '#EEF2FF',
      tipoRecurso: 3
     },
    {
      id: 'actividad',
      title: 'Actividad',
      description: 'Tarea o práctica evaluable',
      icon: <AssignmentOutlinedIcon sx={{ color: '#9333EA', fontSize: 22 }} />,
      bgColor: '#F3E8FF',
      tipoRecurso: 1
    },
    {
      id: 'foro',
      title: 'Foro',
      description: 'Discusión entre alumnos',
      icon: <ChatBubbleOutlineIcon sx={{ color: '#06B6D4', fontSize: 22 }} />,
      bgColor: '#E0F2FE',
      tipoRecurso: 5
    },
    {
      id: 'evaluacion',
      title: 'Evaluación',
      description: 'Examen o quiz calificable',
      icon: <QuizOutlinedIcon sx={{ color: '#D97706', fontSize: 22 }} />,
      bgColor: '#FEF3C7',
      tipoRecurso: 2
    }
  ];

  // ==========================================
  // RENDER: MENÚ DE SELECCIÓN
  // ==========================================
  const renderMenuStep = () => (
    <Box>
      {/* HEADER DEL DIÁLOGO */}
      <Box
        sx={{
          pb: 2,
          mb: 2,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827', fontSize: '1.15rem', lineHeight: 1.2 }}>
            Agregar elemento
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.83rem', mt: 0.3 }}>
            Selecciona el tipo de elemento que deseas crear
          </Typography>
        </Box>

        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: '#6B7280', p: 0.5, '&:hover': { backgroundColor: '#F3F4F6' } }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Stack spacing={1.5}>
        {options.map((opt) => (
          <Paper
            key={opt.id}
            elevation={0}
            onClick={() => {
              setCurrentStep(opt.id as StepType);
              setTipoRecurso(opt.tipoRecurso);
            }}
            sx={{
              p: 1.8,
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              '&:hover': {
                backgroundColor: '#F9FAFB',
                borderColor: '#D1D5DB',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  backgroundColor: opt.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {opt.icon}
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2, fontSize: '0.95rem' }}>
                  {opt.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.8rem', mt: 0.2, display: 'block' }}>
                  {opt.description}
                </Typography>
              </Box>
            </Stack>
            <ChevronRightIcon sx={{ color: '#9CA3AF', fontSize: 20 }} />
          </Paper>
        ))}
      </Stack>
    </Box>
  );

  const renderFileUploadStep = () => <ContenidoEvaluacionForm onBack={handleBack} onClose={handleClose} onSubmit={handleFormSubmit} />;
  const renderHtmlStep = () => <ActividadForoForm onBack={handleBack} onClose={handleClose} onSubmit={handleFormSubmit} />;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '20px',
            p: 1,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.12)'
          }
        }
      }}
    >
      <DialogContent sx={{ p: 2 }}>
        {currentStep === 'menu' && renderMenuStep()}
        {(currentStep === 'contenido' || currentStep === 'evaluacion') && renderFileUploadStep()}
        {currentStep === 'actividad' && renderHtmlStep()}
        {currentStep === 'foro' && renderHtmlStep()}
      </DialogContent>
    </Dialog>
  );
};