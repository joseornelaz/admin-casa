import { Box, useTheme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";

type TitleHeaderProps = {
    text: string;
    subTitle?: string;
    fontSize?: "h1" | "h2" | "h3" | "h4" | "h5";
    icon?: React.ElementType;
    marginBottom?: number;
};

export const TitleHeader: React.FC<TitleHeaderProps> = ({text, subTitle, fontSize = "h2", icon: Icon, marginBottom = 2}) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: 'column', mb: marginBottom, gap: 1 }} >
                <Box sx={{ display: "flex", gap: 1, alignItems: 'center' }} >
                    {Icon && <Icon />}
                    <Typography color="primary" component={fontSize} variant={fontSize}>
                        { text }
                    </Typography>
                </Box>
                { 
                    subTitle && <Typography component="span" variant="caption" sxProps={{ color: theme.palette.primary[600]}}>
                        { subTitle }
                    </Typography>
                }
            </Box>
        </>
    );
};