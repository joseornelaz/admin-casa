import React from "react";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { PageHeader } from "../../../molecules/PageHeader/PageHeader";
import { EmptyState } from "../../../molecules/EmptyState/EmptyState";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterVigenciaSchema, type FilterVigenciaData } from "../../../../schemas/filterVigenciaSchema";
import Button from "../../../atoms/Button/Button";
import DsSvgIcon from "../../../atoms/Icon/Icon";
import { Calendar, Search } from "@iconsCustomizeds";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { RegistroVigenciasDialog } from "../../../molecules/Dialogs/RegistroVigenciasDialog/RegistroVigenciasDialog";
import { BorderRadius, flexRows, Paddings } from "@styles";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";

import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LogoCoppel from '../../../../assets/Img/logo_coppel.png';
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths } from "@constants";
import { SegmentedControl } from "../../../molecules/SegmentedControl/SegmentedControl";

const InfoCardArray = [
    {
        estatus: 'NORMAL',
        descripcion: 'Diseño de Interfaces I IDS COPPEL C2 - Sep 25',
        fechaInicio: '1 de Septiembre del 2025',
        fechaFin: '1 de Septiembre del 2025',
        idVigencia: '650',
        planEstudio: 'IDS Coppel',
        materia: 'Diseño de Interfaces',
        administrador: 'Cecilia Fornari'
    },
];

const Vigencias: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    

    const [isOpenRegistrar, setIsOpenRegistrar] = React.useState(false);

    const materias = [{ id: 0, nombre: 'Todas'}, { id: 1, nombre: 'Pendientes de calificar'}, { id: 2, nombre: 'Calificados'}];
    const { control, formState: { errors } } = useForm<FilterVigenciaData>({
            resolver: zodResolver(
                FilterVigenciaSchema(
                    (materias?.map((m) => m.id)) ?? [],
                )
            ),
            defaultValues: {
                materias: 0,
                planEstudios: 0,
                rutaEstudios: 0,
            },
    });

    const [isEmptyState, setIsEmptyState] = React.useState<boolean>(false);
    // const [showDetails, setShowDetails] = React.useState<boolean>(true);
    const [counter, _setCounter] = React.useState<number>(0);
    
    const [selected, setSelected] = React.useState('Activas');

    const handleChange = (value: string) => {
        setSelected(value);
        console.log('Opción seleccionada:', value);
    };

    const handleAction = () => {
        setIsEmptyState(false);
        setIsOpenRegistrar(true);
    }

    const handleSearch = () => {
        // setIsEmptyState(false);
    }

    const handleDetails = (item: any) => {
        navigate(`${AppRoutingPaths.VIGENCIAS_DETALLE.replace(':id',item.idVigencia)}`);
    }

    const pageHeader = () => {

        return(
            <PageHeader 
                title="Vigencias" 
                icon={Calendar}
                buttonText="Crear vigencia" 
                buttonWidth={145}
                counter={counter} 
                onButtonClick={handleAction}
                buttonIcon={<AddOutlinedIcon />}
            />
        );
    }

    const getTagContainer = (text: string, status: any) => <TagsContainer text={text} status={status} />;
    const getContextBreadcrumb = (section: 'Logo' | 'User', _item: any) => {
        let list: any[];
        if(section === 'Logo'){
            list = [
                { text: '', icon: LogoCoppel, type: 'logo' },
                { text: 'Prepa Coppel', icon: ImportContactsOutlinedIcon, type: 'iconText' },
                { text: 'Coppel 2022', icon: SchemaOutlinedIcon, type: 'iconText' },
            ];
        }else {
            list = [
                { text: 'Cecilia Fornari', icon: ManageAccountsOutlinedIcon, type: 'iconText' },
                { text: '3 Grupos asignados', icon: DynamicFeedOutlinedIcon, type: 'iconText' },
                { text: 'Fecha de creación el 26 de Septiembre del 2025', icon: CalendarMonthOutlinedIcon, type: 'iconText' },
            ];
        }

        return(<ContextBreadcrumb list={list} />)
    }

    const VigenciaCard = (item: any) => {
        return(
            <BoxContainer 
                key={item.idVigencia}
                sxProps={{
                    minHeight: '236px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    backgroundColor: theme.palette.primary[50],
                }}
            >
                { getTagContainer("VIGENCIA-0001", "default") }
                { getContextBreadcrumb('Logo', item) }
                <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                    <Typography component="h5" variant="h5">
                        Diseño de Interfaces I IDS COPPEL C2 - Sep 25
                    </Typography>
                    <TagsContainer text="NORMAL" status="normal" />
                    <TagsContainer text="ACTIVA" status="activa" />
                </Box>
                { getContextBreadcrumb('User', item) }
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" gap="20px" alignItems="center">
                        <Typography variant="body2" sx={{color: theme.palette.primary[600]}}>
                         1 de Septiembre del 2025
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <ArrowRightAltOutlinedIcon color="primary" />
                            <Typography variant="body2" sx={{color: theme.palette.primary[600]}}>
                                1 de Septiembre del 2025
                            </Typography>
                        </Box>
                    </Box>
                    <Box width="116px">
                        <Button
                            variant="outlined"
                            onClick={() => handleDetails(item)}
                            fullWidth
                        >Ver detalles</Button>
                    </Box>
                </Box>
            </BoxContainer>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <TitleHeader text="Vigencias" subTitle="Monitorea y gestiona fechas importantes, grupos y alumnos" />
            <BoxContainer backgroundColor="grey">
                <PageHeader 
                    title="Filtros de Consulta" 
                    icon={SearchOutlinedIcon}
                />

                <Box
                    sx={{
                        mt: 2,
                        padding: Paddings.m,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        backgroundColor: theme.palette.primary[50],
                        border: 1,
                        borderColor: theme.palette.primary[200],
                        borderRadius: BorderRadius.sm,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller
                                name="planEstudios"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.planEstudios}>
                                        <InputLabel id="grupo-label">Plan de Estudios</InputLabel>
                                        <Select
                                            // disabled={isLoading}
                                            labelId="grupo-label"
                                            label="Plan de Estudios"
                                            {...field}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                field.onChange(value);
                                                // setIsDisabledListadoForos(true);
                                                // handleForos();
                                            }}
                                        >
                                            {
                                            materias && materias.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.nombre}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller
                                name="rutaEstudios"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.rutaEstudios}>
                                        <InputLabel id="grupo-label">Ruta de estudios</InputLabel>
                                        <Select
                                            // disabled={isLoading}
                                            labelId="grupo-label"
                                            label="Ruta de estudios"
                                            {...field}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                field.onChange(value);
                                                // setIsDisabledListadoForos(true);
                                                // handleForos();
                                            }}
                                        >
                                            {
                                            materias && materias.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.nombre}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 10 }}>
                            <Controller
                                name="materias"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.materias}>
                                        <InputLabel id="grupo-label">Materia</InputLabel>
                                        <Select
                                            // disabled={isLoading}
                                            labelId="grupo-label"
                                            label="Materia"
                                            {...field}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                field.onChange(value);
                                                // setIsDisabledListadoForos(true);
                                                // handleForos();
                                            }}
                                        >
                                            {
                                            materias && materias.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.nombre}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handleSearch}
                                fullWidth
                                icon={<DsSvgIcon component={Search} />}
                                iconPosition="start"
                            >Buscar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </BoxContainer>
            
            <BoxContainer
                backgroundColor="grey"
                sxProps={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: `${InfoCardArray.length > 0 ? 'initial' : 'space-between'}`,
                    minHeight: '532px',
                    gap: '16px',
                }}
            >
                { pageHeader() }
                {
                    isEmptyState 
                    ?
                        <EmptyState 
                            title="No existen vigencias." 
                            subTitle="Crea una vigencia para poder gestionar grupos y estudiantes."
                            buttonText="Crear vigencia"
                            buttonWidth={145}
                            onButtonClick={handleAction} 
                        />
                    :
                    <>
                        <SegmentedControl
                            options={['Normal', 'Activas', 'Habilitadas']}
                            value={selected}
                            onChange={handleChange}
                        />
                        {
                            InfoCardArray.map((item) => VigenciaCard(item))
                        }
                    </>
                }
                    
            </BoxContainer>
            <RegistroVigenciasDialog isOpen={isOpenRegistrar} close={() => setIsOpenRegistrar(false)} />
        </Box>
    );
}

export default Vigencias;