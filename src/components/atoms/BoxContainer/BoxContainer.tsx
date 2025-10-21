import { useTheme, type SxProps, type Theme } from "@mui/material";
import Box from "@mui/material/Box";

type BoxContainerProps = {
    children: React.ReactNode;
    sxProps?: SxProps<Theme>;
    backgroundColor?: 'grey' | 'light' | 'blank';
}

export const BoxContainer: React.FC<BoxContainerProps> = ({ children, sxProps, backgroundColor = 'blank' }) => {
    const theme = useTheme();
    
    const setBackground = () => {
        switch(backgroundColor) {
            case "grey": return theme.palette.primary[100];
            case "light": return theme.palette.primary[50];
            case "blank": return undefined;
        }
    }

    return(
        <Box
            sx={{
                    backgroundColor: setBackground(),
                    width: '100%',
                    padding: '24px',
                    borderRadius: '6px',
                    border: `1px solid ${theme.palette.primary[200]}`,
                    ...sxProps
                }}
        >{children}</Box>
    );
}