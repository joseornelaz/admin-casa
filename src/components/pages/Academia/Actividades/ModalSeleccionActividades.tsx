import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, Grid, Card, CardContent, TextField, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import type { Actividad } from "../../../../types/Actividades.interface";

interface ModalSeleccionActividadesProps {
    open: boolean;
    onClose: () => void;
    actividades: Actividad[];
    onSelect: (actividad: Actividad) => void;
}

export const ModalSeleccionActividades: React.FC<ModalSeleccionActividadesProps> = ({ open, onClose, actividades, onSelect }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredActividades = actividades.filter(actividad => 
        actividad.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
             <DialogTitle sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    Seleccionar Actividad
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                     <TextField
                        size="small"
                        placeholder="Buscar actividad..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {filteredActividades.length > 0 ? (
                        filteredActividades.map((actividad) => (
                            <Grid size={{ xs: 12, md: 6 }} key={actividad.id_actividad}>
                                <Card 
                                    onClick={() => onSelect(actividad)}
                                    sx={{ 
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: 3,
                                            borderColor: 'primary.main'
                                        },
                                        border: '1px solid #e0e0e0',
                                        height: '100%'
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                            {actividad.titulo}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {actividad.descripcion}
                                        </Typography>
                                        <Typography variant="caption" display="block" color="primary">
                                            Entrega: {new Date(actividad.fecha_entrega).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                         <Box sx={{ width: '100%', p: 4, textAlign: 'center' }}>
                            <Typography color="textSecondary">
                                No se encontraron actividades.
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
