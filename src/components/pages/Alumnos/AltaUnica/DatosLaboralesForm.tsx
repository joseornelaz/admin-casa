import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Controller, useFormContext } from "react-hook-form";

export const DatosLaboralesForm: React.FC = () => {

    const { control } = useFormContext();

    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                        name={`corporacion`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error} size="small">
                                <InputLabel>Corporación</InputLabel>
                                <Select {...field} label="Corporación">
                                    <MenuItem value="H">Hombre</MenuItem>
                                    <MenuItem value="M">Mujer</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                        name={`asociacion`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error} size="small">
                                <InputLabel>Asociación</InputLabel>
                                <Select {...field} label="Asociación">
                                    <MenuItem value="H">Hombre</MenuItem>
                                    <MenuItem value="M">Mujer</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                    name={`empresa`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabel>Empresa</InputLabel>
                            <Select {...field} label="Empresa">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <Controller
                    name={`programaAcademico`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabel>Programa Académico</InputLabel>
                            <Select {...field} label="Programa Académico">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={`rutaEstudios`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabel>Ruta de Estudios</InputLabel>
                            <Select {...field} label="Ruta de Estudios">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={`tipoUsuario`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabel>Tipo de usuario</InputLabel>
                            <Select {...field} label="Tipo de usuario">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={`estado`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabel>Estado</InputLabel>
                            <Select {...field} label="Estado">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={`ciudad`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabel>Ciudad</InputLabel>
                            <Select {...field} label="Ciudad">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
                <Controller
                    name={`centro`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabel>Centro</InputLabel>
                            <Select {...field} label="Centro">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <Controller
                    name={`region`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabel>Región</InputLabel>
                            <Select {...field} label="Región">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <Controller
                    name={`puesto`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabel>Puesto</InputLabel>
                            <Select {...field} label="Puesto">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    );
}