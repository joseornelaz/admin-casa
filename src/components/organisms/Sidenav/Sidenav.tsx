import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { MenuRoutes as MenuItems } from '@constants';
import DsSvgIcon from '../../atoms/Icon/Icon';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material';
import { TopBar } from '../TopBar/TopBar';
import LogoGRG from '@assets/grg-logos/grg-logo-white.png';

const drawerWidth = 280;

const Sidenav: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(-1);
    const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
    const [pathSelected, setPathSelected] = React.useState<any>(null);
    
    const menuRoutes = React.useMemo(
        () => [...MenuItems].filter((item) => item.menu === "main").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
        []
    );

    const menuWithIndices = React.useMemo(() => {
        let globalIndex = 0;
        return menuRoutes.filter((item) => item.visible === 1).map((item) => {
            const hasChildren = item.children.filter((item) => item.visible === 1).length > 0;
            
            if (hasChildren) {
                return {
                    ...item,
                    index: undefined,
                    children: item.children.filter((item) => item.visible === 1).map((child) => ({
                        ...child,
                        index: globalIndex++
                    }))
                };
            } else {
                return {
                    ...item,
                    index: globalIndex++,
                    children: []
                };
            }
        });
    }, [menuRoutes]);

    React.useEffect(() => {
        let foundIndex: number | undefined = undefined;
        
        menuWithIndices.forEach((item) => {
            if (item.children.length > 0) {
                const child = item.children.find(c => c.path === location.pathname);
                if (child && child.index !== undefined) {
                    foundIndex = child.index;
                    setOpenSubmenu(item.text);
                    setPathSelected(child);
                }
            } else if (item.path === location.pathname && item.index !== undefined) {
                foundIndex = item.index;
                setPathSelected(item);
            }
        });
        
        if (foundIndex !== undefined) {
            setSelectedIndex(foundIndex);
        }
    }, [location.pathname, menuWithIndices]);

    const handleNavigation = (item: any, index: number | undefined) => {
      navigate(item.path);
      setSelectedIndex(index);
      setPathSelected(item);
    };

    const handleToggleSubmenu = (label: string) => {
      setOpenSubmenu((prev) => (prev === label ? null : label));
    };

    const handleHome = () => {
        setPathSelected(null);
        setSelectedIndex(-1);
        setOpenSubmenu(null);
    }

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'rgb(15, 17, 21)' }}>
      <CssBaseline />
      
      {/* DRAWER LATERAL (FIJO) */}
      <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                position: 'relative',
                height: '100vh',
                border: 'none',
                backgroundColor: 'rgb(15, 17, 21)',
                boxShadow: 'none',
                overflowY: 'auto',
                overflowX: 'hidden',
                color: '#FFF',
            },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ pt: 4, pb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Box component="img" src={LogoGRG} alt="Logo GRG" />
            </Box>
        </Toolbar>
        
        <List>
          {
            menuWithIndices.map((item) => {
                const hasChildren = item.children.length > 0;
                const isOpen = openSubmenu === item.text;

                return (
                    <React.Fragment key={item.text}>
                        <ListItem disablePadding>
                            <Box 
                                sx={{  
                                    width: '100%', 
                                    borderRadius: '4px', 
                                    ml: '5px', 
                                    backgroundColor: selectedIndex === item.index ? '#F6F7F9' : 'transparent',
                                                borderLeft: selectedIndex === item.index ? `3px solid #B82338` : '3px solid transparent', 
                                    display: 'flex',
                                    height: '50px',
                                }}
                            >
                                <ListItemButton
                                    onClick={() => hasChildren ? handleToggleSubmenu(item.text) : handleNavigation(item, item.index)}
                                    sx={{ borderRadius: '8px', gap: '8px' }}
                                >
                                    <ListItemIcon sx={{ minWidth: '0px'}}>
                                        {item.icon && <DsSvgIcon component={item.icon} color={selectedIndex !== item.index ? 'white' : 'primary' } />}
                                    </ListItemIcon>
                                    <Typography 
                                        variant='body1'
                                        sx={{ 
                                            color: selectedIndex === item.index ? '#000' : '#FFF',
                                            fontWeight: 'bold'
                                        }}
                                    >{item.text}</Typography>
                                </ListItemButton>
                            </Box>
                            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        {hasChildren && (
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.children.map((child) => (
                                        <Box 
                                            sx={{  
                                                width: '100%', 
                                                borderRadius: '4px', 
                                                ml: '5px', 
                                                backgroundColor: selectedIndex === child.index ? '#F6F7F9' : 'transparent',
                                                borderLeft: selectedIndex === child.index ? `3px solid #B82338` : '3px solid transparent', 
                                                display: 'flex',
                                                height: '50px',
                                            }}
                                            key={child.text}
                                        >
                                            <ListItemButton
                                                onClick={() => handleNavigation(child, child.index)}
                                                sx={{
                                                    pl: 5,
                                                    justifyContent: 'initial',
                                                }}
                                            >
                                                <Typography variant='body1' 
                                                    sx={{ 
                                                        color: selectedIndex === child.index ? '#000' : '#FFF',
                                                        fontWeight: selectedIndex === child.index ? 'bold' : 'normal'
                                                    }}
                                                >{child.text}</Typography>
                                            </ListItemButton>
                                        </Box>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                )
            })
          }
        </List>
      </Drawer>

      {/* ÁREA DE CONTENIDO PRINCIPAL (SCROLL INDEPENDIENTE) */}
      <Box
        component="main"
        sx={{ 
            flexGrow: 1, 
            p: 1, 
            height: '100vh', 
            overflowY: 'auto' // <-- Esto soluciona que el Sidenav se corte al expandir contenido
        }}
      >
        <Box
            sx={{ 
                border: '1px solid #D3D9E4', 
                minHeight: 'calc(100vh - 16px)',
                borderRadius: '16px',
                backgroundColor: theme.palette.primary[50],
            }}
        >
            <TopBar path={pathSelected} isHome={handleHome}/>
            <Box sx={{ p: 4 }}>
                <Outlet />
            </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidenav;