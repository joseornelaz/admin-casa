import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#30394a',
      50: '#f6f7f9',
      100: '#eff0f6',
      200: '#e2e7f0',
      300: '#d3d9e4',
      400: '#bec6d5',
      500: '#7b8697',
      600: '#4b5e7e',
      700: '#3d4c67',
      800: '#364257',
      900: '#30394a',
      // 950: '#202531',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: "#E02B1D"
    },
    warning: {
      main: "#D9A514"
    },
    success: {
      main: "#1F7B5C"
    },
    disabled: {
      main: "#7B8186"
    },
    grey: {
      50: '#E6EFFC',
      100: '#7B8186',
      200: '#758FA8',
      300: '#AAB1B6',
      500: '#231F20',
      600: '#5B6172'
    },
    text: {
      primary: '#231F20',
    },
    white: {
      main: '#ffffff',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '40px',
      lineHeight: '32px',
    },
    h2: {
      fontWeight: 700,
      fontSize: '32px',
      lineHeight: '28px',
    },
    h3: {
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: '24px',
    },
    h4: {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '20px',
    },
    h5: {
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '16px'
    },
    h6: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '14px'
    },
    body1: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '14px',
    },
    body2: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '12px',
    },
    body3: {
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '24px'
    },
    button:{
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '14px'
    },
    caption: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px'
    },
    overline: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px'
    },
    code: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '16px'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.primary[100],
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          backgroundColor: '#EFF0F6',
          borderColor: '#D3D9E4',
          '&:hover': {
            backgroundColor: '#E5E7F0', // Un tono más oscuro para el hover
            borderColor: '#C5CCDA',
          },
        },
        root: {
          textTransform: 'none',
          height: '40px'
        },
        containedWarning: {
          color: '#fff'
        }
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: '40px'
        },
      }
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: '4px',
          marginBottom: theme.spacing(2),
          '&:before': {
            display: 'none',
          },
          boxShadow: 'none',
          '&.Mui-expanded': {
            margin: theme.spacing(2, 0),
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(0,0,0,0.06)',
            opacity: 1,
            boxShadow: 'none',
          },
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 1,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        size: 'medium',
        autoComplete: 'new-password',
      },
      styleOverrides: {
        root: ({theme}) => ({
          marginBottom: '1rem',
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            height: '40px',
          },
          '& .MuiInputBase-input': {
            height: '40px',
            padding: '0 14px',
            boxSizing: 'border-box',
          },
          '& .MuiInputLabel-root': {
            transform: 'translate(14px, 10px) scale(1)',
            '&.Mui-focused': {
              transform: 'translate(14px, -9px) scale(0.75)',
            },
            '&.MuiFormLabel-filled': {
              transform: 'translate(14px, -9px) scale(0.75)',
            },
          },
          '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: theme.palette.primary.light,
          },
          '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: theme.palette.text.secondary,
          },
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({theme}) => ({
          marginTop: '16px',
          marginBottom: '16px',
          '&::before, &::after': {
            borderColor: theme.palette.primary.main,
          }
        })
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-around',
        },
        flexContainer: {
          justifyContent: 'space-around',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({theme}) => ({
          textTransform: 'none',
          minWidth: 0,
          flex: 1,
          color: '#C0C0C0',
          '&.Mui-selected': {
            color: theme.palette.primary.main, 
          },
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px'
        }),
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;