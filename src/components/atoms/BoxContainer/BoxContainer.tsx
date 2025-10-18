import { useTheme, type SxProps, type Theme } from "@mui/material";
import Box from "@mui/material/Box";

type BoxContainerProps = {
    children: React.ReactNode;
    sxProps?: SxProps<Theme>;
    backgroundColor?: 'grey' | 'blank';
}

export const BoxContainer: React.FC<BoxContainerProps> = ({ children, sxProps, backgroundColor = 'blank' }) => {
    const theme = useTheme();
    
    return(
        <Box
            sx={{
                    backgroundColor: backgroundColor === 'grey' ? theme.palette.primary[100] : undefined,
                    width: '100%',
                    padding: '24px',
                    borderRadius: '6px',
                    border: `1px solid ${theme.palette.primary[200]}`,
                    ...sxProps
                }}
        >{children}</Box>
    );
}