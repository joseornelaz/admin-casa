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

import { Outlet, useNavigate } from 'react-router-dom';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { MenuRoutes as MenuItems } from '@constants';
import DsSvgIcon from '../../atoms/Icon/Icon';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material';
import { TopBar } from '../TopBar/TopBar';

const drawerWidth = 280;

const Sidenav: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(0);
    const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
    
    const menuRoutes = React.useMemo(
        () => [...MenuItems].filter((item) => item.menu === "main").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
        []
    );

    // Calcula los índices una sola vez y los mantiene estables
    const menuWithIndices = React.useMemo(() => {
        let globalIndex = 0;
        return menuRoutes.filter((item) => item.visible === 1).map((item) => ({
            ...item,
            index: globalIndex++,
            children: item.children.map((child) => ({
                ...child,
                index: globalIndex++
            }))
        }));
    }, [menuRoutes]);

    const handleNavigation = (path: string, index: number) => {
      navigate(path);
      setSelectedIndex(index);
    };

    const handleToggleSubmenu = (label: string) => {
      setOpenSubmenu((prev) => (prev === label ? null : label));
    };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#EFF0F6' }}>
      <CssBaseline />
      <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                position: 'relative',
                height: '100%',
                border: 'none',
                backgroundColor: '#EFF0F6',
                boxShadow: 'none'
            },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{pt: 2, pb: 2 }}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h4' sx={{ color: theme.palette.primary[600] }}>Academia Global</Typography>
                <Typography variant='h3' sx={{ color: theme.palette.primary[700] }}>C A S A</Typography>
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
                                    borderLeft: selectedIndex === item.index ? '3px solid #30394A' : '3px solid transparent', 
                                }}
                            >
                                <ListItemButton
                                    onClick={() => hasChildren ? handleToggleSubmenu(item.text) : handleNavigation(item.path, item.index)}
                                    sx={{ borderRadius: '8px', gap: '8px' }}
                                >
                                    <ListItemIcon sx={{ minWidth: '0px'}}>
                                        <DsSvgIcon component={item.icon}  />
                                    </ListItemIcon>
                                    <Typography variant='body2' sx={{ color: theme.palette.primary[600]}}>{item.text}</Typography>
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
                                                borderLeft: selectedIndex === child.index ? '3px solid #30394A' : '3px solid transparent', 
                                            }}
                                            key={child.text}
                                        >
                                            <ListItemButton
                                                onClick={() => handleNavigation(child.path, child.index)}
                                                sx={{
                                                    pl: 5,
                                                    justifyContent: 'initial',
                                                }}
                                            >
                                                <Typography variant='body2' sx={{ color: theme.palette.primary[600]}}>{child.text}</Typography>
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
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, height: '100vh' }}
      >
        
        <Box
            sx={{ 
                border: '1px solid #D3D9E4', 
                height: 'calc(100vh - 16px)',
                borderRadius: '16px',
                backgroundColor: '#fff',
            }}
        >
            <TopBar />
            <Box
                sx={{p: 4}}
            >
                <Outlet />
            </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidenav;