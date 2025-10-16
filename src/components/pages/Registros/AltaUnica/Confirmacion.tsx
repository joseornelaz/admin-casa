import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { StateColors } from "@styles"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Typography } from "../../../atoms/Typography/Typography";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export const Confirmacion: React.FC = () => {
    return(
        <Card
            variant="outlined"
            sx={{ border: 2, borderColor: StateColors.enabledForeground, mb: 2, p:3 }}
        >
            <CardContent>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mb: 3}}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '11px'}}>
                            <CheckCircleOutlineOutlinedIcon sx={{ color: StateColors.enabledForeground }} />
                            <Typography component="span" variant="button" sxProps={{color: StateColors.enabledForeground}}>Registro guardado</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '11px'}}>
                            <TagsContainer text="NUEVO" status="normal" />
                            <TagsContainer text="ID REGISTRO: 00112233" status="transparent" />
                        </Box>
                    </Box>
                    <Typography component="span" variant="body1" sxProps={{color: StateColors.enabledForeground}}>
                        El registro se completó y hemos enviado un correo de confirmación.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                                <Typography component="span" variant="body2">Nombre completo</Typography>
                                <Typography component="span" variant="body1">Cruz Alonso Siqueiros</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                                <Typography component="span" variant="body2"># de empleado</Typography>
                                <Typography component="span" variant="body1">00112234</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ md: 12, xs: 12 }}>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                                <Typography component="span" variant="body2">Fecha de registro</Typography>
                                <Typography component="span" variant="body1">22 de Septiembre del 2025</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ md: 12, xs: 12 }}>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                                <Typography component="span" variant="body2">Programa Educativo asignado</Typography>
                                <Typography component="span" variant="body1">Licenciatura Coppel 2020</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box display={'flex'} gap={2}>
                    <Button variant="contained">Ir al inicio</Button>
                    <Button variant="outlined">Registrar nueva persona</Button>
                </Box>
            </CardContent>
        </Card>
    )
}