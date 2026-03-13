import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Grid } from '@mui/material';
import { CreateClase } from '../../../../services/ClasesService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingCircular } from '../../../molecules/LoadingCircular/LoadingCircular';
import { useForm, Controller } from 'react-hook-form';
import type { CreateClasePayload } from '../../../../types/Clases.interface';

interface ModalCrearClaseProps {
    open: boolean;
    onClose: () => void;
    idGrupo: number;
}

export const ModalCrearClase: React.FC<ModalCrearClaseProps> = ({ open, onClose, idGrupo }) => {
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset, formState: { errors } } = useForm<CreateClasePayload>({
        defaultValues: {
            titulo: '',
            descripcion: '',
            fecha_inicio: '',
            fecha_fin: '',
            reunion_url: '',
            calendario_url: null,
            grabacion_url: null,
            id_grupo: idGrupo
        }
    });

    useEffect(() => {
        if (open) {
            reset({
                titulo: '',
                descripcion: '',
                fecha_inicio: '',
                fecha_fin: '',
                reunion_url: '',
                calendario_url: null,
                grabacion_url: null,
                id_grupo: idGrupo
            });
        }
    }, [open, idGrupo, reset]);

    const createMutation = useMutation({
        mutationFn: CreateClase,
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries({ queryKey: ['clases-grupo'] });
                onClose();
            }
        },
        onError: (error) => {
            console.error('Error creating class:', error);
        }
    });

    const onSubmit = (data: CreateClasePayload) => {
        // Ensure dates are in ISO format if needed, though datetime-local returns close to what's needed.
        // The screenshot shows full ISO strings: "2026-07-15T16:00:00.000Z"
        // datetime-local gives "YYYY-MM-DDTHH:mm"
        
        const payload = {
            ...data,
            fecha_inicio: new Date(data.fecha_inicio).toISOString(),
            fecha_fin: new Date(data.fecha_fin).toISOString(),
            id_grupo: idGrupo
        };

        createMutation.mutate(payload);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Crear Nueva Clase</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name="titulo"
                                control={control}
                                rules={{ required: "El título es requerido" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Título de la clase"
                                        fullWidth
                                        error={!!errors.titulo}
                                        helperText={errors.titulo?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name="descripcion"
                                control={control}
                                rules={{ required: "La descripción es requerida" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Descripción"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        error={!!errors.descripcion}
                                        helperText={errors.descripcion?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="fecha_inicio"
                                control={control}
                                rules={{ required: "Fecha de inicio es requerida" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Fecha Inicio"
                                        type="datetime-local"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        error={!!errors.fecha_inicio}
                                        helperText={errors.fecha_inicio?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="fecha_fin"
                                control={control}
                                rules={{ required: "Fecha de fin es requerida" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Fecha Fin"
                                        type="datetime-local"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        error={!!errors.fecha_fin}
                                        helperText={errors.fecha_fin?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name="reunion_url"
                                control={control}
                                rules={{ required: "URL de reunión es requerida" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="URL de Reunión (Zoom/Meet)"
                                        fullWidth
                                        error={!!errors.reunion_url}
                                        helperText={errors.reunion_url?.message}
                                    />
                                )}
                            />
                        </Grid>
                        {/* Optional fields can be added here if needed, keeping simple for now based on 'esto es lo necesario' */}
                    </Grid>
                    
                    {createMutation.isPending && <Box mt={2}><LoadingCircular Text="Creando clase..." /></Box>}
                    {createMutation.isError && <Box color="error.main" mt={2}>Error al crear la clase</Box>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={createMutation.isPending}>Cancelar</Button>
                    <Button 
                        type="submit"
                        variant="contained" 
                        disabled={createMutation.isPending}
                    >
                        Crear Clase
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
