import { Box, useTheme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";

type TitleHeaderProps = {
    text: string;
    subTitle?: string;
    fontSize?: "h1" | "h2" | "h3" | "h4"
};

export const TitleHeader: React.FC<TitleHeaderProps> = ({text, subTitle, fontSize = "h2"}) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: 'column', mb: 2, gap: 1 }} >
                <Typography color="primary" component={fontSize} variant={fontSize}>
                    { text }
                </Typography>
                { 
                    subTitle && <Typography component="span" variant="caption" sxProps={{ color: theme.palette.primary[600]}}>
                        { subTitle }
                    </Typography>
                }
            </Box>
        </>
    );
};