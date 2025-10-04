import { Box, Typography, useTheme, type TypographyVariant } from "@mui/material";

type IconTextProps = {
    text?: string;
    variantText?: TypographyVariant;
    Icon: React.ElementType;
    iconSize?: string;
};

export const IconText: React.FC<IconTextProps> = ({text, variantText = "overline", Icon, iconSize = "12px"}) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{ display: "flex", gap: 1, alignItems: 'center' }} >
                { Icon && <Icon sx={{ fontSize: `${iconSize}`,  color: theme.palette.primary.main }} /> }
                <Typography color="primary" variant={variantText} sx={{textTransform: 'none'}}>
                    { text }
                </Typography>
            </Box>
        </>
    );
};