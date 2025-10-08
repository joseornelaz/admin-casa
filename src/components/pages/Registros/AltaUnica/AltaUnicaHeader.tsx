import Box from "@mui/material/Box";
import { CircularProgress } from "../../../molecules/CircularProgress/CircularProgress";
import { flexColumn } from "@styles";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";

type AltaUnicaHeaderProps = {
    text: string;
    subText: string;
    estatus: string;
    valueProgress: number;
    currentStep: number;
}

export const AltaUnicaHeader: React.FC<AltaUnicaHeaderProps> = ({ text, subText, estatus, valueProgress, currentStep }) => {
    const theme = useTheme();
    
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <CircularProgress value={valueProgress} current={currentStep} total={3} />
            <Box sx={{...flexColumn, gap: '8px', alignItems: 'flex-start'}}>
            <Box sx={{...flexColumn, gap: '4px', alignItems: 'flex-start'}}>
                <Typography variant="h3" color="primary">
                    {text}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.grey[800] }}>
                    {subText}
                </Typography>
            </Box>
            { estatus && <TagsContainer text="ADMISIÓN" status="transparent" /> }
            </Box>
        </Box>
    );
}