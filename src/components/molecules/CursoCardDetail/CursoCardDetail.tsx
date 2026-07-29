import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Stack,
  Collapse,
  Switch,
} from '@mui/material';

// Iconos MUI
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

// Interfaz de Datos
export interface CourseDetailData {
  id: string;
  title: string;
  author: string;
  period: string;
  isMandatory?: boolean;
  status: 'Publicado' | 'Borrador';
  modulesCount: number;
  description: string;
}

const mockDetailData: CourseDetailData = {
  id: '#ID-0001',
  title: 'Fundamentos de Administración',
  author: 'Ana Belén Ávila',
  period: 'Ene-Jun 2026',
  isMandatory: true,
  status: 'Publicado',
  modulesCount: 10,
  description: 'Introduce los principios básicos de la administración moderna: planeación, organización, dirección y control aplicados a contextos empresariales reales.'
};

export const CursoCardDetail: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Estado desplegado por defecto
  const [module1Expanded, setModule1Expanded] = useState(true);
  const [isMandatorySwitch, setIsMandatorySwitch] = useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '20px',
        border: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* 1. ENCABEZADO PRINCIPAL DEL CURSO */}
      <Box
        sx={{
          p: 2,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)} sx={{ color: '#9CA3AF' }}>
            {isExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>

          <Chip
            label={mockDetailData.id}
            size="small"
            sx={{
              backgroundColor: '#EAEAEA',
              color: '#555555',
              fontWeight: 700,
              fontSize: '0.75rem',
              borderRadius: '6px',
              fontFamily: 'monospace'
            }}
          />

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
              {mockDetailData.title}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PersonOutlineIcon sx={{ fontSize: 14, color: '#9CA3AF' }} />
              <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                {mockDetailData.author}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Badges y Acciones */}
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <Chip label={mockDetailData.period} size="small" sx={{ backgroundColor: '#F3F4F6', color: '#4B5563' }} />
          <Chip label="Obligatorio" size="small" variant="outlined" sx={{ borderColor: '#BFDBFE', color: '#2563EB', backgroundColor: '#EFF6FF' }} />
          <Chip label={mockDetailData.status} size="small" variant="outlined" sx={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4' }} />
          <Chip label={`${mockDetailData.modulesCount} mód.`} size="small" variant="outlined" sx={{ borderColor: '#FECDD3', color: '#E11D48', backgroundColor: '#FFF1F2' }} />

          <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
            <IconButton size="small" sx={{ border: '1px solid #E5E7EB', borderRadius: '8px' }}>
              <VisibilityOutlinedIcon sx={{ fontSize: 18, color: '#6B7280' }} />
            </IconButton>
            <Button variant="outlined" size="small" startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />} sx={{ borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '8px' }}>
              Editar
            </Button>
            <Button variant="outlined" size="small" startIcon={<AddIcon sx={{ fontSize: 16 }} />} sx={{ borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '8px' }}>
              Agregar módulo
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* 2. CONTENIDO DESPLEGABLE (DETALLE) */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ px: 2.5, pb: 3, pt: 1, backgroundColor: '#FAFAFA' }}>
          
          {/* Seccion: Información de la Materia */}
          <Box sx={{ mb: 2.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Stack direction="row" spacing={0.8} alignItems="center">
                <InfoOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#6B7280', letterSpacing: '0.5px' }}>
                  INFORMACIÓN DE LA MATERIA
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 600, fontSize: '0.7rem' }}>
                FIJO · NO EDITABLE
              </Typography>
            </Stack>

            <Paper elevation={0} sx={{ p: 2, borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
              <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                {mockDetailData.description}
              </Typography>
            </Paper>
          </Box>

          {/* 3. MÓDULO 1 (ACORDEÓN HIJO) */}
          <Paper elevation={0} sx={{ borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', mb: 2 }}>
            <Box sx={{ p: 1.5, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
              <Stack direction="row" spacing={1} alignItems="center" onClick={() => setModule1Expanded(!module1Expanded)} sx={{ cursor: 'pointer' }}>
                {module1Expanded ? <KeyboardArrowDownIcon sx={{ color: '#9CA3AF' }} /> : <KeyboardArrowRightIcon sx={{ color: '#9CA3AF' }} />}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                  Módulo 1 — Introducción
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label="Publicado" size="small" variant="outlined" sx={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4', height: '24px', fontSize: '0.75rem' }} />
                <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
                <IconButton size="small"><FileDownloadOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
                <IconButton size="small"><ContentCopyOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
                <IconButton size="small"><VisibilityOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
              </Stack>
            </Box>

            {/* Contenido del Módulo 1 */}
            <Collapse in={module1Expanded}>
              <Box sx={{ p: 2, backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
                
                {/* Barra de Acciones del Módulo */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#6B7280' }}>
                      ACCIONES DEL MÓDULO
                    </Typography>
                    <Button variant="contained" size="small" startIcon={<AddIcon />} sx={{ backgroundColor: '#111827', color: '#FFF', borderRadius: '20px', textTransform: 'none', fontSize: '0.75rem', py: 0.5, px: 2, '&:hover': { backgroundColor: '#1F2937' } }}>
                      Agregar elemento
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.8rem' }}>
                      Marcar como obligatorio
                    </Typography>
                    <Switch size="small" checked={isMandatorySwitch} onChange={(e) => setIsMandatorySwitch(e.target.checked)} />
                  </Stack>
                </Stack>

                {/* Lista de Secciones Internas */}
                <Stack spacing={2}>
                  <ModuleItem sectionTitle="CONTENIDO" title="Presentación del módulo — Mód. 1" format="PDF" icon={<ArticleOutlinedIcon sx={{ color: '#D97706', fontSize: 18 }} />} />
                  <ModuleItem sectionTitle="ACTIVIDAD" title="Actividad diagnóstica — Mód. 1" format="SCORM" icon={<AssignmentOutlinedIcon sx={{ color: '#7C3AED', fontSize: 18 }} />} />
                  <ModuleItem sectionTitle="FORO" title="Foro de discusión — Mód. 1" format="HTML" icon={<ChatBubbleOutlineIcon sx={{ color: '#0284C7', fontSize: 18 }} />} />
                  <ModuleItem sectionTitle="EVALUACIONES" title="Evaluación final — Mód. 1" format="JSON" icon={<QuizOutlinedIcon sx={{ color: '#D97706', fontSize: 18 }} />} />
                </Stack>
              </Box>
            </Collapse>
          </Paper>

          {/* 4. MÓDULO 2 (CERRADO) */}
          <Paper elevation={0} sx={{ borderRadius: '12px', border: '1px solid #E5E7EB', p: 1.5, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <KeyboardArrowRightIcon sx={{ color: '#9CA3AF' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                Módulo 2 — Marco Conceptual
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label="Publicado" size="small" variant="outlined" sx={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4', height: '24px', fontSize: '0.75rem' }} />
              <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
              <IconButton size="small"><FileDownloadOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
              <IconButton size="small"><ContentCopyOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
              <IconButton size="small"><VisibilityOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
            </Stack>
          </Paper>

        </Box>
      </Collapse>
    </Paper>
  );
};

// Sub-componente Auxiliar para Filas de Contenido/Actividades
interface ModuleItemProps {
  sectionTitle: string;
  title: string;
  format: string;
  icon: React.ReactNode;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ sectionTitle, title, format, icon }) => {
  return (
    <Box>
      <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 0.8 }}>
        {icon}
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#6B7280', letterSpacing: '0.5px' }}>
          {sectionTitle}
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 1.2,
          px: 2,
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <InsertDriveFileOutlinedIcon sx={{ fontSize: 18, color: '#EF4444' }} />
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1F2937', fontSize: '0.875rem' }}>
            {title}
          </Typography>
          <Chip label={format} size="small" sx={{ height: '20px', fontSize: '0.65rem', fontWeight: 700, backgroundColor: '#F3F4F6', color: '#6B7280' }} />
        </Stack>

        <Stack direction="row" spacing={0.5}>
          <IconButton size="small"><VisibilityOutlinedIcon sx={{ fontSize: 16, color: '#9CA3AF' }} /></IconButton>
          <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 16, color: '#9CA3AF' }} /></IconButton>
          <IconButton size="small"><FileDownloadOutlinedIcon sx={{ fontSize: 16, color: '#9CA3AF' }} /></IconButton>
          <IconButton size="small"><RocketLaunchOutlinedIcon sx={{ fontSize: 16, color: '#10B981' }} /></IconButton>
          <IconButton size="small"><DeleteOutlineOutlinedIcon sx={{ fontSize: 16, color: '#EF4444' }} /></IconButton>
        </Stack>
      </Paper>
    </Box>
  );
};