import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Paper,
  Stack
} from '@mui/material';

// Iconos MUI
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';
import { ContenidoEvaluacionForm } from './ContenidoEvaluacionForm';
import { ActividadForoForm } from './ActividadForoForm';

type StepType = 'menu' | 'contenido' | 'actividad' | 'foro' | 'evaluacion';

interface AgregarElementoDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export const AgregarElementoDialog: React.FC<AgregarElementoDialogProps> = ({
  open,
  onClose,
  onSave
}) => {
  const [currentStep, setCurrentStep] = useState<StepType>('menu');
  const [elementName, setElementName] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  // Resetear estados al cerrar
  const handleClose = () => {
    setCurrentStep('menu');
    setElementName('');
    setHtmlContent('');
    onClose();
  };

  const handleBack = () => {
    setCurrentStep('menu');
  };

  const handleSave = () => {
    onSave?.({ step: currentStep, name: elementName, htmlContent });
    handleClose();
  };

  // Opciones del Menú Principal
  const options = [
    {
      id: 'contenido',
      title: 'Contenido',
      description: 'PDF, video, HTML, SCORM o enlace',
      icon: <DescriptionOutlinedIcon sx={{ color: '#E11D48' }} />,
      bgColor: '#FFE4E6'
    },
    {
      id: 'actividad',
      title: 'Actividad',
      description: 'Tarea o práctica evaluable',
      icon: <AssignmentOutlinedIcon sx={{ color: '#7C3AED' }} />,
      bgColor: '#F3E8FF'
    },
    {
      id: 'foro',
      title: 'Foro',
      description: 'Discusión entre alumnos',
      icon: <ChatOutlinedIcon sx={{ color: '#0284C7' }} />,
      bgColor: '#E0F2FE'
    },
    {
      id: 'evaluacion',
      title: 'Evaluación',
      description: 'Examen o quiz calificable',
      icon: <QuizOutlinedIcon sx={{ color: '#D97706' }} />,
      bgColor: '#FEF3C7'
    }
  ];

  // ==========================================
  // RENDER: MENÚ DE SELECCIÓN
  // ==========================================
  const renderMenuStep = () => (
    <Box>
      <HeaderDialog titulo="Agregar elemento" descripcion='Selecciona el tipo de elemento que deseas crear' onClose={handleClose} />

      <Stack spacing={2}>
        {options.map((opt) => (
          <Paper
            key={opt.id}
            elevation={0}
            onClick={() => {
              setCurrentStep(opt.id as StepType);
              // Asignar placeholders según diseño
              if (opt.id === 'contenido' || opt.id === 'evaluacion') setElementName('');
            }}
            sx={{
              p: 2,
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              backgroundColor: '#FAFAFA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: '#F3F4F6',
                borderColor: '#E5E7EB'
              }
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  backgroundColor: opt.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {opt.icon}
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
                  {opt.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
                  {opt.description}
                </Typography>
              </Box>
            </Stack>
            <ChevronRightIcon sx={{ color: '#9CA3AF' }} />
          </Paper>
        ))}
      </Stack>
    </Box>
  );

  // ==========================================
  // RENDER: VISTA SUBIR ARCHIVO (Contenido / Evaluación)
  // ==========================================
  const renderFileUploadStep = () => <ContenidoEvaluacionForm onBack={handleBack} onClose={handleClose} onSubmit={handleSave} />;

  // ==========================================
  // RENDER: VISTA CONTENIDO HTML (Actividad / Foro)
  // ==========================================
  const renderHtmlStep = () => <ActividadForoForm onBack={handleBack} onClose={handleClose} onSubmit={handleSave} />;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
            sx: {
            borderRadius: '24px',
            width: '460px',
            p: 1.5,
            boxShadow: '0px 10px 30px rgba(0,0,0,0.08)'
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