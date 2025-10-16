import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { StateColors } from "@styles";

export const DatosPersonalesForm: React.FC = () => {

    const { control, register, formState: { errors } } = useFormContext();

    const labelRequired = (text: string) => <>{text} <span style={{ color: StateColors.disabledForeground }}>*</span></>;

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Controller
                        name="numeroEmpleado"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <TextField
                                    {...field}
                                    id="numeroEmpleado"
                                    label={labelRequired('Numero de Empleado')}
                                    placeholder="0000000"
                                    error={!!errors.numeroEmpleado}
                                    helperText={typeof errors.numeroEmpleado?.message === "string" ? errors.numeroEmpleado.message : undefined}
                                />
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="nombre"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="nombre"
                                label={labelRequired('Nombre')}
                                placeholder="Nombre del estudiante"
                                error={!!errors.nombre}
                                helperText={typeof errors.nombre?.message === "string" ? errors.nombre.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="apellidoPaterno"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="apellidoPaterno"
                                label={labelRequired('Apellido Paterno')}
                                placeholder="Apellido Paterno"
                                error={!!errors.apellidoPaterno}
                                helperText={typeof errors.apellidoPaterno?.message === "string" ? errors.apellidoPaterno.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="apellidoMaterno"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="apellidoMaterno"
                                label={labelRequired('Apellido Materno')}
                                placeholder="Apellido Materno"
                                error={!!errors.apellidoMaterno}
                                helperText={typeof errors.apellidoMaterno?.message === "string" ? errors.apellidoMaterno.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="fechaNacimiento"
                        control={control}
                        render={({ field, fieldState }) => (
                            <DatePicker
                                label={labelRequired('Fecha de nacimiento')}
                                value={field.value}
                                onChange={(date) => field.onChange(date)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        error: !!fieldState.error,
                                        helperText: fieldState.error?.message,
                                        InputProps: {
                                            sx: {
                                                height: 40,
                                                padding: "8px 12px",
                                            },
                                        },
                                        InputLabelProps: {
                                            sx: {
                                                top: '-5px',
                                                '&.MuiInputLabel-shrink': {
                                                    top: 0,
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="edad"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="edad"
                                label={labelRequired('Edad')}
                                placeholder="Edad"
                                error={!!errors.edad}
                                helperText={typeof errors.edad?.message === "string" ? errors.edad.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name={`sexo`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error} size="small">
                                <InputLabel>Sexo</InputLabel>
                                <Select {...field} label="Sexo">
                                    <MenuItem value="H">Hombre</MenuItem>
                                    <MenuItem value="M">Mujer</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name={`estadoCivil`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error} size="small">
                                <InputLabel>Estado Civil</InputLabel>
                                <Select {...field} label="Estado Civil">
                                    <MenuItem value="Soltero(a)">Soltero(a)</MenuItem>
                                    <MenuItem value="Casado(a)">Casado(a)</MenuItem>
                                    <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
                                    <MenuItem value="Viudo(a)">Viudo(a)</MenuItem>
                                    <MenuItem value="Unión Libre">Unión Libre</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="curp"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="curp"
                                label="Curp"
                                placeholder="Curp"
                                error={!!errors.curp}
                                helperText={typeof errors.curp?.message === "string" ? errors.curp.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name={`escolaridad`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error} size="small">
                                <InputLabel>Escolaridad</InputLabel>
                                <Select {...field} label="Escolaridad">
                                    <MenuItem value="Primaria">Primaria</MenuItem>
                                    <MenuItem value="Secundaria">Secundaria</MenuItem>
                                    <MenuItem value="Preparatoria">Preparatoria</MenuItem>
                                    <MenuItem value="Licenciatura">Licenciatura</MenuItem>
                                    <MenuItem value="Posgrado">Posgrado</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}