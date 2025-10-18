import Box from "@mui/material/Box";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";
import Typography from "@mui/material/Typography";
import { flexColumn, flexRows } from "@styles";

import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LogoCoppel from '../../../../assets/Img/logo_coppel.png';
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { IconText } from "../../../molecules/IconText/IconText";
import { MetricCard, type MetricCardProps } from "../../../molecules/MetricCard/MetricCard";
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { Grupos } from "@components";

const MetricCardArray: MetricCardProps[] = [
    { title: 'Grupos activos', icon: ShowChartOutlinedIcon, value: 3, subtitle: 'En los últimos 2 meses' },
    { title: 'Estudiantes', icon: ManageAccountsOutlinedIcon, value: 345, subtitle: 'Activos' },
    { title: 'Grupos activos', icon: AssignmentTurnedInOutlinedIcon, value: 8.6, subtitle: 'Promedio general' },
];

const VigenciasDetalles: React.FC = () => {
    const theme = useTheme();
    const itemDetalle = {
        estatus: 'NORMAL',
        descripcion: 'Diseño de Interfaces I IDS COPPEL C2 - Sep 25',
        fechaInicio: '1 de Septiembre del 2025',
        fechaFin: '1 de Septiembre del 2025',
        idVigencia: '650',
        planEstudio: 'IDS Coppel',
        materia: 'Diseño de Interfaces',
        administrador: 'Cecilia Fornari'
    };

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

    const VigenciaColumn = (tituloFecha: string, fechaInicio: string) => (
        <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{...flexColumn, alignItems: 'flex-start', gap: '9px'}}>
                <IconText 
                        text={tituloFecha}
                        variantText="h6" 
                        Icon={CalendarMonthOutlinedIcon} 
                        iconSize="20px" 
                />
                <Box display="flex" gap="20px" alignItems="center" sx={{pl: 4}}>
                    <Typography variant="caption" sx={{color: theme.palette.primary[700]}}>
                        { fechaInicio }
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )

    const VigenciaCard = (item: any) => {
        return(
            <BoxContainer 
                key={item.idVigencia}
                backgroundColor="grey"
            >
                <BoxContainer 
                    sxProps={{
                        minHeight: '236px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        backgroundColor: theme.palette.primary[50]
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
                    <BoxContainer backgroundColor="grey">
                        <Grid container spacing={2}>
                            {VigenciaColumn("Fecha inicio de Asesor","1 de Septiembre del 2025")}
                            {VigenciaColumn("Fecha limite de carga","1 de Septiembre del 2025")}
                        </Grid>
                        <Grid container spacing={2} sx={{pt: 2}}>
                            {VigenciaColumn("Fecha inicio del Estudiante","1 de Septiembre del 2025")}
                            {VigenciaColumn("Fecha fin del curso","1 de Septiembre del 2025")}
                        </Grid>
                    </BoxContainer>
                </BoxContainer>
            </BoxContainer>
        )
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <TitleHeader text="Detalles de la Vigencia" subTitle="Monitorea y gestiona fechas importantes, grupos y alumnos" />
            { VigenciaCard(itemDetalle) }
            <BoxContainer backgroundColor="grey">
                <TitleHeader 
                    icon={PeopleAltOutlinedIcon}
                    text="Estado de la Vigencia" 
                    subTitle="Resumen de la vigencia y su contenido." 
                />
                <BoxContainer
                    sxProps={{ backgroundColor: theme.palette.primary[50]}}
                >
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                        {
                            MetricCardArray.map((item, i) => <MetricCard {...item} key={i} />)
                        }
                    </Box>
                </BoxContainer>
            </BoxContainer>
            <Grupos />
        </Box>
    );
}

export default VigenciasDetalles;