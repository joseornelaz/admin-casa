import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import type { ListadoGrupoAlumnos } from '../../../../types/Foros.interface';
import { useTheme } from '@mui/material/styles';
import { CalendarToday } from '@mui/icons-material';

interface CardGrupoProps {
    group: ListadoGrupoAlumnos;
    onClick: (group: ListadoGrupoAlumnos) => void;
    isSelected?: boolean;
}

export const CardGrupo: React.FC<CardGrupoProps> = ({ group, onClick, isSelected }) => {
    const theme = useTheme();

    const getStatusColor = (status: string) => {
        // Assuming status strings. Adjust based on actual data if needed.
        // The reference image shows a light green background with green text.
        // We can use custom colors or MUI severity colors.
        switch (status.toLowerCase()) {
            case 'vigente':
                return 'success';
            default:
                return 'default';
        }
    };

    return (
        <Card 
            sx={{ 
                cursor: 'pointer', 
                border: isSelected ? `2px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0',
                borderRadius: '16px',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderColor: isSelected ? theme.palette.primary.main : theme.palette.grey[400]
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                backgroundColor: isSelected ? `${theme.palette.primary.main}08` : 'white' // very light tint if selected
            }}
            onClick={() => onClick(group)}
        >
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                        ID: {group.id_grupo}
                    </Typography>
                    <Chip 
                        label={group.estatus.toUpperCase()} 
                        color={getStatusColor(group.estatus) as any} 
                        size="small" 
                        sx={{ 
                            borderRadius: '6px', 
                            fontWeight: 'bold', 
                            fontSize: '0.7rem',
                            height: '24px' 
                        }}
                    />
                </Box>
                
                <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.3, mb: 3, minHeight: '3em' }}>
                    {group.nombre_grupo}
                </Typography>

                <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            Inicio: <strong>{group.fecha_inicio}</strong>
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            Fin: <strong>{group.fecha_fin}</strong>
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
