import { Divider, Switch, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { BorderRadius, flexColumn, flexRows, StateColors } from "@styles";
import Button from "../../../atoms/Button/Button";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const DatosContactoForm: React.FC = () => {
    const theme = useTheme();
    return(
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        label="Calle"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        label="Número"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        label="Colonia"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Delegación/Municipio"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Código Postal"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                    <TextField
                        label="Correo Electrónico"
                    />
                </Grid>
            </Grid>
            <Box sx={{...flexColumn, alignItems: 'flex-start', width: '100%'}}>
                <Typography variant="h6" color="primary" sx={{mb: '12px'}}>Redes Sociales</Typography>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    <Grid size={{ xs: 12, md: 9 }}>
                        <TextField
                            label="Link"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            label="Correo Electrónico"
                        />
                    </Grid>
                </Grid>
                <Button
                    variant="text"
                    onClick={() => {}}
                    icon={<AddOutlinedIcon />}
                    iconPosition="start"
                    sxProps={{ color: StateColors.idleForeground}}
                >Añadir Red Social</Button>
            </Box>
            <Box sx={{...flexColumn, alignItems: 'flex-start', width: '100%', mt: 2}}>
                <Typography variant="h6" color="primary" sx={{mb: '12px'}}>Teléfonos</Typography>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    <Grid size={{ xs: 12, md: 9 }}>
                        <TextField
                            label="Teléfono"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            label="Correo Electrónico"
                        />
                    </Grid>
                </Grid>
                <Button
                    variant="text"
                    onClick={() => {}}
                    icon={<AddOutlinedIcon />}
                    iconPosition="start"
                    sxProps={{ color: StateColors.idleForeground}}
                >Añadir teléfono</Button>
            </Box>
            <Divider />
            <Box sx={{...flexColumn, alignItems: 'flex-start', width: '100%'}}>
                <Typography variant="h6" color="primary" sx={{mb: '12px'}}>Horario de Contacto para llamadas</Typography>
                <Box sx={{...flexRows, gap: 2, width: '100%', justifyContent: 'flex-start'}}>
                    <Box
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            width: '211px',
                            gap: '4px',
                            padding: '8px 16px',
                            border: `1px solid ${theme.palette.primary[200]}`,
                            borderRadius: BorderRadius.sm
                        }}
                    >
                        <Typography variant="button">8:00am - 12:00pm</Typography>
                        <Switch name="Activo" />
                    </Box>
                    <Box
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            width: '211px',
                            gap: '4px',
                            padding: '8px 16px',
                            border: `1px solid ${theme.palette.primary[200]}`,
                            borderRadius: BorderRadius.sm
                        }}
                    >
                        <Typography variant="button">12:00pm - 7:00pm</Typography>
                        <Switch name="Activo" />
                    </Box>
                    <Box
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            width: '211px',
                            gap: '4px',
                            padding: '8px 16px',
                            border: `1px solid ${theme.palette.primary[200]}`,
                            borderRadius: BorderRadius.sm
                        }}
                    >
                        <Typography variant="button">7:00pm - 9:00pm</Typography>
                        <Switch name="Activo" />
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box sx={{...flexColumn, alignItems: 'flex-start', width: '100%'}}>
                <Typography variant="h6" color="primary" sx={{mb: '12px'}}>Acceso a internet</Typography>
                <Box sx={{...flexRows, gap: 2, width: '100%', justifyContent: 'flex-start'}}>
                    <Box
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            width: '265px',
                            gap: '4px',
                            padding: '8px 16px',
                            border: `1px solid ${theme.palette.primary[200]}`,
                            borderRadius: BorderRadius.sm
                        }}
                    >
                        <Typography variant="button">Internet en celular (Datos)</Typography>
                        <Switch name="Activo" />
                    </Box>
                    <Box
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            width: '265px',
                            gap: '4px',
                            padding: '8px 16px',
                            border: `1px solid ${theme.palette.primary[200]}`,
                            borderRadius: BorderRadius.sm
                        }}
                    >
                        <Typography variant="button">Internet en casa (Ethernet)</Typography>
                        <Switch name="Activo" />
                    </Box>
                    <Box
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            width: '265px',
                            gap: '4px',
                            padding: '8px 16px',
                            border: `1px solid ${theme.palette.primary[200]}`,
                            borderRadius: BorderRadius.sm
                        }}
                    >
                        <Typography variant="button">Internet en general</Typography>
                        <Switch name="Activo" />
                    </Box>
                </Box>
            </Box>
        </>
    );
}