import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouting as router } from './AppRouting';
import './index.css';

import { QueryProvider } from './providers/QueryProvider';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';

import theme from './themes/theme';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryProvider>
    {/* <Box sx={{ height: '100%' }}>
        <QueryProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <NotificationProvider>
                <RouterProvider router={router} />
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </Box> */}
  </StrictMode>,
)
