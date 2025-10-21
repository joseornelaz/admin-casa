import { Box, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { GrupoFormSchema, type GrupoFormData } from "../../../../schemas/grupoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import Button from "../../../atoms/Button/Button";
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

export const GrupoEditForm: React.FC = () => {
    const theme = useTheme();
    
    const materias = [{ id: 0, nombre: 'Todas'}, { id: 1, nombre: 'Pendientes de calificar'}, { id: 2, nombre: 'Calificados'}];
    const { control, formState: { errors } } = useForm<GrupoFormData>({
            resolver: zodResolver(
                GrupoFormSchema(
                    (materias?.map((m) => m.id)) ?? [],
                )
            ),
            defaultValues: {
                nombre: '',
                planEstudio: 0,
                rutaEstudio: 0,
                tutor: '',
                correoTutor: '',
                administrador: '',
                fechaRegistro: '',
                fechaModificacion: '',
                descripcion: '',
            },
    });

    return(
        <BoxContainer sxProps={{ backgroundColor: theme.palette.primary[50]  }}>
            <FormControl>
                <FormGroup sx={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
                    <FormControlLabel control={ <Switch name="Activo" /> } label="Activo" />
                    <FormControlLabel control={ <Switch name="Habilitado" /> } label="Habilitado" />
                    <FormControlLabel control={ <Switch name="Normal" /> } label="Normal" />
                </FormGroup>
            </FormControl>
            <Box sx={{mt: 2}}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Nombre del Grupo" 
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <Controller
                                name="planEstudio"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.planEstudio} size="small">
                                        <InputLabel id="grupo-label">Plan de Estudios</InputLabel>
                                        <Select
                                            labelId="grupo-label"
                                            label="Plan de Estudios"
                                            {...field}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                field.onChange(value);
                                            }}
                                        >
                                            {
                                                materias && materias.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.nombre}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12}}>
                            <Controller
                                name="rutaEstudio"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.rutaEstudio} size="small">
                                        <InputLabel id="grupo-label">Ruta de Estudios</InputLabel>
                                        <Select
                                            labelId="grupo-label"
                                            label="Ruta de Estudios"
                                            {...field}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                field.onChange(value);
                                            }}
                                        >
                                            {
                                                materias && materias.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.nombre}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Tutor" 
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Correo del Tutor" 
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12}}>
                            <Controller
                                name="administrador"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.administrador} size="small">
                                        <InputLabel id="grupo-label">Administrador</InputLabel>
                                        <Select
                                            labelId="grupo-label"
                                            label="Administrador"
                                            {...field}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                field.onChange(value);
                                            }}
                                        >
                                            {
                                                materias && materias.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.nombre}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Fecha de registro" 
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Fecha de modificación" 
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Descripción del grupo" 
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box display={'flex'} justifyContent={'flex-end'}>
                    <Button
                        icon={<NoteAltOutlinedIcon />}
                        iconPosition="start"
                        onClick={() => {}}
                        disabled={true}
                    >Editar</Button>
                </Box>
            </Box>
        </BoxContainer>
    );
}