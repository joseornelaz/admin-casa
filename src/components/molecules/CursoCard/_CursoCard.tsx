import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Stack,
  Divider
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export type ViewMode = 'list' | 'grid';

export interface CourseData {
  id: string;
  title: string;
  author: string;
  period?: string;
  isMandatory?: boolean;
  status?: 'Publicado' | 'Borrador' | 'En revisión' | 'Sin publicar';
  modulesCount: number;
  // Detalle de estados para la vista en Cuadrícula
  publishedCount?: number;
  draftCount?: number;
  unpublishedCount?: number;
}

interface CourseCardProps {
  data: any;
  viewMode?: ViewMode;
  onToggleExpand?: (isExpanded: boolean) => void;
  onView?: () => void;
  onEdit?: () => void;
  onAddModule?: () => void;
}

export const CursoCard: React.FC<CourseCardProps> = ({
  data,
  viewMode = 'grid',
  onToggleExpand,
  onView,
  onEdit,
  onAddModule
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);
    onToggleExpand?.(nextState);
  };

  // ==========================================
  // RENDER: VISTA EN CUADRÍCULA (GRID CARD)
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
            sx={{
              fontWeight: 700,
              color: '#111827',
              fontSize: '1rem',
              lineHeight: 1.3
            }}
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

        {/* Fila de Badges de Estatus (Publicados, Borrador, Sin publicar) */}
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          {data.publishedCount !== undefined && (
            <Chip
              label={`${data.publishedCount} publicados`}
              size="small"
              variant="outlined"
              sx={{
                borderColor: '#BBF7D0',
                color: '#16A34A',
                backgroundColor: '#F0FDF4',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '12px',
                height: '24px'
              }}
            />
          )}
          {data.draftCount !== undefined && (
            <Chip
              label={`${data.draftCount} borrador`}
              size="small"
              variant="outlined"
              sx={{
                borderColor: '#E5E7EB',
                color: '#6B7280',
                backgroundColor: '#F9FAFB',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '12px',
                height: '24px'
              }}
            />
          )}
          {data.unpublishedCount !== undefined && (
            <Chip
              label={`${data.unpublishedCount} sin publicar`}
              size="small"
              variant="outlined"
              sx={{
                borderColor: '#FECDD3',
                color: '#E11D48',
                backgroundColor: '#FFF1F2',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '12px',
                height: '24px'
              }}
            />
          )}
        </Stack>

        <Divider sx={{ my: 0.5, borderColor: '#F3F4F6' }} />

        {/* Fila Inferior: Conteo de Módulos + Botones de Acción */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              fontWeight: 500,
              fontSize: '0.875rem',
              fontFamily: 'monospace'
            }}
          >
            {data.modulesCount} módulos
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
              onClick={onEdit}
              sx={{
                borderColor: '#E5E7EB',
                color: '#6B7280',
                textTransform: 'none',
                borderRadius: '10px',
                px: 1.5,
                height: '32px',
                fontSize: '0.8rem',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#D1D5DB',
                  backgroundColor: '#F9FAFB'
                }
              }}
            >
              Editar
            </Button>

            <Button
              variant="outlined"
              size="small"
              endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />}
              onClick={onView}
              sx={{
                borderColor: '#E5E7EB',
                color: '#4B5563',
                textTransform: 'none',
                borderRadius: '10px',
                px: 1.5,
                height: '32px',
                fontSize: '0.8rem',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#D1D5DB',
                  backgroundColor: '#F9FAFB'
                }
              }}
            >
              Ver curso
            </Button>
          </Stack>
        </Stack>
      </Paper>
    );
  }

  // ==========================================
  // RENDER: VISTA EN LISTA (LIST ROW)
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
        <IconButton size="small" onClick={handleExpand} sx={{ color: '#9CA3AF', p: 0.5 }}>
          {isExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
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
            height: '28px',
            fontFamily: 'monospace'
          }}
        />

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
        {data.period && (
          <Chip
            label={data.period}
            size="small"
            sx={{ backgroundColor: '#F3F4F6', color: '#4B5563', fontSize: '0.8rem', borderRadius: '12px' }}
          />
        )}

        {data.isMandatory && (
          <Chip
            label="Obligatorio"
            size="small"
            variant="outlined"
            sx={{ borderColor: '#BFDBFE', color: '#2563EB', backgroundColor: '#EFF6FF', fontSize: '0.8rem', borderRadius: '12px' }}
          />
        )}

        {data.status && (
          <Chip
            label={data.status}
            size="small"
            variant="outlined"
            sx={{ borderColor: '#BBF7D0', color: '#16A34A', backgroundColor: '#F0FDF4', fontSize: '0.8rem', borderRadius: '12px' }}
          />
        )}

        <Chip
          label={`${data.modulesCount} mód.`}
          size="small"
          variant="outlined"
          sx={{ borderColor: '#FECDD3', color: '#E11D48', backgroundColor: '#FFF1F2', fontSize: '0.8rem', borderRadius: '12px' }}
        />

        <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
          <IconButton size="small" onClick={onView} sx={{ border: '1px solid #E5E7EB', borderRadius: '8px', p: '5px', color: '#6B7280' }}>
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