import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Stack,
  Divider,
  Collapse,
  Switch
} from '@mui/material';

// Iconos MUI
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

import { AgregarElementoDialog } from '../Dialogs/AgregarElementoDialog/AgregarElementoDialog';
import type { ViewMode } from './res_CursoCard';
import type { ModuleData } from '../../../types/Cursos.interface';
import { ModuleItem } from './ModuleItem';

interface CourseCardProps {
  data: any;
  viewMode?: ViewMode;
  isExpanded?: boolean;
  onToggleExpand?: (isExpanded: boolean) => void;
  onView?: () => void;
  onEdit?: () => void;
  onAddModule?: () => void;
  onAddElement?: (moduleId: string | number, elementData: any) => void;
}

export const CursoCard: React.FC<CourseCardProps> = ({
  data,
  viewMode = 'grid',
  isExpanded = false,
  onToggleExpand,
  onView,
  onEdit,
  onAddModule,
  onAddElement
}) => {
  // Estado para controlar qué módulo tiene abierto el diálogo de "Agregar elemento"
  const [activeModuleForAdd, setActiveModuleForAdd] = useState<ModuleData | null>(null);

  // Estado para controlar la apertura individual de N módulos
  const [expandedModules, setExpandedModules] = useState<Record<string | number, boolean>>({});

  // Módulos mock o desde props si vienen en data
  const modulesList: ModuleData[] = data.modules || [
    {
      id: 1,
      title: 'Módulo 1 — Introducción',
      status: 'Publicado',
      isMandatory: false,
      items: [
        { id: 'item-1', sectionTitle: 'CONTENIDO', title: 'Presentación del módulo — Mód. 1', format: 'PDF', type: 'article' },
        { id: 'item-2', sectionTitle: 'ACTIVIDAD', title: 'Actividad diagnóstica — Mód. 1', format: 'SCORM', type: 'assignment' },
        { id: 'item-3', sectionTitle: 'FORO', title: 'Foro de discusión — Mód. 1', format: 'HTML', type: 'forum' },
        { id: 'item-4', sectionTitle: 'EVALUACIONES', title: 'Evaluación final — Mód. 1', format: 'JSON', type: 'quiz' }
      ]
    }
  ];

  const handleExpandToggle = () => {
    onToggleExpand?.(!isExpanded);
  };

  const handleViewClick = () => {
    handleExpandToggle();
    onView?.();
  };

  const toggleModuleCollapse = (moduleId: string | number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: prev[moduleId] !== undefined ? !prev[moduleId] : false // Por defecto true para el primer render
    }));
  };

  const handleOpenAddDialog = (module: ModuleData) => {
    setActiveModuleForAdd(module);
  };

  const handleCloseAddDialog = () => {
    setActiveModuleForAdd(null);
  };

  const handleSaveElement = (elementData: any) => {
    if (activeModuleForAdd) {
      onAddElement?.(activeModuleForAdd.id, elementData);
    }
    handleCloseAddDialog();
  };

  // Helper para renderizar los iconos según tipo de ítem
  const renderItemIcon = (type?: string) => {
    switch (type) {
      case 'assignment':
        return <AssignmentOutlinedIcon sx={{ color: '#7C3AED', fontSize: 18 }} />;
      case 'forum':
        return <ChatBubbleOutlineIcon sx={{ color: '#0284C7', fontSize: 18 }} />;
      case 'quiz':
        return <QuizOutlinedIcon sx={{ color: '#D97706', fontSize: 18 }} />;
      case 'article':
      default:
        return <ArticleOutlinedIcon sx={{ color: '#D97706', fontSize: 18 }} />;
    }
  };

  // ==========================================
  // RENDER: VISTA DESPLEGADA COMPLETA (FULL DETAIL)
  // ==========================================
  const renderExpandedDetailView = () => (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        width: '100%',
        mb: 2
      }}
    >
      {/* Header Expandido */}
      <Box
        sx={{
          p: 1.5,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          borderBottom: '1px solid #F3F4F6'
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton size="small" onClick={handleExpandToggle} sx={{ color: '#9CA3AF' }}>
            <KeyboardArrowDownIcon />
          </IconButton>

          <Chip
            label={data.id}
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
              {data.title}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PersonOutlineIcon sx={{ fontSize: 14, color: '#9CA3AF' }} />
              <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                {data.author}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          {data.period && <Chip label={data.period} size="small" sx={{ backgroundColor: '#F3F4F6', color: '#4B5563' }} />}
          {data.isMandatory && <Chip label="Obligatorio" size="small" variant="outlined" sx={{ borderColor: '#BFDBFE', color: '#2563EB', backgroundColor: '#EFF6FF' }} />}
          <Chip label={data.status || 'Publicado'} size="small" variant="outlined" sx={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4' }} />
          <Chip label={`${data.modulesCount} mód.`} size="small" variant="outlined" sx={{ borderColor: '#FECDD3', color: '#E11D48', backgroundColor: '#FFF1F2' }} />

          <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
            <IconButton size="small" onClick={handleExpandToggle} sx={{ border: '1px solid #E5E7EB', borderRadius: '8px' }}>
              <VisibilityOutlinedIcon sx={{ fontSize: 18, color: '#6B7280' }} />
            </IconButton>
            <Button variant="outlined" size="small" startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />} onClick={onEdit} sx={{ borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '8px' }}>
              Editar
            </Button>
            <Button variant="outlined" size="small" startIcon={<AddIcon sx={{ fontSize: 16 }} />} onClick={onAddModule} sx={{ borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '8px' }}>
              Agregar módulo
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Contenido Completo del Detalle */}
      <Box sx={{ p: 2.5, backgroundColor: '#FAFAFA' }}>
        {/* Información de la Materia */}
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
              {data.description || 'Introduce los principios básicos de la administración moderna: planeación, organización, dirección y control aplicados a contextos empresariales reales.'}
            </Typography>
          </Paper>
        </Box>

        {/* RENDEREADO DINÁMICO DE N MÓDULOS */}
        {modulesList.map((module) => {
          const isModuleExpanded = expandedModules[module.id] ?? true;

          return (
            <Paper key={module.id} elevation={0} sx={{ borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', mb: 2 }}>
              <Box sx={{ p: 1.5, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
                <Stack direction="row" spacing={1} alignItems="center" onClick={() => toggleModuleCollapse(module.id)} sx={{ cursor: 'pointer' }}>
                  {isModuleExpanded ? <KeyboardArrowDownIcon sx={{ color: '#9CA3AF' }} /> : <KeyboardArrowRightIcon sx={{ color: '#9CA3AF' }} />}
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                    {module.title}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip label={module.status || 'Publicado'} size="small" variant="outlined" sx={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4', height: '24px', fontSize: '0.75rem' }} />
                  <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
                  <IconButton size="small"><FileDownloadOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
                  <IconButton size="small"><ContentCopyOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
                  <IconButton size="small"><VisibilityOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} /></IconButton>
                </Stack>
              </Box>

              <Collapse in={isModuleExpanded}>
                <Box sx={{ p: 2, backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#6B7280' }}>
                        ACCIONES DEL MÓDULO
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenAddDialog(module)} // 👈 PASA EL MÓDULO AL ESTADO
                        sx={{ backgroundColor: '#111827', color: '#FFF', borderRadius: '20px', textTransform: 'none', fontSize: '0.75rem', py: 0.5, px: 2, '&:hover': { backgroundColor: '#1F2937' } }}
                      >
                        Agregar elemento
                      </Button>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.8rem' }}>
                        Marcar como obligatorio
                      </Typography>
                      <Switch size="small" defaultChecked={module.isMandatory} />
                    </Stack>
                  </Stack>

                  <Stack spacing={2}>
                    {module.items?.map((item) => (
                      <ModuleItem
                        key={item.id}
                        sectionTitle={item.sectionTitle}
                        title={item.title}
                        format={item.format}
                        icon={renderItemIcon(item.type)}
                      />
                    ))}
                  </Stack>
                </Box>
              </Collapse>
            </Paper>
          );
        })}
      </Box>

      {/* DIÁLOGO ÚNICO COMPARTIDO PARA CUALQUIER MÓDULO */}
      <AgregarElementoDialog
        open={Boolean(activeModuleForAdd)}
        onClose={handleCloseAddDialog}
        onSave={handleSaveElement}
      />
    </Paper>
  );

  // SI ESTÁ EXPANDIDO: Muestra la vista horizontal extendida
  if (isExpanded) {
    return renderExpandedDetailView();
  }

  // ==========================================
  // RENDER 1: VISTA EN CUADRÍCULA (GRID CARD)
  // ==========================================
  if (viewMode === 'grid') {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: '20px',
          border: '1px solid',
          borderColor: '#E5E7EB',
          backgroundColor: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: '#D1D5DB',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.03)'
          }
        }}
      >
        {/* Fila Superior: Badge ID + Tag Obligatorio */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip
            label={data.id}
            size="small"
            sx={{
              backgroundColor: '#EAEAEA',
              color: '#555555',
              fontWeight: 700,
              fontSize: '0.75rem',
              borderRadius: '8px',
              height: '30px',
              px: 0.5,
              fontFamily: 'monospace'
            }}
          />
          {data.isMandatory && (
            <Chip
              label="Obligatorio"
              size="small"
              variant="outlined"
              sx={{
                borderColor: '#BFDBFE',
                color: '#2563EB',
                backgroundColor: '#EFF6FF',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '12px',
                height: '24px'
              }}
            />
          )}
        </Stack>

        {/* Fila Central: Título y Autor */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: '#111827', fontSize: '1rem', lineHeight: 1.3 }}
          >
            {data.title}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <PersonOutlineIcon sx={{ fontSize: 16, color: '#9CA3AF' }} />
            <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '0.825rem' }}>
              {data.author}
            </Typography>
          </Stack>
        </Box>

        {/* Fila de Badges de Estatus */}
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          {data.publishedCount !== undefined && (
            <Chip label={`${data.publishedCount} publicados`} size="small" variant="outlined" sx={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4', fontSize: '0.75rem', fontWeight: 600, borderRadius: '12px', height: '24px' }} />
          )}
          {data.draftCount !== undefined && (
            <Chip label={`${data.draftCount} borrador`} size="small" variant="outlined" sx={{ borderColor: '#E5E7EB', color: '#6B7280', backgroundColor: '#F9FAFB', fontSize: '0.75rem', fontWeight: 500, borderRadius: '12px', height: '24px' }} />
          )}
          {data.unpublishedCount !== undefined && (
            <Chip label={`${data.unpublishedCount} sin publicar`} size="small" variant="outlined" sx={{ borderColor: '#FECDD3', color: '#E11D48', backgroundColor: '#FFF1F2', fontSize: '0.75rem', fontWeight: 500, borderRadius: '12px', height: '24px' }} />
          )}
        </Stack>

        <Divider sx={{ my: 0.5, borderColor: '#F3F4F6' }} />

        {/* Fila Inferior: Conteo de Módulos + Botones de Acción */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500, fontSize: '0.875rem', fontFamily: 'monospace' }}>
            {data.modulesCount} módulos
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
              onClick={onEdit}
              sx={{ borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '10px', px: 1.5, height: '32px', fontSize: '0.8rem', fontWeight: 500, '&:hover': { borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' } }}
            >
              Editar
            </Button>

            <Button
              variant="outlined"
              size="small"
              endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />}
              onClick={handleViewClick}
              sx={{ borderColor: '#E5E7EB', color: '#4B5563', textTransform: 'none', borderRadius: '10px', px: 1.5, height: '32px', fontSize: '0.8rem', fontWeight: 500, '&:hover': { borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' } }}
            >
              Ver curso
            </Button>
          </Stack>
        </Stack>
      </Paper>
    );
  }

  // ==========================================
  // RENDER 2: VISTA EN LISTA (LIST ROW)
  // ==========================================
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        px: 2,
        borderRadius: '16px',
        border: '1px solid',
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        flexWrap: 'wrap'
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 280 }}>
        <IconButton size="small" onClick={handleExpandToggle} sx={{ color: '#9CA3AF', p: 0.5 }}>
          <KeyboardArrowRightIcon />
        </IconButton>

        <Chip label={data.id} size="small" sx={{ backgroundColor: '#EAEAEA', color: '#555555', fontWeight: 700, fontSize: '0.75rem', borderRadius: '6px', height: '28px', fontFamily: 'monospace' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>
            {data.title}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <PersonOutlineIcon sx={{ fontSize: 15, color: '#9CA3AF' }} />
            <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
              {data.author}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
        {data.period && <Chip label={data.period} size="small" sx={{ backgroundColor: '#F3F4F6', color: '#4B5563', fontSize: '0.8rem', borderRadius: '12px' }} />}
        {data.isMandatory && <Chip label="Obligatorio" size="small" variant="outlined" sx={{ borderColor: '#BFDBFE', color: '#2563EB', backgroundColor: '#EFF6FF', fontSize: '0.8rem', borderRadius: '12px' }} />}
        {data.status && <Chip label={data.status} size="small" variant="outlined" sx={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4', fontSize: '0.8rem', borderRadius: '12px' }} />}
        <Chip label={`${data.modulesCount} mód.`} size="small" variant="outlined" sx={{ borderColor: '#FECDD3', color: '#E11D48', backgroundColor: '#FFF1F2', fontSize: '0.8rem', borderRadius: '12px' }} />

        <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
          <IconButton size="small" onClick={handleViewClick} sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', p: '5px', color: '#6B7280' }}>
            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Button variant="outlined" size="small" startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />} onClick={onEdit} sx={{ borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '8px' }}>
            Editar
          </Button>
          <Button variant="outlined" size="small" startIcon={<AddIcon sx={{ fontSize: 16 }} />} onClick={onAddModule} sx={{ borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '8px' }}>
            Agregar módulo
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};