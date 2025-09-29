import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export const TopBar: React.FC = () => {
    return(
        <AppBar 
            position="static" 
            sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '1px solid #D3D9E4', p: 0 }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Stack spacing={2}>
                            <Breadcrumbs separator="›" aria-label="breadcrumb">
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href="/"
                                >
                                    <HomeIcon sx={{ mr: 0.5, fontSize: '24px' }} fontSize="inherit" />
                                </Link>
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href="/"
                                >
                                    <Typography variant='h3' color='primary'>Grupos</Typography>
                                </Link>
                            </Breadcrumbs>
                        </Stack>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}