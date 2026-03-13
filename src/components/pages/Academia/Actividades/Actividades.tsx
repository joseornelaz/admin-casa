import React, { useEffect } from "react";
import { Box, FormControl, Grid, TextField, Typography, Card, CardContent, Avatar } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ContainerDesktop } from "../../../organisms/ContainerDesktop/ContainerDesktop";
import { GetGruposAsignados } from "../../../../services/ForosService";
import { GetActividadesGrupo, GetActividadDetalle } from "../../../../services/ActividadesService";
import type { ListadoGrupoAlumnos } from "../../../../types/Foros.interface";
import type { Actividad, AlumnoActividad } from "../../../../types/Actividades.interface";
import { ModalSeleccionGrupos } from "../Foros/ModalSeleccionGrupos";
import { LoadingCircular } from "../../../molecules/LoadingCircular/LoadingCircular";
import { ModalSeleccionActividades } from "./ModalSeleccionActividades";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import Button from "../../../atoms/Button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalificarActividad } from "../../../../services/ActividadesService";
import type { CalificarActividadPayload } from "../../../../types/Actividades.interface";
import { RatingStars } from "../../../molecules/Rating/RatingStars";

const Actividades: React.FC = () => {
    const [gruposAsignadosList, setGruposAsignadosList] = React.useState<ListadoGrupoAlumnos[]>([]);
    
    // Group Selection State
    const [openGroupModal, setOpenGroupModal] = React.useState(false);
    const [selectedGroupName, setSelectedGroupName] = React.useState('');
    
    // Activity Selection State
    const [openActivityModal, setOpenActivityModal] = React.useState(false);
    const [selectedActivityName, setSelectedActivityName] = React.useState('');
    const [actividades, setActividades] = React.useState<Actividad[]>([]);
    const [selectedActivity, setSelectedActivity] = React.useState<Actividad | null>(null);

    const { control, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            grupo_alumnos: 0,
            id_actividad: 0
        },
    });

    const grupoSeleccionado = watch("grupo_alumnos");

    // Queries
    const { data: gruposData, isLoading: isLoadingGrupos } = GetGruposAsignados();
    const { data: actividadesData, isLoading: isLoadingActividades } = GetActividadesGrupo(grupoSeleccionado, { enabled: grupoSeleccionado > 0 });
    const { data: submissionsData, isLoading: isLoadingSubmissions } = GetActividadDetalle(
        selectedActivity?.id_curso ?? 0, 
        selectedActivity?.id_recurso ?? 0, 
        { enabled: !!selectedActivity }
    );

    const queryClient = useQueryClient();
    const [gradingStudentId, setGradingStudentId] = React.useState<number | null>(null);
    const [gradeValue, setGradeValue] = React.useState<number | null>(0);
    const [hoverValue, setHoverValue] = React.useState<number | null>(-1);
    const [feedbackValue, setFeedbackValue] = React.useState('');

    const calificarMutation = useMutation({
        mutationFn: CalificarActividad,
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries({ queryKey: ['actividades-detalle'] });
                setGradingStudentId(null);
                setGradeValue(0);
                setHoverValue(-1);
                setFeedbackValue('');
            }
        },
        onError: (error) => {
            console.error('Error al calificar:', error);
        }
    });

    const handleCalificar = (id_entrega: number | null) => {
        if (!selectedActivity) return;
        
        const payload: CalificarActividadPayload = {
            id_recurso: selectedActivity.id_recurso,
            id_entrega: id_entrega,
            calificacion: gradeValue || 0,
            retroalimentacion: feedbackValue
        };
        
        calificarMutation.mutate(payload);
    };

    const handleHoverChange = (_event: React.ChangeEvent<{}>, newHover: number | null) => {
        setHoverValue(newHover);
    };

    useEffect(() => {
        if (gruposData?.data?.grupos) {
            setGruposAsignadosList(gruposData.data.grupos);
        }
    }, [gruposData]);

    useEffect(() => {
        if (actividadesData?.data) {
            setActividades(actividadesData.data);
        } else {
            setActividades([]);
            setSelectedActivity(null);
            setSelectedActivityName('');
            setValue('id_actividad', 0);
        }
    }, [actividadesData]);

    return (
        <ContainerDesktop title="Actividades">
             <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="grupo_alumnos"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.grupo_alumnos}>
                                <TextField
                                    label="Grupos de alumnos asignados"
                                    value={selectedGroupName}
                                    onClick={() => setOpenGroupModal(true)}
                                    disabled={isLoadingGrupos}
                                    InputProps={{
                                        readOnly: true,
                                        style: { cursor: 'pointer' }
                                    }}
                                    inputRef={field.ref}
                                />
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                     <Controller
                        name="id_actividad"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.id_actividad}>
                                <TextField
                                    label="Seleccionar Actividad"
                                    value={selectedActivityName}
                                    onClick={() => {
                                        if (grupoSeleccionado > 0) {
                                            setOpenActivityModal(true);
                                        }
                                    }}
                                    disabled={grupoSeleccionado === 0 || isLoadingActividades}
                                    InputProps={{
                                        readOnly: true,
                                        style: { cursor: 'pointer' }
                                    }}
                                    inputRef={field.ref}
                                    placeholder={grupoSeleccionado === 0 ? "Seleccione un grupo primero" : "Seleccione una actividad"}
                                />
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>
            
            <Box sx={{ mt: 2 }}>
                {selectedActivity ? (
                    isLoadingSubmissions ? (
                        <LoadingCircular Text="Cargando entregas..." />
                    ) : (
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h5" gutterBottom>{selectedActivity.titulo}</Typography>
                                <Typography variant="body1" color="textSecondary" paragraph>{selectedActivity.descripcion}</Typography>
                            </Grid>
                            
                            {submissionsData?.data && submissionsData.data.length > 0 ? (
                                submissionsData.data.map((alumno: AlumnoActividad, index: number) => (
                                    <Grid size={{ xs: 12 }} key={index}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Box display="flex" alignItems="flex-start" flexDirection="column">
                                                    <Box display="flex" alignItems="center" width="100%" mb={1}>
                                                        <Avatar>{alumno.alumno.charAt(0)}</Avatar>
                                                        <Box ml={2} flexGrow={1}>
                                                            <Typography variant="subtitle1" fontWeight="bold">{alumno.alumno}</Typography>
                                                            <Typography variant="caption" color="textSecondary" display="block">
                                                                {alumno.curso}
                                                            </Typography>
                                                            <Typography variant="caption" color="textSecondary">
                                                                Enviado: {alumno.fecha_entrega ? new Date(alumno.fecha_entrega).toLocaleString() : (alumno.fecha_envio ? new Date(alumno.fecha_envio).toLocaleString() : 'No enviado')}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            {(alumno.calificacion !== null && Number(alumno.calificacion) > 0) ? (
                                                                <Box
                                                                    sx={{backgroundColor: '#2E7D32', height: '28px', display: 'flex', alignItems: 'center', p: 1, gap: '3px', borderRadius: '4px'}}
                                                                >
                                                                    <StarOutlineOutlinedIcon sx={{ color: '#FFFFFF' }} />
                                                                    <Typography component="span" variant="body2" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Calificado: {alumno.calificacion}</Typography>
                                                                </Box>
                                                            ) : (
                                                                <Box
                                                                    sx={{backgroundColor: '#AAB1B6', height: '28px', display: 'flex', alignItems: 'center', p: 1, gap: '3px', borderRadius: '4px'}}
                                                                >
                                                                    <StarOutlineOutlinedIcon sx={{ color: '#FFFFFF' }} />
                                                                    <Typography component="span" variant="body2" sx={{ color: '#FFFFFF' }}>Pendiente</Typography>
                                                                </Box>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                    
                                                    <Box mt={1} width="100%">
                                                        <Typography variant="body2" fontWeight="bold">Contenido:</Typography>
                                                        <Typography variant="body2" color="textSecondary" sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
                                                            {alumno.contenido_entregado || "Sin contenido"}
                                                        </Typography>
                                                    </Box>

                                                    {alumno.retroalimentacion && (
                                                        <Box mt={1} width="100%">
                                                            <Typography variant="body2" fontWeight="bold">Retroalimentación:</Typography>
                                                            <Typography variant="body2" color="textSecondary" sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: 1 }}>
                                                                {alumno.retroalimentacion}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {/* Grading Interface */}
                                                    {gradingStudentId === alumno.id_usuario ? (
                                                        <Box mt={2} width="100%" sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                                                            {/* <Typography variant="subtitle2" gutterBottom>Calificar actividad</Typography> */}
                                                            <Grid container spacing={2}>
                                                                <Grid size={{ xs: 12, md: 6 }}>
                                                                    <Typography variant="body2" color="primary" fontWeight="bold" gutterBottom>
                                                                        Retroalimentación del tutor:
                                                                    </Typography>
                                                                    <TextField
                                                                        multiline
                                                                        rows={3}
                                                                        fullWidth
                                                                        value={feedbackValue}
                                                                        onChange={(e) => setFeedbackValue(e.target.value)}
                                                                        slotProps={{
                                                                            input: {
                                                                                inputProps: {
                                                                                    maxLength: 200
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid size={{ xs: 12, md: 6 }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                                        <Typography variant="body2" color="primary" fontWeight="bold">
                                                                            Calificación:
                                                                        </Typography>
                                                                        <RatingStars 
                                                                            max={10} 
                                                                            precision={0.5} 
                                                                            value={gradeValue} 
                                                                            onChange={(_e, newValue) => setGradeValue(newValue)} 
                                                                            onChangeActive={handleHoverChange} 
                                                                        />
                                                                        <Typography variant="body2" color="primary" fontWeight="bold">
                                                                            {gradeValue !== null && hoverValue !== -1 ? hoverValue : gradeValue}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                                
                                                                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                                                                    <Button 
                                                                        onClick={() => handleCalificar(alumno.id_entrega)}
                                                                        disabled={calificarMutation.isPending}
                                                                        sxProps={{ minWidth: '120px' }}
                                                                    >
                                                                        {calificarMutation.isPending ? 'ENVIANDO...' : 'CALIFICAR'}
                                                                    </Button>
                                                                    <Button 
                                                                        variant="outlined" 
                                                                        onClick={() => {
                                                                            setGradingStudentId(null);
                                                                            setGradeValue(0);
                                                                            setHoverValue(-1);
                                                                            setFeedbackValue('');
                                                                        }}
                                                                        sxProps={{ minWidth: '120px' }}
                                                                    >
                                                                        CANCELAR
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    ) : (
                                                        (!alumno.calificacion || Number(alumno.calificacion) === 0) && (
                                                            <Box mt={2}>
                                                                <Button 
                                                                    variant="outlined"
                                                                    onClick={() => {
                                                                        setGradingStudentId(alumno.id_usuario);
                                                                        setGradeValue(0);
                                                                        setHoverValue(-1);
                                                                        setFeedbackValue('');
                                                                    }}
                                                                >
                                                                    Calificar
                                                                </Button>
                                                            </Box>
                                                        )
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="body1">No hay entregas para esta actividad.</Typography>
                                </Grid>
                            )}
                        </Grid>
                    )
                ) : (
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                         <Typography variant="body1" color="textSecondary">
                            {grupoSeleccionado > 0 ? "Seleccione una actividad para ver las entregas." : "Seleccione un grupo y una actividad."}
                        </Typography>
                    </Box>
                )}
            </Box>

            <ModalSeleccionGrupos 
                open={openGroupModal} 
                onClose={() => setOpenGroupModal(false)} 
                groups={gruposAsignadosList} 
                onSelect={(group) => {
                    setValue("grupo_alumnos", group.id_grupo);
                    setSelectedGroupName(group.nombre_grupo);
                    setOpenGroupModal(false);
                    // Reset activity selection when group changes
                    setSelectedActivity(null);
                    setSelectedActivityName('');
                    setValue('id_actividad', 0);
                }}
            />
            
            <ModalSeleccionActividades
                open={openActivityModal}
                onClose={() => setOpenActivityModal(false)}
                actividades={actividades}
                onSelect={(actividad) => {
                    setSelectedActivity(actividad);
                    setSelectedActivityName(actividad.titulo);
                    setValue('id_actividad', actividad.id_actividad);
                    setOpenActivityModal(false);
                }}
            />
        </ContainerDesktop>
    );
}

export default Actividades;