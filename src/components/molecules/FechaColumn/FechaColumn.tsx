import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { flexColumn } from "@styles";
import { IconText } from "../IconText/IconText";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

type FechaColumnProps = {
    label: string;
    value: string;
    icon?: React.ElementType | any;
}

export const FechaColumn: React.FC<FechaColumnProps> = ({ label, value, icon = undefined }) => {
    const theme = useTheme();
    return <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{...flexColumn, alignItems: 'flex-start', gap: '9px'}}>
            <IconText 
                text={label}
                variantText="h6" 
                Icon={!icon ? CalendarMonthOutlinedIcon : icon} 
                iconSize="20px" 
            />
            <Box display="flex" gap="20px" alignItems="center" sx={{pl: 4}}>
                <Typography variant="caption" sx={{color: theme.palette.primary[700]}}>
                    { value }
                </Typography>
            </Box>
        </Box>
    </Grid>
}