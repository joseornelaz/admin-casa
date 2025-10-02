import React from "react";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { PageHeader } from "../../../molecules/PageHeader/PageHeader";
import { EmptyState } from "../../../molecules/EmptyState/EmptyState";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterVigenciaSchema, type FilterVigenciaData } from "../../../../schemas/filterVigenciaSchema";
import Button from "../../../atoms/Button/Button";
import DsSvgIcon from "../../../atoms/Icon/Icon";
import { Action, ArrowRightCircle, Book, Documento, Search, User } from "@iconsCustomizeds";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { RegistroVigenciasDialog } from "../../../molecules/Dialogs/RegistroVigenciasDialog/RegistroVigenciasDialog";

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
    // {
    //     estatus: 'ACTIVA',
    //     descripcion: 'Diseño de Interfaces I IDS COPPEL C2 - Sep 25',
    //     fechaInicio: '1 de Septiembre del 2025',
    //     fechaFin: '1 de Septiembre del 2025',
    //     idVigencia: '659',
    //     planEstudio: 'IDS Coppel',
    //     materia: 'Diseño de Interfaces',
    //     administrador: 'Cecilia Fornari'
    // },
    // {
    //     estatus: 'NORMAL',
    //     descripcion: 'Diseño de Interfaces I IDS COPPEL C2 - Sep 25',
    //     fechaInicio: '1 de Septiembre del 2025',
    //     fechaFin: '1 de Septiembre del 2025',
    //     idVigencia: '660',
    //     planEstudio: 'IDS Coppel',
    //     materia: 'Diseño de Interfaces',
    //     administrador: 'Cecilia Fornari'
    // },
    // {
    //     estatus: 'ACTIVA',
    //     descripcion: 'Diseño de Interfaces I IDS COPPEL C2 - Sep 25',
    //     fechaInicio: '1 de Septiembre del 2025',
    //     fechaFin: '1 de Septiembre del 2025',
    //     idVigencia: '600',
    //     planEstudio: 'IDS Coppel',
    //     materia: 'Diseño de Interfaces',
    //     administrador: 'Cecilia Fornari'
    // },
    // {
    //     estatus: 'NORMAL',
    //     descripcion: 'Diseño de Interfaces I IDS COPPEL C2 - Sep 25',
    //     fechaInicio: '1 de Septiembre del 2025',
    //     fechaFin: '1 de Septiembre del 2025',
    //     idVigencia: '100',
    //     planEstudio: 'IDS Coppel',
    //     materia: 'Diseño de Interfaces',
    //     administrador: 'Cecilia Fornari'
    // },
];

const Vigencias: React.FC = () => {
    const theme = useTheme();
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
            },
    });

    const [isEmptyState, setIsEmptyState] = React.useState<boolean>(false);
    // const [showDetails, setShowDetails] = React.useState<boolean>(true);
    const [counter, _setCounter] = React.useState<number>(0);
    

    const handleAction = () => {
        setIsEmptyState(false);
        setIsOpenRegistrar(true);
    }

    const handleSearch = () => {
        // setIsEmptyState(false);
    }

    const pageHeader = () => {

        return(
            <PageHeader 
                title="Vigencias" 
                buttonText="Crear vigencia" 
                buttonWidth={145}
                counter={counter} 
                onButtonClick={handleAction}
            />
        );
    }

    const InfoCard = (item: any) => {
        return(
            <Grid container spacing={2} mt={1}>
                {InfoCardColumn({title: 'ID Vigencia', value: item.idVigencia, icon: Action})}
                {InfoCardColumn({title: 'Plan de estudios', value: item.planEstudio, icon: Documento})}
                {InfoCardColumn({title: 'Materia', value: item.materia, icon: Book})}
                {InfoCardColumn({title: 'Administrador', value: item.administrador, icon: User})}
            </Grid>
        );
    }

    const InfoCardColumn = (item: {title: string, value: string, icon: any}) => (
        <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="body2" sx={{color: theme.palette.primary[600], fontWeight: 500}}>{item.title}</Typography>
            <Box display="flex" alignItems="center" gap={1}>
                <DsSvgIcon component={item.icon} />
                <Typography variant="body2" sx={{color: theme.palette.primary[600]}}>{item.value}</Typography>
            </Box>
        </Grid>
    )

    const VigenciaCard = (item: any) => {
        return(
            <BoxContainer 
                key={item.idVigencia}
                sxProps={{
                    minHeight: '236px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}
            >
                <Box sx={{ display:'flex', gap: '8px' }}>
                    <Box 
                        sx={{ 
                            minWidth: '60px', 
                            borderRadius: '6px', 
                            padding: '2px 8px 2px 8px', 
                            backgroundColor: item.estatus === 'NORMAL' ? '#E5F3FE' : '#E1FAE8'
                        }}
                    >
                        <Typography 
                            sx={{ 
                                fontSize:'11px', 
                                fontWeight: '700', 
                                lineHeight: '16px', 
                                textTransform: 'uppercase', 
                                color: item.estatus === 'NORMAL' ? '#067AD8' : '#009327'
                            }}
                        >NORMAL</Typography>
                    </Box>
                </Box>
                <Typography component="h5" variant="h5">
                    Diseño de Interfaces I IDS COPPEL C2 - Sep 25
                </Typography>
                {
                    InfoCard(item)
                }
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" gap="20px" alignItems="center">
                        <Typography variant="body2" sx={{color: theme.palette.primary[600]}}>
                         1 de Septiembre del 2025
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <DsSvgIcon component={ArrowRightCircle} />
                            <Typography variant="body2" sx={{color: theme.palette.primary[600]}}>
                                1 de Septiembre del 2025
                            </Typography>
                        </Box>
                    </Box>
                    <Box width="116px">
                        <Button
                            variant="outlined"
                            onClick={handleSearch}
                            fullWidth
                        >Ver detalles</Button>
                    </Box>
                </Box>
            </BoxContainer>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            <BoxContainer
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