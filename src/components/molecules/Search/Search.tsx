import React, { useState } from 'react';
import {
  Box,
  TextField,
  Chip,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from "../../atoms/Button/Button";

type SearchProps = {
    onSearch?: (searchParams: { searchText: string; activeEstado: string; ruta: string; generacion: string }) => void;
    placeholder?: string;
    showFilters?: boolean;
    showFiltersChips?: boolean;
}

export const Search: React.FC<SearchProps> = ({onSearch, placeholder, showFilters=false, showFiltersChips=false}) => {
  // Estados para la búsqueda de texto
  const [searchText, setSearchText] = useState('');

  // Estados para los filtros seleccionados
  const [activeEstado, setActiveEstado] = useState('Todos los estados');
  const [ruta, setRuta] = useState('todas');
  const [generacion, setGeneracion] = useState('todas');

  // Estados para los menús desplegables (Dropdowns)
  const [anchorElEstado, setAnchorElEstado] = useState(null);
  const [anchorElRuta, setAnchorElRuta] = useState(null);
  const [anchorElGen, setAnchorElGen] = useState(null);

  // Manejadores de los clicks para abrir menús
  const handleEstadoClick = (event: any) => setAnchorElEstado(event.currentTarget);
  const handleRutaClick = (event: any) => setAnchorElRuta(event.currentTarget);
  const handleGenClick = (event: any) => setAnchorElGen(event.currentTarget);

  // Manejadores para cerrar menús y aplicar selección
  const handleEstadoSelect = (estado: any) => {
    setActiveEstado(estado);
    setAnchorElEstado(null);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ searchText, activeEstado, ruta, generacion });
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '16px',
        border: '1px solid #EAEAEA',
        backgroundColor: '#FFFFFF',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: { xs: 'wrap', md: 'nowrap' }
        }}
      >
        <TextField
            placeholder={placeholder || "Buscar..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              mb: 0
            }}
            slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon sx={{ color: '#A0A0A0' }} />
                            </InputAdornment>
                        ),
                    },
                }}
        />
        <Button onClick={handleSearch} icon={<SearchIcon />} iconPosition='start'>Buscar</Button>
        {
          showFilters && (
            <Button variant='outlined' onClick={handleSearch} icon={<TuneIcon />} iconPosition="start">Filtros</Button>
          )
        }
      </Box>

      {showFiltersChips && (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexWrap: 'wrap'
        }}
      >
        <Chip
          label={activeEstado === 'Todos los estados' ? '• Todos los estados' : '• Estado'}
          onClick={handleEstadoClick}
          onDelete={activeEstado !== 'Todos los estados' ? () => setActiveEstado('Todos los estados') : undefined}
          deleteIcon={<KeyboardArrowDownIcon />}
          sx={{
            backgroundColor: activeEstado === 'Todos los estados' ? '#111111' : 'transparent',
            color: activeEstado === 'Todos los estados' ? '#FFFFFF' : '#666666',
            border: activeEstado === 'Todos los estados' ? 'none' : '1px solid #E5E5E0',
            fontWeight: 500,
            borderRadius: '20px',
            padding: '4px 8px',
            '&:hover': {
              backgroundColor: activeEstado === 'Todos los estados' ? '#222222' : '#F0F0EC'
            },
            '& .MuiChip-deleteIcon': {
              color: activeEstado === 'Todos los estados' ? '#FFFFFF' : '#666666',
              '&:hover': { color: activeEstado === 'Todos los estados' ? '#FFFFFF' : '#666666' }
            }
          }}
        />

        {['Activo', 'Baja', 'Egresado'].map((estado) => (
          <Chip
            key={estado}
            label={estado}
            onClick={() => setActiveEstado(estado)}
            sx={{
              backgroundColor: activeEstado === estado ? '#111111' : 'transparent',
              color: activeEstado === estado ? '#FFFFFF' : '#666666',
              border: activeEstado === estado ? 'none' : '1px solid #E5E5E0',
              fontWeight: 400,
              borderRadius: '20px',
              padding: '4px 8px',
              '&:hover': {
                backgroundColor: activeEstado === estado ? '#222222' : '#F0F0EC'
              }
            }}
          />
        ))}

        {/* Menú para cambiar el Estado principal desde el primer chip */}
        <Menu
          anchorEl={anchorElEstado}
          open={Boolean(anchorElEstado)}
          onClose={() => setAnchorElEstado(null)}
        >
          <MenuItem onClick={() => handleEstadoSelect('Todos los estados')}>Todos los estados</MenuItem>
          <MenuItem onClick={() => handleEstadoSelect('Activo')}>Activo</MenuItem>
          <MenuItem onClick={() => handleEstadoSelect('Baja')}>Baja</MenuItem>
          <MenuItem onClick={() => handleEstadoSelect('Egresado')}>Egresado</MenuItem>
        </Menu>

        {/* Separador Vertical */}
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5, borderColor: '#E5E5E0' }} />

        {/* Dropdown Ruta */}
        <Chip
          label={`Ruta: ${ruta}`}
          onClick={handleRutaClick}
          onDelete={handleRutaClick}
          deleteIcon={<KeyboardArrowDownIcon />}
          sx={{
            backgroundColor: 'transparent',
            color: '#666666',
            border: '1px solid #E5E5E0',
            borderRadius: '20px',
            padding: '4px 8px',
            '&:hover': { backgroundColor: '#F0F0EC' },
            '& .MuiChip-deleteIcon': { color: '#666666' }
          }}
        />
        <Menu anchorEl={anchorElRuta} open={Boolean(anchorElRuta)} onClose={() => setAnchorElRuta(null)}>
          <MenuItem onClick={() => { setRuta('todas'); setAnchorElRuta(null); }}>Todas</MenuItem>
          <MenuItem onClick={() => { setRuta('Norte'); setAnchorElRuta(null); }}>Norte</MenuItem>
          <MenuItem onClick={() => { setRuta('Sur'); setAnchorElRuta(null); }}>Sur</MenuItem>
        </Menu>

        {/* Dropdown Generación */}
        <Chip
          label={`Generación: ${generacion}`}
          onClick={handleGenClick}
          onDelete={handleGenClick}
          deleteIcon={<KeyboardArrowDownIcon />}
          sx={{
            backgroundColor: 'transparent',
            color: '#666666',
            border: '1px solid #E5E5E0',
            borderRadius: '20px',
            padding: '4px 8px',
            '&:hover': { backgroundColor: '#F0F0EC' },
            '& .MuiChip-deleteIcon': { color: '#666666' }
          }}
        />
        <Menu anchorEl={anchorElGen} open={Boolean(anchorElGen)} onClose={() => setAnchorElGen(null)}>
          <MenuItem onClick={() => { setGeneracion('todas'); setAnchorElGen(null); }}>Todas</MenuItem>
          <MenuItem onClick={() => { setGeneracion('2025'); setAnchorElGen(null); }}>2025</MenuItem>
          <MenuItem onClick={() => { setGeneracion('2026'); setAnchorElGen(null); }}>2026</MenuItem>
        </Menu>
      </Box>
      )
      }

      
    </Paper>
  );
}