import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Switch, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { BorderRadius, flexColumn, flexRows, StateColors } from "@styles";
import Button from "../../../atoms/Button/Button";

import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export const DatosContactoForm: React.FC = () => {
    const theme = useTheme();

    const { control, register, formState: { errors } } = useFormContext();

    // useFieldArray para redes sociales
    const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
        control,
        name: 'socialMedia',
    });

    // useFieldArray para teléfonos
    const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
        control,
        name: 'phones',
    });

    return(
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="calle"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="calle"
                                label="Calle"
                                placeholder="Escribe la calle"
                                error={!!errors.calle}
                                helperText={typeof errors.calle?.message === "string" ? errors.calle.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="numero"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="numero"
                                label="Número"
                                placeholder="Escribe la número"
                                error={!!errors.numero}
                                helperText={typeof errors.numero?.message === "string" ? errors.numero.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="colonia"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="colonia"
                                label="Colonia"
                                placeholder="Escribe la Colonia"
                                error={!!errors.colonia}
                                helperText={typeof errors.colonia?.message === "string" ? errors.colonia.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="municipio"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="municipio"
                                label="Delegación/Municipio"
                                placeholder="Escribe la Delegación/Municipio"
                                error={!!errors.municipio}
                                helperText={typeof errors.municipio?.message === "string" ? errors.municipio.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="codigoPostal"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="codigoPostal"
                                label="Código Postal"
                                placeholder="Escribe el Código Postal"
                                error={!!errors.codigoPostal}
                                helperText={typeof errors.codigoPostal?.message === "string" ? errors.codigoPostal.message : undefined}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Controller
                        name="correoElectronicoContacto"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="correoElectronicoContacto"
                                label="Correo Electrónico"
                                placeholder="Escribe el Correo Electrónico"
                                error={!!errors.correoElectronicoContacto}
                                helperText={typeof errors.correoElectronicoContacto?.message === "string" ? errors.correoElectronicoContacto.message : undefined}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Box sx={{...flexColumn, alignItems: 'flex-start', width: '100%'}}>
                <Typography variant="h6" color="primary" sx={{mb: '12px'}}>Redes Sociales</Typography>
                {
                socialFields.map((field, index) => (
                    <Grid key={field.id} container spacing={2} sx={{ width: '100%' }}>
                        <Grid size={{ xs: 12, md: 9 }}>
                            <Controller
                                name={`socialMedia.${index}.link`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Link"
                                        placeholder="https://..."
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Box sx={{...flexRows, alignItems: 'center', gap: 1}}>
                                <Controller
                                    name={`socialMedia.${index}.platform`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <FormControl fullWidth error={!!fieldState.error} size="small">
                                        <InputLabel>Red social</InputLabel>
                                            <Select {...field} label="Red social">
                                                <MenuItem value="Facebook">Facebook</MenuItem>
                                                <MenuItem value="Instagram">Instagram</MenuItem>
                                                <MenuItem value="Twitter">Twitter</MenuItem>
                                                <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                                <MenuItem value="TikTok">TikTok</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                                <IconButton 
                                    onClick={() => removeSocial(index)}
                                    disabled={socialFields.length === 1}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
                <Button
                    variant="text"
                    onClick={() => appendSocial({ link: '', platform: '' })}
                    icon={<AddOutlinedIcon />}
                    iconPosition="start"
                    sxProps={{ color: StateColors.idleForeground}}
                >Añadir Red Social</Button>
            </Box>
            <Box sx={{...flexColumn, alignItems: 'flex-start', width: '100%', mt: 2}}>
                <Typography variant="h6" color="primary" sx={{mb: '12px'}}>Teléfonos</Typography>
                {
                    phoneFields.map((field, index) => (
                        <Grid key={field.id} container spacing={2} sx={{ width: '100%' }}>
                            <Grid size={{ xs: 12, md: 9 }}>
                                <Controller
                                    name={`phones.${index}.number`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Número"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <Box sx={{...flexRows, alignItems: 'center', gap: 1}}>
                                    <Controller
                                        name={`phones.${index}.type`}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <FormControl fullWidth error={!!fieldState.error} size="small">
                                            <InputLabel>Tipo</InputLabel>
                                            <Select {...field} label="Tipo">
                                                <MenuItem value="Móvil">Móvil</MenuItem>
                                                <MenuItem value="Casa">Casa</MenuItem>
                                                <MenuItem value="Trabajo">Trabajo</MenuItem>
                                            </Select>
                                            </FormControl>
                                        )}
                                    />
                                        
                                    <IconButton 
                                        onClick={() => removePhone(index)}
                                        disabled={phoneFields.length === 1}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                ))}
                
                <Button
                    variant="text"
                    onClick={() => appendPhone({ number: '', type: 'Móvil' })}
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