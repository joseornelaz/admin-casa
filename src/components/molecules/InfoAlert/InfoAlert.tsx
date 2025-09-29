import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { Action } from '@iconsCustomizeds';

type InfoAlertProps = {
    text: string;
}

export const InfoAlert: React.FC<InfoAlertProps> = ({ text }) => {
    const theme = useTheme();
    
    return(
        <Box
            sx={{ 
                border: '1px solid #E2E7F0', 
                borderRadius: '6px', 
                p: '16px', 
                backgroundColor: theme.palette.primary[100], 
                width: '100%', 
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}
        >
            <DsSvgIcon component={Action} />
            <Typography component="span" color="primary" variant="body2">{text}</Typography>
        </Box>
    )
}