import { useTheme, type SxProps, type Theme } from "@mui/material";
import Box from "@mui/material/Box";

type BoxContainerProps = {
    children: React.ReactNode;
    sxProps?: SxProps<Theme>;
}

export const BoxContainer: React.FC<BoxContainerProps> = ({ children, sxProps }) => {
    const theme = useTheme();

    return(
        <Box
            sx={{
                width: '100%',                
                padding: '24px',
                borderRadius: '6px',
                border: `1px solid ${theme.palette.primary[200]}`,
                ...sxProps
            }}
        >{children}</Box>
    );
}