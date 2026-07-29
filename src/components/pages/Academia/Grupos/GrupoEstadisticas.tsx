import Box from "@mui/material/Box";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { MetricCard, type MetricCardProps } from "../../../molecules/MetricCard/MetricCard";

import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

const MetricCardArray: MetricCardProps[] = [
    { title: 'Estudiantes activos', icon: ShowChartOutlinedIcon, value: 3, subtitle: 'Inscritos en esta materia' },
    { title: 'Promedio', icon: AssignmentTurnedInOutlinedIcon, value: 8.6, subtitle: 'Avance total' },
    { title: 'Avance Grupal', icon: ManageAccountsOutlinedIcon, value: '72%', subtitle: 'Por calificar' },
    { title: 'Completados', icon: ManageAccountsOutlinedIcon, value: 345, subtitle: 'Por calificar' },
];

export const GrupoEstadisticas: React.FC = () => {
    return(
        <BoxContainer
            backgroundColor="grey"
            sxProps={{ display: 'flex', flexDirection: 'column' }}
        >
            {/* <BoxContainer backgroundColor="light"> */}
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    {
                        MetricCardArray.map((item, i) => <MetricCard {...item} key={i} />)
                    }
                </Box>
            {/* </BoxContainer> */}
        </BoxContainer>
    );
}