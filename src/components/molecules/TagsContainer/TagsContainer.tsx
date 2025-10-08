import { Chip, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { BorderRadius, StateColors } from "@styles";

type TagsContainerProps = {
    text: string;
    status: 'prueba' | 'normal' | 'activa' | 'inactivo' | 'transparent' | 'default';
}

export const TagsContainer: React.FC<TagsContainerProps> = ({text, status}) => {    
    const theme = useTheme();

    const setBackgroundColor = () => {
        switch(status){
            case "activa": return StateColors.enabledBackground;
            case "normal": return StateColors.idleBackground;
            case "prueba": return StateColors.backlogBackground;
            case "inactivo": return StateColors.disabledBackground;
            case "transparent": return 'transparent';
            default: return theme.palette.primary[300];
        }
    }

    const setFontColor = () => {
        switch(status) {
            case "activa": return StateColors.enabledForeground;
            case "normal": return StateColors.idleForeground;
            case "prueba": return StateColors.backlogForeground;
            case "inactivo": return StateColors.disabledForeground;
            default: return theme.palette.primary[600];
        }
    }

    return(
        <Box sx={{ display:'flex' }}>
            <Chip 
                label={text}
                size="small"
                sx={{
                    fontSize: theme.typography.overline.fontSize,
                    fontWeight: 700,      
                    lineHeight: theme.typography.overline.lineHeight,
                    bgcolor: setBackgroundColor(),
                    color: setFontColor(),
                    border: `1px solid ${ status !== 'transparent' ? setBackgroundColor() : theme.palette.primary[500]}`,
                    borderRadius: BorderRadius.sm
                }}
            />
        </Box>
        // <Box sx={{ display:'flex' }}>
        //     <Box 
        //         sx={{ 
        //             minWidth: '60px', 
        //             borderRadius: BorderRadius.sm, 
        //             padding: '2px 4px 2px 4px', 
        //             backgroundColor: setBackgroundColor(),
        //             display: 'flex',
        //             justifyContent: 'center'
        //         }}
        //     >
        //         <Typography variant="overline"
        //             sx={{ 
        //                 textTransform: 'uppercase', 
        //                 color: setFontColor()
        //             }}
        //         >{text}</Typography>
        //     </Box>
        // </Box>
    );
} 