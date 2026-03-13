import { Dialog, DialogContent, DialogTitle, Grid, InputAdornment, TextField, Button, DialogActions, Typography, useTheme, useMediaQuery, Tabs, Tab, Box } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { CardGrupo } from './CardGrupo';
import type { ListadoGrupoAlumnos } from '../../../../types/Foros.interface';
import { Search } from '@mui/icons-material';

interface ModalSeleccionGruposProps {
    open: boolean;
    onClose: () => void;
    groups: ListadoGrupoAlumnos[];
    onSelect: (group: ListadoGrupoAlumnos) => void;
}

export const ModalSeleccionGrupos: React.FC<ModalSeleccionGruposProps> = ({ open, onClose, groups, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState<ListadoGrupoAlumnos | null>(null);
    const [statusFilter, setStatusFilter] = useState<number>(1); // 1 = Vigente, 0 = Vencido
    
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    
    // Determine number of columns based on breakpoints
    const getColumns = () => {
        if (isMd) return 3;
        if (isSm) return 2;
        return 1;
    };

    const filteredGroups = groups.filter((group) => {
        // Filter by status first
        if (group.estatus_codigo !== statusFilter) return false;

        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            group.nombre_grupo.toLowerCase().includes(term) ||
            group.id_grupo.toString().includes(term) ||
            group.estatus.toLowerCase().includes(term)
        );
    });

    const handleConfirm = () => {
        if (selectedGroup) {
            onSelect(selectedGroup);
            handleClose(); // Ensure cleanup
        }
    };

    const handleClose = useCallback(() => {
        onClose();
        setSelectedGroup(null);
        setSearchTerm('');
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return;

            if (e.key === 'Enter') {
                e.preventDefault();
                handleConfirm();
                return;
            }

            // Navigation logic
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                
                const currentIndex = selectedGroup 
                    ? filteredGroups.findIndex(g => g.id_grupo === selectedGroup.id_grupo) 
                    : -1;
                
                let nextIndex = currentIndex;
                const cols = getColumns();
                const total = filteredGroups.length;

                if (currentIndex === -1) {
                    nextIndex = 0; // Select first if none selected
                } else {
                    switch (e.key) {
                        case 'ArrowRight':
                            nextIndex = Math.min(currentIndex + 1, total - 1);
                            break;
                        case 'ArrowLeft':
                            nextIndex = Math.max(currentIndex - 1, 0);
                            break;
                        case 'ArrowDown':
                            nextIndex = Math.min(currentIndex + cols, total - 1);
                            // If jumping row goes beyond, maybe verify we don't jump too far if desired, 
                            // but standard grid nav usually just clamps or goes to last.
                            // However, closely adhering to grid: 
                            if (currentIndex + cols >= total) nextIndex = currentIndex; // Stay if no item below
                            else nextIndex = currentIndex + cols;
                            break;
                        case 'ArrowUp':
                             if (currentIndex - cols < 0) nextIndex = currentIndex; // Stay if no item above
                             else nextIndex = currentIndex - cols;
                            break;
                    }
                }

                if (nextIndex !== currentIndex && filteredGroups[nextIndex]) {
                    setSelectedGroup(filteredGroups[nextIndex]);
                    
                    // Simple scroll into view logic could be added here if needed
                    // For now, standard focus
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, selectedGroup, filteredGroups, isSm, isMd]); // Dependencies allow recreating listener with fresh state

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            fullWidth 
            maxWidth="lg" 
            scroll="paper"
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    padding: '16px'
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Seleccionar Grupo
                </Typography>
                <TextField 
                    size="small"
                    placeholder="Buscar grupo..."
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    sx={{ width: '300px', '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#f5f5f5' } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogTitle>
            <DialogContent dividers sx={{ borderColor: 'rgba(0,0,0,0.05)', p: 0 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2 }}>
                    <Tabs value={statusFilter} onChange={(_, newValue) => setStatusFilter(newValue)} aria-label="filtro estatus grupos">
                        <Tab label="Vigentes" value={1} />
                        <Tab label="Vencidos" value={0} />
                    </Tabs>
                </Box>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        {filteredGroups.length > 0 ? (
                            filteredGroups.map((group) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={group.id_grupo}>
                                    <CardGrupo 
                                        group={group} 
                                        onClick={(g) => setSelectedGroup(g)}
                                        isSelected={selectedGroup?.id_grupo === group.id_grupo}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
                                    No se encontraron grupos {statusFilter === 1 ? 'vigentes' : 'vencidos'}.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ pt: 3, px: 3 }}>
                <Button onClick={handleClose} sx={{ color: 'text.secondary', fontWeight: 600, mr: 2 }}>
                    Cancelar
                </Button>
                <Button 
                    onClick={handleConfirm} 
                    variant="contained" 
                    disabled={!selectedGroup}
                    sx={{ 
                        borderRadius: '8px', 
                        textTransform: 'none', 
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        backgroundColor: '#1a1a2e', // Dark color from reference
                        '&:hover': {
                            backgroundColor: '#2d2d44'
                        }
                    }}
                >
                    Confirmar Selección
                </Button>
            </DialogActions>
        </Dialog>
    );
};
