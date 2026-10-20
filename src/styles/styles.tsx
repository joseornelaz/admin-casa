import theme from "../themes/theme";

export const flexRows = { display: "flex", alignItems: "center", justifyContent: "center" };
export const flexColumn = { display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" };
export const accordionStyle = { backgroundColor: "#F8F8F9", boxShadow: "0px 2px 4px 0px #6BBBE44D", border: "1px solid #eceaea0d" };
export const innerHTMLStyle = {
    '& h1, h2': {
        font: theme.typography.h4
    },
    '& h1, h2, h3': {
        color: 'primary.main',
    },
    '& p': {
        marginBottom: '1rem',
        lineHeight: 1.6,
        color: 'text.primary'
    },
    '& ul': {
        paddingLeft: '1.5rem',
        listStyleType: 'disc',
    },
    '& a': {
        color: theme.palette.primary.main,
        fontWeight: 600,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    pl: 3, pr: 3
};

export const textFieldDisabled = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 0,
      },
      '&:hover fieldset': {
        border: 0,
      },
      '&.Mui-focused fieldset': {
        border: 0,
      },
      '& .MuiInputBase-input.Mui-disabled': {
        WebkitTextFillColor: theme.palette.primary[600], // Para navegadores webkit (Chrome, Safari)
        color: theme.palette.primary[600], // Para otros navegadores
      },
    },
}

export const textFieldLabelDisabled = {
    inputLabel: {
        sx: {
            '&.Mui-disabled': {
                color: theme.palette.primary[600], // Disabled (gris claro)
            },
            
        }
    }
}

export const selectDisabled = {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
    '& .MuiSelect-icon': {
      display: 'none', // Oculta la flecha
    },
    '& .MuiInputBase-input.Mui-disabled': {
        WebkitTextFillColor: theme.palette.primary[600], // Para navegadores webkit (Chrome, Safari)
        color: theme.palette.primary[600], // Para otros navegadores
    },
}

export const InputLabelDisabled = {
    color: theme.palette.primary[600], // Color cuando está deshabilitado
}

export const StateColors = { 
    idleForeground: '#067ad8',
    idleBackground: '#e5f3fe',
    backlogForeground: '#e68f38',
    backlogBackground: '#ffefe6',
    enabledForeground: '#009327',
    enabledBackground: '#e1fae8',
    disabledForeground: '#bf284d',
    disabledBackground: '#fdeef1',
};

export const BorderRadius = {
    sm: '4px', 
    md: '8px', 
    lg: '16px', 
    full: '9999px'
};

export const Paddings = {
    xs: '4px', 
    s: '8px', 
    m: '16px', 
    l: '24px',
    xl: '32px',
    xxl: '64px',
    xxxl: '96px',
};


export const fieldSx = {
  marginBottom: 0,
  "& .MuiOutlinedInput-root": {
    height: 46,
    borderRadius: "10px",
    backgroundColor: "#FAFAFA",
    fontSize: "0.9rem",
    "& fieldset": {
      borderColor: "#E5E7EB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.82rem",
    color: "#6B7280",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2563EB",
  },
} as const;

export const secondaryButtonSx = {
  flex: 1,
  height: 44,
  borderRadius: "10px",
  borderColor: "#E5E7EB",
  backgroundColor: "#FFFFFF",
  color: "#374151",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  "&:hover": {
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
  },
} as const;

export const primaryButtonSx = {
  flex: 1,
  height: 44,
  borderRadius: "10px",
  backgroundColor: "#111827",
  color: "#FFFFFF",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  "&:hover": {
    backgroundColor: "#1F2937",
  },
  "&.Mui-disabled": {
    backgroundColor: "#F1F2F4",
    color: "#FFFFFF",
  },
} as const;

export const createButtonSx = {
  ...primaryButtonSx,
  backgroundColor: "#16A34A",
  "&:hover": {
    backgroundColor: "#15803D",
  },
} as const;