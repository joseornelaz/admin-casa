import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

// Tipado de vista de presentación
export type ViewMode = 'list' | 'grid';

// Tipado de los indicadores de estado
interface StatusIndicator {
  label: string;
  color: string;
}

// Configuración de los estatus visibles según la imagen
const STATUS_ITEMS: StatusIndicator[] = [
  { label: 'Publicado', color: '#107C41' },   // Verde
  { label: 'Borrador', color: '#767676' },    // Gris
  { label: 'En revisión', color: '#D97706' }, // Naranja
  { label: 'Sin publicar', color: '#DC2626' } // Rojo
];

interface HeaderDegreeBarProps {
  title?: string;
  subtitle?: string;
  avatarText?: string;
  defaultView?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
}

export const HeaderDegreeBar: React.FC<HeaderDegreeBarProps> = ({
  title = "Lic. en Administración de Empresas",
  subtitle = "Grado Universitario · 4 cursos · 10 mód. c/u",
  avatarText = "AG",
  defaultView = 'list',
  onViewChange
}) => {
  const [view, setView] = useState<ViewMode>(defaultView);

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: ViewMode | null
  ) => {
    if (newView !== null) {
      setView(newView);
      onViewChange?.(newView);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        px: 2.5,
        borderRadius: '12px',
        border: '1px solid',
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      {/* Sección Izquierda: Avatar e Información */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          variant="rounded"
          sx={{
            width: 44,
            height: 44,
            borderRadius: '10px',
            backgroundColor: '#111827', // Fondo oscuro del avatar
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: '0.95rem'
          }}
        >
          {avatarText}
        </Avatar>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: '#111827',
              fontSize: '1.05rem',
              lineHeight: 1.2
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#9CA3AF',
              fontSize: '0.85rem',
              mt: 0.3
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Stack>

      {/* Sección Derecha: Leyenda de estados y Selector de Vista */}
      <Stack direction="row" spacing={3} alignItems="center">
        
        {/* Indicadores de Estado */}
        <Stack
          direction="row"
          spacing={2.5}
          alignItems="center"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {STATUS_ITEMS.map((item, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: item.color
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  fontSize: '0.85rem',
                  fontWeight: 500
                }}
              >
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Toggle Button Lista / Cuadrícula */}
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="modo de vista"
          sx={{
            backgroundColor: '#EFEFEF',
            p: '3px',
            borderRadius: '10px',
            border: 'none',
            '& .MuiToggleButtonGroup-grouped': {
              border: 0,
              borderRadius: '8px !important',
              px: 1.8,
              py: 0.5,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#6B7280',
              '&.Mui-selected': {
                backgroundColor: '#FFFFFF',
                color: '#111827',
                boxShadow: '0px 1px 3px rgba(0,0,0,0.1)'
              }
            }
          }}
        >
          <ToggleButton value="list" aria-label="vista de lista">
            <Stack direction="row" spacing={1} alignItems="center">
              <ViewListIcon sx={{ fontSize: 18 }} />
              <span>Lista</span>
            </Stack>
          </ToggleButton>

          <ToggleButton value="grid" aria-label="vista de cuadrícula">
            <Stack direction="row" spacing={1} alignItems="center">
              <ViewModuleIcon sx={{ fontSize: 18 }} />
              <span>Cuadrícula</span>
            </Stack>
          </ToggleButton>
        </ToggleButtonGroup>

      </Stack>
    </Paper>
  );
};