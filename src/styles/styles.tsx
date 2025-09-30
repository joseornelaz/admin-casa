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