import type { SvgIconProps } from "@mui/material/SvgIcon";
import { BoxContainer } from "../../atoms/BoxContainer/BoxContainer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paddings } from "@styles";
import { useTheme } from "@mui/material/styles";

export type MetricCardProps = {
    icon: React.ComponentType<SvgIconProps>;
    title: string;
    value: string | number;
    subtitle?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, subtitle }) => {
    const theme = useTheme();

    return (
        <BoxContainer
            sxProps={{
                p: Paddings.l,
                minHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                gap: Paddings.l
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon sx={{fontSize: '24px'}}/>
                <Typography sx={{color: theme.palette.primary[700]}}>{title}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <Typography variant="h3" color="primary">{value}</Typography>
                {subtitle && <Typography variant="body2" sx={{color: theme.palette.primary[700]}}>{subtitle}</Typography>}
            </Box>
        </BoxContainer>
    );
}