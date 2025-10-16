import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { InputLabelRequired } from "../../../molecules/InputLabelRequired/InputLabelRequired";

export const NotasObservacionesForm: React.FC = () => {

    const { control, formState: { errors } } = useFormContext();

    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                    name={`elegible`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabelRequired text='Elegible' />
                            <Select {...field} label="Elegible">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                    name={`interesado`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabelRequired text='Interesado' />
                            <Select {...field} label="Interesado">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                    name={`campana`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabelRequired text='Campaña' />
                            <Select {...field} label="Campaña">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <Controller
                    name={`usuarioResponsable`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error} size="small">
                            <InputLabelRequired text='Usuario responsable A1' />
                            <Select {...field} label="Usuario responsable A1">
                                <MenuItem value="H">Hombre</MenuItem>
                                <MenuItem value="M">Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <Controller
                    name="comentarios"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="comentarios"
                            label="Comentarios"
                            multiline
                            rows={5}
                            error={!!errors.comentarios}
                            helperText={typeof errors.comentarios?.message === "string" ? errors.comentarios.message : undefined}
                        />
                    )}
                />
            </Grid>
            
        </Grid>
    );
}