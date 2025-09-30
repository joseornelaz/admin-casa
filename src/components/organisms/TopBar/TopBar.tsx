import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { AppRoutingPaths } from '@constants';

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

type TopBarProps = {
    path: { path: string, text: string } | null;
    isHome?: () => void
}

export const TopBar: React.FC<TopBarProps> = ({ path, isHome }) => {
    const handleRouting = () => {
        if(isHome) isHome();
    }

    return(
        <AppBar 
            position="static" 
            sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '1px solid #D3D9E4', p: 0 }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Stack spacing={2}>
                            <Breadcrumbs 
                                separator="›" 
                                aria-label="breadcrumb"
                                sx={{ fontSize: '32px'}}
                            >
                                <MuiLink
                                    onClick={handleRouting}
                                    component={RouterLink}
                                    to={AppRoutingPaths.HOME}
                                    underline="hover"
                                    color="inherit"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <HomeIcon sx={{ mr: 0.5, fontSize: '24px' }} fontSize="inherit" />
                                </MuiLink>
                                {
                                    path && <Typography variant='h3' color='primary'>{path.text}</Typography>
                                }
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