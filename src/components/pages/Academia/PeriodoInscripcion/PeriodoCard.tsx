import Box from "@mui/material/Box";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import Typography from "@mui/material/Typography";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";

import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Button from "../../../atoms/Button/Button";
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";
import { flexRows } from "@styles";
import { useTheme } from "@mui/material";
import type { PeriodoInscripcion } from "../../../../types/PeriodoInscripcion.interface";
import { formatFriendlyDate, parseStatus } from "../../../../utils/Helpers";
import { ContextBreadcrumbLogo } from "../../../molecules/ContextBreadcrumbLogo/ContextBreadcrumbLogo";

type PeriodoCardProps = {
    item: PeriodoInscripcion;
    handleDetail: (item: any) => void;
}

export const PeriodoCard: React.FC<PeriodoCardProps> = ({item, handleDetail}) => {
    const theme = useTheme();
    
    const getTagContainer = (text: string, status: any) => <TagsContainer text={text} status={status} />;
    const getContextBreadcrumb = (item: any) => {
        const list: any = [
            { text: '3 Grupos asignados', icon: DynamicFeedOutlinedIcon, type: 'iconText' },
            { text: `Creación: ${formatFriendlyDate(item.fechaCreacion)}`, icon: CalendarMonthOutlinedIcon, type: 'iconText' },
        ];

        return(<ContextBreadcrumb list={list} />)
    }

    const handleDetails = (item: any) => {
        if(handleDetail){
            handleDetail(item);
        }
    }

    const parseEnabledStatus = (enabled: boolean): string => {
        return enabled ? "activa" : "inactivo";
    }

    return(
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
            <Box sx={{...flexRows, justifyContent: 'space-between'}}>
                { getTagContainer(`PERIODO - ${item.id}`, "default") }
                <Box sx={{...flexRows, gap: 2}}>
                { /* Estatus del periodo */
                    getTagContainer(item.estatusPeriodo, parseStatus(item.estatusPeriodo)) }
                
                { getTagContainer(parseEnabledStatus(item.enabled || false).toUpperCase(), parseEnabledStatus(item.enabled || false)) } 
                </Box>
            </Box>
            <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                <Typography component="h5" variant="h5">
                    { item.nombrePeriodo }
                </Typography>

                
            </Box>
            <ContextBreadcrumbLogo />
            { getContextBreadcrumb(item) }
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" gap="20px" alignItems="center">
                    <Typography variant="body2" sx={{color: theme.palette.primary[600]}}>
                        { formatFriendlyDate(item.inicioInscripcion) }
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <ArrowRightAltOutlinedIcon color="primary" />
                        <Typography variant="body2" sx={{color: theme.palette.primary[600]}}>
                            { formatFriendlyDate(item.finInscripcion) }
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