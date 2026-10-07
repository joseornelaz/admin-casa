import React, { useCallback, useEffect, useState } from 'react';
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
  Switch,
  Tooltip,
  Checkbox,
  LinearProgress,
  type SxProps,
  type Theme,
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
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

import { AgregarElementoDialog } from '../Dialogs/AgregarElementoDialog/AgregarElementoDialog';
import type { Curso, ViewMode, ModulosResponse } from '../../../types/Cursos.interface';
import { ModuleItem } from './ModuleItem';
import { GetCursoContenido } from '../../../services/CursosService';
import { LoadingDialog } from '../Dialogs/LoadingDialog/LoadingDialog';
import { EditarModuloDialog } from '../Dialogs/EditarModuloDialog/EditarModuloDialog';

interface CourseCardProps {
  data: Curso;
  viewMode?: ViewMode;
  isExpanded?: boolean;
  onToggleExpand?: (isExpanded: boolean) => void;
  onView?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onAddModule?: () => void;
  onAddElement?: (moduleId: string | number, elementData: any) => void;
}

interface StatusChipProps {
  label: string;
  styles?: SxProps<Theme>;
  variant?: 'outlined' | 'filled';
}

export const CursoCard: React.FC<CourseCardProps> = ({
  data,
  viewMode = 'grid',
  isExpanded = false,
  onToggleExpand,
  onView,
  onEdit,
  onDuplicate,
  onAddModule,
  onAddElement
}) => {
  // Estado para controlar qué módulo tiene abierto el diálogo de "Agregar elemento"
  const [activeModuleForAdd, setActiveModuleForAdd] = useState<ModulosResponse | null>(null);
  const [activeModuleForEdit, setActiveModuleForEdit] = useState<ModulosResponse | null>(null);

  // Estado para controlar la apertura individual de N módulos
  const [expandedModules, setExpandedModules] = useState<Record<string | number, boolean>>({});

  const isMandatory = true; // Falta traer el valor real desde la API para determinar si es obligatorio o no

  const [idCurso, setIdCurso] = useState<number | null>(null);

  const { modulos, recursosPorModulo, lecciones, isSuccess, isLoading: isCursoContenidoLoading } = GetCursoContenido(idCurso ?? 0, {
      enabled: !!idCurso,
  });

  const handleExpandToggle = useCallback((nextExpanded?: boolean) => {
    const targetExpanded = nextExpanded !== undefined ? nextExpanded : !isExpanded;
    if (targetExpanded) {
      setIdCurso(data.id_curso ?? null);
    }
    onToggleExpand?.(targetExpanded);
  }, [data.id_curso, isExpanded, onToggleExpand]);

  const toggleModuleCollapse = useCallback((moduleId: string | number) => {
    setExpandedModules((prev) => {
      const isCurrentlyExpanded = prev[moduleId];
      if (isCurrentlyExpanded) {
        return {
          ...prev,
          [moduleId]: false
        };
      } else {
        return {
          [moduleId]: true
        };
      }
    });
  }, []);

  useEffect(() => {
    if (isSuccess && modulos.length > 0) {
      setExpandedModules((prev) => {
        const hasExpanded = Object.values(prev).some(Boolean);
        if (!hasExpanded) {
          return { [modulos[0].id_modulo]: true };
        }
        return prev;
      });
    }
  }, [isSuccess, modulos]);

  const handleViewClick = () => {
    setIdCurso(data.id_curso ?? null);
    onToggleExpand?.(true);
    onView?.();
  };

  const handleGetModuleContent = (moduleId: string | number) => {
    toggleModuleCollapse(moduleId);
  };

  const handleOpenAddDialog = (module: ModulosResponse) => {
    const idLeccion = lecciones.find((leccion) => leccion.idModulo === module.id_modulo)?.idLeccion ?? null;
    
    setActiveModuleForAdd({...module, id_leccion: idLeccion});
  };

  const handleCloseAddDialog = () => {
    setActiveModuleForAdd(null);
  };

  const handleSaveElement = (elementData: any) => {
    if (activeModuleForAdd) {
      onAddElement?.(activeModuleForAdd.id_modulo, elementData);
    }
    handleCloseAddDialog();
  };

  const handleEditarModulo = (module: ModulosResponse) => {
    setActiveModuleForEdit(module);
  };

  const handleCloseEditDialog = () => {
    setActiveModuleForEdit(null);
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

  const StatusChip: React.FC<StatusChipProps> = ({
    label,
    styles,
    variant = 'outlined'
  }) => (
    <Chip
      label={label}
      size="small"
      variant={variant}
      sx={{...styles, fontSize: '0.75rem', fontWeight: 500, borderRadius: '12px', height: '20px'}}
    />
  );

  const headerAcordion = () => (
    <>
      <Box
        sx={{
          p: 1,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          borderBottom: isExpanded ? '1px solid #F3F4F6' : 'none'
        }}
      >
        {/* Lado izquierdo */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Checkbox size="small" sx={{ p: 0, color: '#D1D5DB', '&.Mui-checked': { color: '#2563EB' } }} />

          <IconButton size="small" onClick={() => handleExpandToggle()} sx={{ color: '#9CA3AF', p: 0.5 }}>
            {isExpanded ? <KeyboardArrowDownIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />}
          </IconButton>

          <Chip
            label={`#ID-${data.id_curso}`}
            size="small"
            sx={{
              backgroundColor: '#EAEAEA',
              color: '#555555',
              fontWeight: 700,
              fontSize: '0.75rem',
              borderRadius: '8px',
              height: '32px',
              px: 0.5,
              fontFamily: 'monospace'
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2, fontSize: '0.95rem' }}>
              {data?.titulo || ''}
            </Typography>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <PersonOutlineIcon sx={{ fontSize: 15, color: '#9CA3AF' }} />
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
                {'No asignado'}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.3 }}>
              <LinearProgress
                variant="determinate"
                value={100}
                sx={{
                  width: 100,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#E5E7EB',
                  '& .MuiLinearProgress-bar': { backgroundColor: '#C2410C', borderRadius: 2 }
                }}
              />
              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                {data?.total_modulos || '0'} mód.
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Lado derecho */}
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ ml: 'auto' }}>
          <StatusChip 
            label={'Ene-Jun 2026'} // Falta traer el periodo real desde la API
            styles={{ backgroundColor: '#F3F4F6', color: '#4B5563' }}
            variant="filled"
          />

          <StatusChip
            label={'Obligatorio'} // Falta traer el valor real desde la API
            styles={{ borderColor: '#BFDBFE', color: '#2563EB', backgroundColor: '#EFF6FF' }}
          />

          <StatusChip
            label={data?.estado_curso || 'Publicado'}
            styles={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4', mr: 1 }}
          />
          
          <Tooltip title="Vista previa" arrow placement="top">
            <IconButton size="small" onClick={handleViewClick} sx={{ p: '5px', color: '#6B7280' }}>
              <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Descargar" arrow placement="top">
            <IconButton size="small" sx={{ p: '5px', color: '#6B7280' }}>
              <FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Sincronizar" arrow placement="top">
            <IconButton size="small" sx={{ p: '5px', color: '#16A34A' }}>
              <CloudQueueIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            size="small"
            startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={onEdit}
            sx={{ background: 'transparent', borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '8px', height: '32px', fontSize: '0.8rem', px: 1.5 }}
          >
            Editar
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            onClick={onAddModule}
            sx={{ background: 'transparent', borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '8px', height: '32px', fontSize: '0.8rem', px: 1.5 }}
          >
            Agregar módulo
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentCopyOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={onDuplicate}
            sx={{ background: 'transparent', borderColor: '#E5E7EB', color: '#6B7280', textTransform: 'none', borderRadius: '8px', height: '32px', fontSize: '0.8rem', px: 1.5 }}
          >
            Duplicar
          </Button>
        </Stack>
      </Box>
    </>
  );


  // ==========================================
  // RENDER: VISTA DESPLEGADA COMPLETA (FULL DETAIL)
  // ==========================================
  const renderExpandedDetailView = () => (
    <>
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
      {
        headerAcordion()
      }
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
              {data.descripcion || 'Introduce los principios básicos de la administración moderna: planeación, organización, dirección y control aplicados a contextos empresariales reales.'}
            </Typography>
          </Paper>
        </Box>

        {/* RENDEREADO DINÁMICO DE N MÓDULOS */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            backgroundColor: '#FFFFFF',
            overflow: 'hidden'
          }}
        >
          {modulos.map((module, index) => {
            const isModuleExpanded = expandedModules[module.id_modulo] ?? false;
            const isLastModule = index === modulos.length - 1;

            return (
              <Box 
                key={module.id_modulo} 
                sx={{ 
                  borderBottom: isLastModule ? 'none' : '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {/* 1. HEADER DEL MÓDULO */}
                <Box
                  sx={{
                    p: 1.5,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    alignItems="center" 
                    onClick={() => handleGetModuleContent(module.id_modulo)} 
                    sx={{ cursor: 'pointer', flexGrow: 1 }}
                  >
                    {isModuleExpanded ? (
                      <KeyboardArrowDownIcon sx={{ color: '#6B7280', fontSize: 20 }} />
                    ) : (
                      <KeyboardArrowRightIcon sx={{ color: '#6B7280', fontSize: 20 }} />
                    )}
                    <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#111827', fontSize: '0.9rem' }}>
                      {module.titulo}
                    </Typography>
                  </Stack>

                  {/* Badges y Botones de Acción */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {
                      /*
                      Falta traer el status real del módulo desde la API para determinar si es "Publicado", "Borrador", etc. Por ahora se usa un valor mock.
                      */
                    }
                    <Chip 
                      label={'Publicado'} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#10B981', 
                        color: '#FFFFFF', 
                        fontWeight: 600, 
                        height: '24px', 
                        fontSize: '0.75rem',
                        mr: 1
                      }} 
                    />
                    
                    {/* Botones cuadrados con borde como en la imagen */}
                    <Tooltip title="Editar módulo" arrow>
                      <IconButton onClick={() => handleEditarModulo(module)} size="small" sx={{ p: '4px', color: '#9CA3AF', '&:hover': { backgroundColor: '#F3F4F6' } }}>
                        <EditOutlinedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Duplicar módulo" arrow>
                      <IconButton size="small" sx={{ p: '4px', color: '#9CA3AF', '&:hover': { backgroundColor: '#F3F4F6' } }}>
                        <ContentCopyOutlinedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Descargar módulo" arrow>
                      <IconButton size="small" sx={{ p: '4px', color: '#9CA3AF', '&:hover': { backgroundColor: '#F3F4F6' } }}>
                        <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Publicar módulo" arrow>
                      <IconButton size="small" sx={{ p: '4px', color: '#9CA3AF', '&:hover': { backgroundColor: '#F3F4F6' } }}>
                        <CloudUploadOutlinedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver módulo" arrow>
                      <IconButton 
                        size="small" 
                        onClick={() => handleGetModuleContent(module.id_modulo)}
                        sx={{ p: '4px', color: '#9CA3AF', '&:hover': { backgroundColor: '#F3F4F6' } }}
                      >
                        <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>

                {/* 2. BARRA DE ACCIONES (Siempre visible, alineada al texto) */}
                <Box 
                  sx={{ 
                    px: 2, 
                    py: 1, 
                    pl: 4.5, // Indentado para esquivar el icono del chevron
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid #F9FAFB',
                    background: 'rgb(249, 248, 246)'
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 500, color: '#767470', letterSpacing: '0.5px' }}>
                      ACCIONES DEL MÓDULO
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddIcon sx={{ fontSize: '16px !important' }}/>}
                      onClick={() => handleOpenAddDialog(module)}
                      sx={{ 
                        backgroundColor: '#111827', 
                        color: '#FFF', 
                        borderRadius: '4px', 
                        textTransform: 'none', 
                        fontSize: '0.75rem', 
                        fontWeight: 400,                        
                        boxShadow: 'none',
                        height: '24px',
                        '&:hover': { backgroundColor: '#374151', boxShadow: 'none' } 
                      }}
                    >
                      Agregar elemento
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.75rem' }}>
                      Marcar como obligatorio
                    </Typography>
                      {
                        /*
                          Falta traer el valor real desde la API para determinar si el módulo es obligatorio o no. Por ahora se usa un valor mock.
                        */
                      }
                    <Switch size="small" defaultChecked={true} sx={{ transform: 'scale(0.9)' }} />
                  </Stack>
                </Box>

                {/* 3. CONTENIDO COLAPSABLE (Solo oculta los items) */}
                <Collapse in={isModuleExpanded}>
                  <Box sx={{ p: 2, pl: 4.5, pt: 0, backgroundColor: '#FFFFFF' }}>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      {(recursosPorModulo[module.id_modulo] ?? []).map((item) => (
                        <ModuleItem
                          key={item.id_recurso}
                          sectionTitle={item.tipo_recurso_nombre}
                          title={item.titulo}
                          format={''}
                          icon={renderItemIcon(item.tipo_recurso_nombre)}
                          item={item}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Paper>
      </Box>

      {/* DIÁLOGO ÚNICO COMPARTIDO PARA CUALQUIER MÓDULO */}
      <AgregarElementoDialog
        open={Boolean(activeModuleForAdd)}
        onClose={handleCloseAddDialog}
        onSave={handleSaveElement}
        modulo={activeModuleForAdd}
      />
      <EditarModuloDialog
        open={Boolean(activeModuleForEdit)}
        modulo={activeModuleForEdit}
        onClose={handleCloseEditDialog}
      />
      </Paper>
      <LoadingDialog isOpen={isCursoContenidoLoading} />
    </>
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
      <>
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
            label={`#ID-${data.id_curso}`}
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
          {
            // Falta traer el valor real desde la API para determinar si es obligatorio o no
          }
          {isMandatory && (
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
            {data.titulo}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <PersonOutlineIcon sx={{ fontSize: 16, color: '#9CA3AF' }} />
            <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '0.825rem' }}>
              {data.profesor_nombre || 'No asignado'}
            </Typography>
          </Stack>
        </Box>

        {
          /* Fila de Badges de Estatus 
            Falta traer los valores reales desde la API para determinar el estado del curso y los conteos de publicados, borradores y sin publicar.
          */
        }
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          {/* {data.publishedCount !== undefined && (
            <Chip label={`${data.publishedCount} publicados`} size="small" variant="outlined" sx={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4', fontSize: '0.75rem', fontWeight: 600, borderRadius: '12px', height: '24px' }} />
          )}
          {data.draftCount !== undefined && (
            <Chip label={`${data.draftCount} borrador`} size="small" variant="outlined" sx={{ borderColor: '#E5E7EB', color: '#6B7280', backgroundColor: '#F9FAFB', fontSize: '0.75rem', fontWeight: 500, borderRadius: '12px', height: '24px' }} />
          )}
          {data.unpublishedCount !== undefined && (
            <Chip label={`${data.unpublishedCount} sin publicar`} size="small" variant="outlined" sx={{ borderColor: '#FECDD3', color: '#E11D48', backgroundColor: '#FFF1F2', fontSize: '0.75rem', fontWeight: 500, borderRadius: '12px', height: '24px' }} />
          )} */}
        </Stack>

        <Divider sx={{ my: 0.5, borderColor: '#F3F4F6' }} />

        {/* Fila Inferior: Conteo de Módulos + Botones de Acción */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500, fontSize: '0.875rem', fontFamily: 'monospace' }}>
            {data.modulos?.length || 0} módulos
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
        <LoadingDialog isOpen={isCursoContenidoLoading} />
      </>
    );
  }

  // ==========================================
  // RENDER 2: VISTA EN LISTA (LIST ROW)
  // ==========================================

  return (
    <>
      <Paper
      elevation={0}
      sx={{
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* HEADER LISTA */}
      {
        headerAcordion()
      }      

      {/* DETALLE DESPLEGABLE */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2.5, backgroundColor: '#FAFAFA' }}>
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
                {data.descripcion || ''}
              </Typography>
            </Paper>
          </Box>

          {/* <Paper elevation={0} sx={{ borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
            {modulesList.map((module, index) => {
              const isModuleExpanded = expandedModules[module.id] ?? true;
              return (
                <Box key={module.id} sx={{ borderBottom: index === modulesList.length - 1 ? 'none' : '1px solid #E5E7EB' }}>
                  <Box sx={{ p: 1.5, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1} alignItems="center" onClick={() => toggleModuleCollapse(module.id)} sx={{ cursor: 'pointer', flexGrow: 1 }}>
                      {isModuleExpanded ? <KeyboardArrowDownIcon sx={{ color: '#6B7280', fontSize: 20 }} /> : <KeyboardArrowRightIcon sx={{ color: '#6B7280', fontSize: 20 }} />}
                      <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#111827', fontSize: '0.9rem' }}>
                        {module.title}
                      </Typography>
                    </Stack>
                  </Box>

                  <Collapse in={isModuleExpanded}>
                    <Box sx={{ p: 2, pl: 4.5, pt: 0 }}>
                      <Stack spacing={2} sx={{ mt: 2 }}>
                        {module.items?.map((item) => (
                          <ModuleItem key={item.id} sectionTitle={item.sectionTitle} title={item.title} format={item.format} icon={renderItemIcon(item.type)} />
                        ))}
                      </Stack>
                    </Box>
                  </Collapse>
                </Box>
              );
            })}
          </Paper> */}
        </Box>
      </Collapse>

      <AgregarElementoDialog
        open={Boolean(activeModuleForAdd)}
        onClose={() => setActiveModuleForAdd(null)}
        onSave={(elementData) => {
          if (activeModuleForAdd) onAddElement?.(activeModuleForAdd.id_modulo, elementData);
          setActiveModuleForAdd(null);
        }}
        modulo={activeModuleForAdd}
      />
      </Paper>
      <LoadingDialog isOpen={isCursoContenidoLoading} />
    </>
  );
};
