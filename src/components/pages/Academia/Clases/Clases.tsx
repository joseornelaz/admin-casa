import React, { useEffect } from 'react';
import { Box, FormControl, Grid, TextField, Card, CardContent, Typography, Chip, Button } from '@mui/material';
import { ContainerDesktop } from '../../../organisms/ContainerDesktop/ContainerDesktop';
import { ModalSeleccionGrupos } from '../Foros/ModalSeleccionGrupos';
import { GetGruposAsignados } from '../../../../services/ForosService';
import { GetClasesGrupo } from '../../../../services/ClasesService';
import type { ListadoGrupoAlumnos } from '../../../../types/Foros.interface';
import type { Clase } from '../../../../types/Clases.interface';
import { useForm, Controller } from 'react-hook-form';
// import Button from '../../../atoms/Button/Button'; // Naming conflict with MUI Button if not careful, using alias or specific import
import CustomButton from '../../../atoms/Button/Button'; 
import { DividerSection } from '../../../molecules/DividerSection/DividerSection';
import { LoadingCircular } from '../../../molecules/LoadingCircular/LoadingCircular';
import { ModalCrearClase } from './ModalCrearClase';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import LinkIcon from '@mui/icons-material/Link';
import dayjs from 'dayjs';

const ClaseCard: React.FC<{ clase: Clase }> = ({ clase }) => {
    return (
        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {clase.titulo}
                    </Typography>
                    <Chip 
                        label={clase.estatus} 
                        color={clase.estatus === 'Sin Iniciar' ? 'default' : (clase.estatus === 'En Curso' ? 'success' : 'secondary')} 
                        size="small" 
                    />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
                    {clase.descripcion}
                </Typography>

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <CalendarMonthIcon color="action" fontSize="small" />
                    <Typography variant="caption" color="text.secondary">
                        Inicio: {dayjs(clase.fecha_inicio).format('DD/MM/YYYY HH:mm')}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <CalendarMonthIcon color="action" fontSize="small" />
                    <Typography variant="caption" color="text.secondary">
                        Fin: {dayjs(clase.fecha_fin).format('DD/MM/YYYY HH:mm')}
                    </Typography>
                </Box>

                <Box display="flex" gap={1} flexWrap="wrap">
                    {clase.reunion_url && (
                        <Button 
                            variant="outlined" 
                            size="small" 
                            startIcon={<VideoCameraFrontIcon />}
                            href={clase.reunion_url}
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                        >
                            Unirse
                        </Button>
                    )}
                    {clase.grabacion_url && (
                         <Button 
                            variant="outlined" 
                            size="small" 
                            startIcon={<LinkIcon />}
                            href={clase.grabacion_url}
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                        >
                            Ver Grabación
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

interface ClasesData {
    grupo_alumnos: number;
}

const Clases: React.FC = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [selectedGroupName, setSelectedGroupName] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState<string>('');
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
    const [gruposAsignadosList, setGruposAsignadosList] = React.useState<ListadoGrupoAlumnos[]>([]);
    
    // Form setup
    const { control, formState: { errors }, watch, setValue } = useForm<ClasesData>({
        defaultValues: {
            grupo_alumnos: 0,
        },
    });

    const grupoSeleccionado = watch("grupo_alumnos");

    // Queries
    const { refetch: refetchGruposAsignados, isLoading: isLoadingGrupos } = GetGruposAsignados({ enabled: false });
    const { data: clasesData, isLoading: isLoadingClases } = GetClasesGrupo(grupoSeleccionado, { 
        enabled: grupoSeleccionado !== 0 
    });

    const filteredAndSortedClases = React.useMemo(() => {
        if (!clasesData?.data) return [];

        let result = [...clasesData.data];

        // Filter by Status
        if (statusFilter) {
            result = result.filter(clase => clase.estatus === statusFilter);
        }

        // Sort by Date
        result.sort((a, b) => {
            const dateA = new Date(a.fecha_inicio).getTime();
            const dateB = new Date(b.fecha_inicio).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        return result;
    }, [clasesData, statusFilter, sortOrder]);

    // Load groups
    useEffect(() => {
        const fetchData = async () => {
            const response = await refetchGruposAsignados();
            const data = response.data?.data?.grupos ?? [];
            setGruposAsignadosList(data);
        };
        fetchData();
    }, [refetchGruposAsignados]);

    const handleCreateClase = () => {
        if (grupoSeleccionado === 0) return;
        setOpenCreateModal(true);
    };

    return (
        <ContainerDesktop title="Clases">
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="grupo_alumnos"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.grupo_alumnos}>
                                <TextField
                                    label="Grupos de alumnos asignados"
                                    value={selectedGroupName}
                                    onClick={() => setOpenModal(true)}
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
                <Grid size={{ xs: 12, md: 2 }}>
                    <TextField
                        select
                        label="Estatus"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        fullWidth
                        SelectProps={{ native: true }}
                    >
                        <option value="">Todos</option>
                        <option value="Sin Iniciar">Sin Iniciar</option>
                        <option value="Finalizado">Finalizado</option>
                    </TextField>
                </Grid>
                 <Grid size={{ xs: 12, md: 2 }}>
                    <TextField
                        select
                        label="Orden por Fecha"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        fullWidth
                        SelectProps={{ native: true }}
                    >
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                     <CustomButton
                        variant="contained"
                        disabled={grupoSeleccionado === 0}
                        onClick={handleCreateClase}
                    >
                        Crear Clase
                    </CustomButton>
                </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
                <DividerSection Title="Listado de Clases" />
                
                {isLoadingClases ? (
                    <LoadingCircular Text="Cargando clases..." />
                ) : (
                    <Grid container spacing={2}>
                        {filteredAndSortedClases.length === 0 ? (
                             <Grid size={{ xs: 12 }}>
                                <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                                    No hay clases registradas para este grupo con los filtros seleccionados.
                                </Box>
                             </Grid>
                        ) : (
                             filteredAndSortedClases.map((clase) => (
                                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={clase.id_tutoria}>
                                    <ClaseCard clase={clase} />
                                </Grid>
                            ))
                        )}
                    </Grid>
                )}
            </Box>

            <ModalSeleccionGrupos 
                open={openModal} 
                onClose={() => setOpenModal(false)} 
                groups={gruposAsignadosList} 
                onSelect={(group) => {
                    setValue("grupo_alumnos", group.id_grupo, { shouldValidate: true });
                    setSelectedGroupName(group.nombre_grupo);
                    setOpenModal(false);
                }}
            />

            <ModalCrearClase
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                idGrupo={grupoSeleccionado}
            />
        </ContainerDesktop>
    );
};

export default Clases;
