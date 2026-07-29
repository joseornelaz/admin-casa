import Box from "@mui/material/Box";
import type React from "react";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { Grid, Typography, useTheme } from "@mui/material";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import { flexRows } from "@styles";
import { formatFriendlyDate, parseStatus } from "../../../../utils/Helpers";
import { ContextBreadcrumbLogo } from "../../../molecules/ContextBreadcrumbLogo/ContextBreadcrumbLogo";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { GetPeriodoById } from "../../../../services/PeriodoInscripcionService";
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { LoadingCircular } from "../../../molecules/LoadingCircular/LoadingCircular";
import { FechaColumn } from "../../../molecules/FechaColumn/FechaColumn";
import { MetricCard, type MetricCardProps } from "../../../molecules/MetricCard/MetricCard";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

type PeriodoDetallesProps = {
    idPeriodo: number;
    goBack: () => void;
}

const MetricCardArray: MetricCardProps[] = [
    { title: 'Solicitudes recibidas', icon: ListAltOutlinedIcon, value: 128, subtitle: 'en este periodo' },
    { title: 'Inscripciones confirmadas', icon: ManageAccountsOutlinedIcon, value: 345, subtitle: 'Activas' },
    { title: 'Días restantes', icon: CalendarMonthOutlinedIcon, value: 6, subtitle: 'para el cierre' },
];

export const PeriodoDetalles: React.FC<PeriodoDetallesProps> = ({ idPeriodo, goBack }) => {
    const theme = useTheme();
    
    const { data: item, isLoading } = GetPeriodoById(idPeriodo ?? 0, { 
        enabled: !!idPeriodo
    });

    const getTagContainer = (text: string, status: any) => <TagsContainer text={text} status={status} />;
    const getContextBreadcrumb = (item: any) => {
        const list: any = [
            { text: '3 Grupos asignados', icon: DynamicFeedOutlinedIcon, type: 'iconText' },
            { text: `Creación: ${formatFriendlyDate(item.fechaCreacion)}`, icon: CalendarMonthOutlinedIcon, type: 'iconText' },
        ];

        return(<ContextBreadcrumb list={list} />)
    }

    const parseEnabledStatus = (enabled: boolean): string => {
        return enabled ? "activa" : "inactivo";
    }
    
    if (isLoading) {
        return <LoadingCircular />;
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <Box
                onClick={goBack}
                sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: theme.palette.primary[600],
                    cursor: 'pointer',
                    ":hover": {
                        color: theme.palette.primary[800],
                        textDecoration: 'underline'
                    }
                }}
            >
                <ArrowBackIosOutlinedIcon />
                <Typography variant="body1" sx={{color: theme.palette.primary[600]}}>
                    Regresar a periodos de inscripción
                </Typography>
            </Box>
            <BoxContainer 
                key={item.id}
                sxProps={{
                    minHeight: '236px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    backgroundColor: theme.palette.primary[50],
                }}
            >
                <Box sx={{...flexRows, gap: 2, justifyContent: 'flex-start'}}>
                    { getTagContainer(`PERIODO - ${item.id}`, "default") }
                    { /* Estatus del periodo */
                        getTagContainer(item.estatusPeriodo, parseStatus(item.estatusPeriodo)) }
                    { getTagContainer(parseEnabledStatus(item.enabled || false).toUpperCase(), parseEnabledStatus(item.enabled || false)) } 
                </Box>
                <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                    <Typography component="h5" variant="h5">
                        { item.nombrePeriodo }
                    </Typography>
                </Box>
                <ContextBreadcrumbLogo />
                { getContextBreadcrumb(item) }
                <BoxContainer backgroundColor="blank">
                    <Grid container spacing={2} sx={{pb: 2}}>
                        <FechaColumn label="Inicio de inscripción" value={formatFriendlyDate(item.inicioInscripcion)} />
                        <FechaColumn label="Fin de inscripción" value={formatFriendlyDate(item.finInscripcion)} />
                    </Grid>
                    <Grid container spacing={2}>
                        <FechaColumn label="Inicio en plataforma" value={formatFriendlyDate(item.inicioInscripcion)} />
                        <FechaColumn label="Estatus del periodo" value={item.estatusPeriodo} icon={BookmarkBorderOutlinedIcon}/>
                    </Grid>
                </BoxContainer>
            </BoxContainer>
            <BoxContainer>
                <TitleHeader 
                    icon={InsightsOutlinedIcon}
                    text="Estado del Periodo" 
                    subTitle="Resumen del periodo de inscripción." 
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
        </Box>
    )
};