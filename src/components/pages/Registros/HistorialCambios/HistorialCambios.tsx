import Box from "@mui/material/Box";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";

import { Search } from "@iconsCustomizeds";
import { Accordion } from "../../../molecules/Accordion/Accordion";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CommitOutlinedIcon from '@mui/icons-material/CommitOutlined';
import { MetricCard, type MetricCardProps } from "../../../molecules/MetricCard/MetricCard";
import { FormControl, Grid, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { PageHeader } from "../../../molecules/PageHeader/PageHeader";
import Button from "../../../atoms/Button/Button";
import DsSvgIcon from "../../../atoms/Icon/Icon";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import LogoCoppel from '../../../../assets/Img/logo_coppel.png';

import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";
import { flexColumn, flexRows } from "@styles";
import { Avatar } from "../../../atoms/Avatar/Avatar";


const MetricCardArray: MetricCardProps[] = [
    { title: 'Movimientos', icon: ShowChartOutlinedIcon, value: 3, subtitle: 'Registros en total' },
    { title: 'Alumnos', icon: ManageAccountsOutlinedIcon, value: 345, subtitle: 'Nuevos' },
    { title: 'Validaciones', icon: AssignmentTurnedInOutlinedIcon, value: 8.6, subtitle: 'Documentos' },
    { title: 'Prospectos', icon: AssignmentTurnedInOutlinedIcon, value: 8.6, subtitle: 'Requieren atención' },
];

const HistorialCambios: React.FC = () => {
    const theme = useTheme();
    
    const customHeader = (item: any) => (
        <TitleHeader 
            text={item.text}
            subTitle={item.subTitle}
            fontSize="h5"
            icon={item.icon}
            marginBottom={0}
        />
    )

    const getTagContainer = (text: string, status: any) => <TagsContainer text={text} status={status} />;
    const getContextBreadcrumb = (_item: any) => {
        const list: any[] = [
            { text: '', icon: LogoCoppel, type: 'logo' },
            { text: 'Prepa Coppel', icon: ImportContactsOutlinedIcon, type: 'iconText' },
            { text: 'Coppel 2022', icon: SchemaOutlinedIcon, type: 'iconText' },
        ];

        return(<ContextBreadcrumb list={list} />)
    }

    const cardResponsable = () => {
        return(
            <Box sx={{...flexRows, alignItems: 'center', justifyContent: 'space-between'}}>
                <Box sx={{...flexColumn, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                        <ArrowForwardOutlinedIcon />
                        <Avatar width={24} height={24}></Avatar>
                        <Typography component="h6" variant="h6">
                            Rosa Armida Espinoza Angulo
                        </Typography>
                        <Typography component="span" variant="caption">
                            (Hace 1 día)
                        </Typography>
                        <TagsContainer text="GESTION ESCOLAR" status="transparent" />                
                    </Box>
                    <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                        <CommitOutlinedIcon />
                        <ContextBreadcrumb list={[
                            {text: 'Validó documentos e inscribió alumno (5 Campos modificados)', type: 'iconText'},
                            {text: '24 de Septiembre del 2025 10:03', type: 'iconText'},
                            ]} 
                        />
                    </Box>
                </Box>
                <IconButton>
                    <VisibilityOffOutlinedIcon />
                </IconButton>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TitleHeader text="Historial de Cambios" subTitle="Cronología detallada de todos los movimientos realizados en el expediente de Alta única." />
            <Accordion 
                customHeader={customHeader({text: 'Estadísticas', icon: PeopleAltOutlinedIcon, subTitle: 'Resumen general de cambios que se han hecho en la sección de registros.' })} 
                isExpanded={true}
                backgroundDetails={{ backgroundColor: theme.palette.primary[100]}}
                sxProps={{ backgroundColor: theme.palette.primary[100] }}
            >
                <BoxContainer backgroundColor="light">
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                        {
                            MetricCardArray.map((item, i) => <MetricCard {...item} key={i} />)
                        }
                    </Box>
                </BoxContainer>
            </Accordion>
            <BoxContainer backgroundColor="grey">
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    <PageHeader 
                        title="Filtros de Consulta" 
                        icon={SearchOutlinedIcon}
                    />
                    <BoxContainer backgroundColor="light">
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4, md: 5 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="numeroEmpleado"
                                        label={'Numero de Empleado'}
                                        placeholder="0000000"
                                        sx={{mb: 0}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4, md: 5 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="busquedaEmpleado"
                                        label={'Busqueda por persona'}
                                        sx={{mb: 0}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {}}
                                    fullWidth
                                    icon={<DsSvgIcon component={Search} />}
                                    iconPosition="start"
                                >Buscar</Button>
                            </Grid>
                        </Grid>
                    </BoxContainer>
                </Box>
            </BoxContainer>
            <Accordion 
                customHeader={customHeader({text: 'Estadísticas', icon: AutoAwesomeOutlinedIcon, subTitle: 'Resumen general de cambios que se han hecho en la sección de registros.' })} 
                isExpanded={true}
                sxProps={{ backgroundColor: theme.palette.primary[100] }}
            >
                
                    <BoxContainer 
                        backgroundColor="grey"
                    >
                        <Box sx={{...flexRows, justifyContent: 'space-between', mb: 2}}>
                            <Box>
                                { getTagContainer("REG-0001", "default") }
                                { getContextBreadcrumb('') }
                                <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                                    <Avatar></Avatar>
                                    <Typography component="h5" variant="h5">
                                        Jesús Efraín Chan Chan
                                    </Typography>
                                    <TagsContainer text="ALUMNO" status="normal" />
                                    <TagsContainer text="COLABORADOR" status="normal" />
                                    <TagsContainer text="ACTIVA" status="activa" />
                                </Box>
                            </Box>
                            <IconButton>
                                <MoreHorizOutlinedIcon />
                            </IconButton>
                        </Box>
                        {cardResponsable()}
                    </BoxContainer>
                
            </Accordion>
        </Box>
    );
}

export default HistorialCambios;