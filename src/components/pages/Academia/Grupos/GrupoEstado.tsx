import Box from "@mui/material/Box";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { MetricCard, type MetricCardProps } from "../../../molecules/MetricCard/MetricCard";

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

const MetricCardArray: MetricCardProps[] = [
    { title: 'Estudiantes activos', icon: ShowChartOutlinedIcon, value: 3, subtitle: 'Inscritos en esta materia' },
    { title: 'Pendientes', icon: ManageAccountsOutlinedIcon, value: 345, subtitle: 'Por calificar' },
    { title: 'Progreso', icon: AssignmentTurnedInOutlinedIcon, value: 8.6, subtitle: 'Avance total' },
];

export const GrupoEstado: React.FC = () => {
    return(
        <BoxContainer
            sxProps={{ display: 'flex', flexDirection: 'column' }}
        >
            <TitleHeader 
                text="Estado del Grupo" 
                subTitle="Resumen de estudiantes activos en este grupo"
                icon={PeopleAltOutlinedIcon}
                fontSize="h3"
            />
            <Box sx={{ display: 'flex', gap: '16px' }}>
                {
                    MetricCardArray.map((item, i) => <MetricCard {...item} key={i} />)
                }
            </Box>
        </BoxContainer>
    );
}