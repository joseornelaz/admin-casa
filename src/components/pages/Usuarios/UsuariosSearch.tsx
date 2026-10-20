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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from "../../atoms/Button/Button";
import type { RolUsuario, EstatusUsuario, UsuariosFilterParams } from "./types";

type UsuariosSearchProps = {
    onSearch?: (filters: UsuariosFilterParams) => void;
    placeholder?: string;
};

const ROLES: Array<RolUsuario | "Todos los roles"> = ["Todos los roles", "Administrador", "Asesor", "Docente", "Tutor", "Coordinador"];
const ESTATUSES: Array<EstatusUsuario | "Todos los estatus"> = ["Todos los estatus", "Activo", "Inactivo"];

const chipSx = (isActive: boolean) => ({
    backgroundColor: isActive ? '#111111' : 'transparent',
    color: isActive ? '#FFFFFF' : '#666666',
    border: isActive ? 'none' : '1px solid #E5E5E0',
    fontWeight: isActive ? 500 : 400,
    borderRadius: '20px',
    padding: '4px 8px',
    '&:hover': {
        backgroundColor: isActive ? '#222222' : '#F0F0EC'
    },
    '& .MuiChip-deleteIcon': {
        color: isActive ? '#FFFFFF' : '#666666',
        '&:hover': { color: isActive ? '#FFFFFF' : '#666666' }
    }
});

export const UsuariosSearch: React.FC<UsuariosSearchProps> = ({ onSearch, placeholder }) => {
    // Búsqueda de texto
    const [searchText, setSearchText] = useState('');

    // Filtros seleccionados
    const [rol, setRol] = useState<(typeof ROLES)[number]>('Todos los roles');
    const [estatus, setEstatus] = useState<(typeof ESTATUSES)[number]>('Todos los estatus');

    // Anclajes de los menús desplegables
    const [anchorElRol, setAnchorElRol] = useState<null | HTMLElement>(null);
    const [anchorElEstatus, setAnchorElEstatus] = useState<null | HTMLElement>(null);

    const handleSearch = () => {
        if (onSearch) {
            onSearch({
                searchText,
                rol,
                estatus,
                organizacion: 'todas',
            });
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
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            >
                <TextField
                    placeholder={placeholder || "Buscar usuario..."}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ mb: 0, flexGrow: 1 }}
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
            </Box>

            {/* Chips de filtros */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    flexWrap: 'wrap',
                    mt: 2
                }}
            >
                {/* Filtro de Rol */}
                <Chip
                    label={rol === 'Todos los roles' ? '• Todos los roles' : `• Rol: ${rol}`}
                    onClick={(e) => setAnchorElRol(e.currentTarget)}
                    onDelete={rol !== 'Todos los roles' ? () => setRol('Todos los roles') : undefined}
                    deleteIcon={<KeyboardArrowDownIcon />}
                    sx={chipSx(rol === 'Todos los roles')}
                />
                <Menu anchorEl={anchorElRol} open={Boolean(anchorElRol)} onClose={() => setAnchorElRol(null)}>
                    {ROLES.map((r) => (
                        <MenuItem key={r} onClick={() => { setRol(r); setAnchorElRol(null); }}>{r}</MenuItem>
                    ))}
                </Menu>

                {/* Separador vertical */}
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5, borderColor: '#E5E5E0' }} />

                {/* Filtro de Estatus */}
                <Chip
                    label={estatus === 'Todos los estatus' ? 'Estatus: Todos' : `Estatus: ${estatus}`}
                    onClick={(e) => setAnchorElEstatus(e.currentTarget)}
                    onDelete={estatus !== 'Todos los estatus' ? () => setEstatus('Todos los estatus') : undefined}
                    deleteIcon={<KeyboardArrowDownIcon />}
                    sx={chipSx(estatus === 'Todos los estatus')}
                />
                <Menu anchorEl={anchorElEstatus} open={Boolean(anchorElEstatus)} onClose={() => setAnchorElEstatus(null)}>
                    {ESTATUSES.map((s) => (
                        <MenuItem key={s} onClick={() => { setEstatus(s); setAnchorElEstatus(null); }}>{s}</MenuItem>
                    ))}
                </Menu>
            </Box>
        </Paper>
    );
}

export default UsuariosSearch;
