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

export const StateColors = { 
    idleForeground: '#067ad8',
    idleBackground: '#e5f3fe',
    backlogForeground: '#e68f38',
    backlogBackground: '#ffefe6',
    enabledForeground: '#009327',
    enabledBackground: '#e1fae8',
    disabledForeground: '#bf284d',
    disabledBackground: '#fdeef1',
}

export const BorderRadius = {
    sm: '4px', 
    md: '8px', 
    lg: '16px', 
    full: '9999px'
}

export const Paddings = {
    xs: '4px', 
    s: '8px', 
    m: '16px', 
    l: '24px',
    xl: '32px',
    xxl: '64px',
    xxxl: '96px',
}