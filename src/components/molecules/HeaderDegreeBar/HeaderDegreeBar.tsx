import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  InputBase,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SortIcon from '@mui/icons-material/Sort';
import MenuIcon from '@mui/icons-material/Menu';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

export type ViewMode = 'list' | 'grid';
export type SortOption = 'manual' | 'alpha' | 'recent' | 'status';

interface DegreeOption {
  id: string;
  title: string;
  subtitle: string;
  coursesCount: number;
  avatarText: string;
}

const DEGREE_OPTIONS: DegreeOption[] = [
  {
    id: '1',
    title: 'Lic. en Administración de Empresas',
    subtitle: 'Grado Universitario · 6 cursos · 10 mód. c/u',
    coursesCount: 6,
    avatarText: 'AG'
  },
  {
    id: '2',
    title: 'Ingeniería en Desarrollo de Software',
    subtitle: 'Grado Universitario · 12 cursos · 10 mód. c/u',
    coursesCount: 12,
    avatarText: 'DS'
  },
  {
    id: '3',
    title: 'Lic. en Negocios Internacionales',
    subtitle: 'Grado Universitario · 8 cursos · 10 mód. c/u',
    coursesCount: 8,
    avatarText: 'NI'
  }
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'manual', label: 'Orden manual' },
  { id: 'alpha', label: 'Nombre A-Z' },
  { id: 'recent', label: 'Más reciente' },
  { id: 'status', label: 'Estatus' }
];

const STATUS_ITEMS = [
  { id: 'published', label: 'Publicado', color: '#059669' },
  { id: 'draft', label: 'Borrador', color: '#6B7280' },
  { id: 'review', label: 'En revisión', color: '#D97706' },
  { id: 'unpublished', label: 'Sin publicar', color: '#DC2626' }
];

interface HeaderDegreeBarProps {
  defaultView?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
  onSearchChange?: (query: string) => void;
  onDegreeChange?: (degree: DegreeOption) => void;
  onSortChange?: (sort: SortOption) => void;
  onStatusChange?: (selectedStatuses: string[]) => void;
}

export const HeaderDegreeBar: React.FC<HeaderDegreeBarProps> = ({
  defaultView = 'list',
  onViewChange,
  onSearchChange,
  onDegreeChange,
  onSortChange,
  onStatusChange,
}) => {
  const [view, setView] = useState<ViewMode>(defaultView);
  const [selectedDegree, setSelectedDegree] = useState<DegreeOption>(DEGREE_OPTIONS[0]);
  const [selectedSort, setSelectedSort] = useState<SortOption>('manual');

  // Estado para guardar las claves de estatus seleccionados (ej: 'draft', 'unpublished' seleccionados por defecto como la imagen)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['draft', 'unpublished']);

  // Menús Desplegables
  const [degreeAnchorEl, setDegreeAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  const handleStatusToggle = (statusId: string) => {
    const updated = selectedStatuses.includes(statusId)
      ? selectedStatuses.filter((id) => id !== statusId)
      : [...selectedStatuses, statusId];

    setSelectedStatuses(updated);
    onStatusChange?.(updated);
  };

  const handleDegreeSelect = (degree: DegreeOption) => {
    setSelectedDegree(degree);
    onDegreeChange?.(degree);
    setDegreeAnchorEl(null);
  };

  const handleSortSelect = (sort: SortOption) => {
    setSelectedSort(sort);
    onSortChange?.(sort);
    setSortAnchorEl(null);
  };

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: ViewMode | null) => {
    if (newView !== null) {
      setView(newView);
      onViewChange?.(newView);
    }
  };

  const currentSortLabel = SORT_OPTIONS.find(s => s.id === selectedSort)?.label;

  return (
    <Paper
      elevation={0}
      sx={{
        p: '16px 20px',
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* --- FILA SUPERIOR --- */}
      <Stack direction="row" spacing={1.5} alignItems="center" width="100%">
        
        {/* Dropdown del Título / Titulación */}
        <Paper
          elevation={0}
          onClick={(e) => setDegreeAnchorEl(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: '6px',
            px: '12px',
            borderRadius: '10px',
            border: '1px solid #E5E7EB',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            height: 40,
            '&:hover': { borderColor: '#D1D5DB' }
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              width: 28,
              height: 28,
              borderRadius: '6px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.75rem',
              mr: 1.2
            }}
          >
            {selectedDegree.avatarText}
          </Avatar>

          <Box sx={{ mr: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#111827', lineHeight: 1.1 }}>
              {selectedDegree.title}
            </Typography>
            <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.7rem', lineHeight: 1.1, mt: 0.2 }}>
              {selectedDegree.subtitle}
            </Typography>
          </Box>

          <KeyboardArrowDownIcon sx={{ color: '#9CA3AF', fontSize: 18, ml: 'auto' }} />
        </Paper>

        {/* Menú Flotante de Titulaciones */}
        <Menu
          anchorEl={degreeAnchorEl}
          open={Boolean(degreeAnchorEl)}
          onClose={() => setDegreeAnchorEl(null)}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                mt: 1,
                minWidth: 340,
                borderRadius: '14px',
                border: '1px solid #E5E7EB',
                boxShadow: '0px 10px 25px -5px rgba(0,0,0,0.05)',
                p: 0.8,
              }
            }
          }}
        >
          {DEGREE_OPTIONS.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleDegreeSelect(option)}
              selected={selectedDegree.id === option.id}
              sx={{
                borderRadius: '8px',
                py: 1,
                px: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '&.Mui-selected': {
                  backgroundColor: '#F3F4F6',
                  '&:hover': { backgroundColor: '#E5E7EB' }
                }
              }}
            >
              <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.85rem', fontWeight: 500 }}>
                {option.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
                {option.coursesCount} cursos
              </Typography>
            </MenuItem>
          ))}
        </Menu>

        {/* Campo de Búsqueda */}
        <Paper
          elevation={0}
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
            height: 40,
            borderRadius: '10px',
            backgroundColor: '#F3F4F6',
            border: 'none',
          }}
        >
          <SearchIcon sx={{ color: '#9CA3AF', fontSize: 20, mr: 1 }} />
          <InputBase
            placeholder="Buscar curso o docente..."
            onChange={(e) => onSearchChange?.(e.target.value)}
            sx={{
              width: '100%',
              fontSize: '0.85rem',
              color: '#374151',
              '& ::placeholder': { color: '#9CA3AF', opacity: 1 }
            }}
          />
        </Paper>

        {/* Botón Ordenar */}
        <Button
          variant="outlined"
          onClick={(e) => setSortAnchorEl(e.currentTarget)}
          startIcon={<SortIcon sx={{ color: '#6B7280', fontSize: '18px !important' }} />}
          endIcon={<KeyboardArrowDownIcon sx={{ color: '#9CA3AF', fontSize: '18px !important' }} />}
          sx={{
            textTransform: 'none',
            color: '#374151',
            borderColor: '#E5E7EB',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            px: 1.5,
            height: 40,
            fontSize: '0.85rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            boxShadow: 'none',
            '&:hover': { borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' }
          }}
        >
          {currentSortLabel}
        </Button>

        {/* Menú Flotante de Ordenamiento */}
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={() => setSortAnchorEl(null)}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                mt: 1,
                minWidth: 160,
                borderRadius: '14px',
                border: '1px solid #E5E7EB',
                boxShadow: '0px 10px 25px -5px rgba(0,0,0,0.05)',
                p: 0.8,
              }
            }
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleSortSelect(option.id)}
              selected={selectedSort === option.id}
              sx={{
                borderRadius: '8px',
                py: 0.8,
                px: 1.5,
                fontSize: '0.85rem',
                color: selectedSort === option.id ? '#2563EB' : '#374151',
                fontWeight: selectedSort === option.id ? 500 : 400,
                '&.Mui-selected': {
                  backgroundColor: '#EFF6FF',
                  '&:hover': { backgroundColor: '#DBEAFE' }
                }
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Control Toggle Vista Lista / Cuadrícula */}
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="modo de vista"
          sx={{
            backgroundColor: '#F3F4F6',
            p: '3px',
            borderRadius: '10px',
            height: 40,
            border: 'none',
            '& .MuiToggleButtonGroup-grouped': {
              border: 0,
              borderRadius: '7px !important',
              px: 1.8,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
              color: '#6B7280',
              '&.Mui-selected': {
                backgroundColor: '#FFFFFF',
                color: '#111827',
                fontWeight: 600,
                boxShadow: '0px 1px 3px rgba(0,0,0,0.08)'
              }
            }
          }}
        >
          <ToggleButton value="list">
            <Stack direction="row" spacing={0.8} alignItems="center">
              <MenuIcon sx={{ fontSize: 18 }} />
              <span>Lista</span>
            </Stack>
          </ToggleButton>

          <ToggleButton value="grid">
            <Stack direction="row" spacing={0.8} alignItems="center">
              <GridViewOutlinedIcon sx={{ fontSize: 18 }} />
              <span>Cuadrícula</span>
            </Stack>
          </ToggleButton>
        </ToggleButtonGroup>

      </Stack>

      {/* --- FILA INFERIOR: Chips Seleccionables de Estatus --- */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '0.8rem', mr: 0.5 }}>
          Estatus:
        </Typography>

        {STATUS_ITEMS.map((item) => {
          const isSelected = selectedStatuses.includes(item.id);

          return (
            <Box
              key={item.id}
              onClick={() => handleStatusToggle(item.id)}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                px: 1.5,
                py: 0.4,
                borderRadius: '16px',
                border: '1px solid',
                borderColor: isSelected ? '#BFDBFE' : '#E5E7EB',
                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease-in-out',
                userSelect: 'none',
                '&:hover': {
                  borderColor: isSelected ? '#93C5FD' : '#D1D5DB',
                  backgroundColor: isSelected ? '#DBEAFE' : '#F9FAFB',
                }
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: item.color
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: isSelected ? '#2563EB' : '#4B5563',
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? 600 : 500,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
};