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
import { flexRows } from "@styles";
import { Avatar } from "../../../atoms/Avatar/Avatar";
import { ResponsableCard } from "./ResponsableCard";


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
                        sxProps={{ backgroundColor: theme.palette.primary[200], p: '16px 24px' }}
                    >
                        <Box sx={{...flexRows, justifyContent: 'space-between' }}>
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
                    </BoxContainer>
                    <ResponsableCard />
            </Accordion>
        </Box>
    );
}

export default HistorialCambios;