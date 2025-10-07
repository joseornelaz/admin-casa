import Box from "@mui/material/Box";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import IconButton from "@mui/material/IconButton";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { PageHeader } from "../../../molecules/PageHeader/PageHeader";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextField from "@mui/material/TextField";
import { InputLabelDisabled, selectDisabled, textFieldDisabled, textFieldLabelDisabled } from "@styles";
import React from "react";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { GrupoFormSchema, type GrupoFormData } from "../../../../schemas/grupoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { GrupoEstado } from "./GrupoEstado";
import { GrupoTablaEstudiantes } from "./GrupoTablaEstudiantes";

type GrupoEditProps = {
    closeDrawer?: () => void;
}

export const GrupoEdit: React.FC<GrupoEditProps> = ({closeDrawer}) => {

    const [isEdit, setIsDisabled] = React.useState<boolean>(false);

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

    const handleClose = () => {
        if(closeDrawer) closeDrawer();
    }

    const handleEdit = () => {
        setIsDisabled(!isEdit);
    }

    return(
        <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <TagsContainer text="GRUPO-0001" status="default" />
                <IconButton onClick={handleClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>
            <BoxContainer>
                <PageHeader 
                    title="Información General" 
                    icon={InfoOutlinedIcon}
                    buttonText="Editar"
                    onButtonClick={handleEdit}
                    buttonVariant="outlined"
                    buttonIcon={<NoteAltOutlinedIcon />}
                />
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
                                    disabled={!isEdit}
                                    sx={ !isEdit ? {...textFieldDisabled} : undefined} 
                                    slotProps={!isEdit ? {...textFieldLabelDisabled} : undefined}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6}}>
                                <Controller
                                    name="planEstudio"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth error={!!errors.planEstudio}>
                                            <InputLabel 
                                                id="grupo-label" 
                                                sx={!isEdit ? {...InputLabelDisabled} : undefined}
                                            >Plan de Estudios</InputLabel>
                                            <Select
                                                disabled={!isEdit}
                                                labelId="grupo-label"
                                                label="Plan de Estudios"
                                                {...field}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    field.onChange(value);
                                                }}
                                                sx={ !isEdit ? {...selectDisabled} : undefined}
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
                                        <FormControl fullWidth error={!!errors.rutaEstudio}>
                                            <InputLabel 
                                                id="grupo-label" 
                                                sx={!isEdit ? {...InputLabelDisabled} : undefined}
                                            >Ruta de Estudios</InputLabel>
                                            <Select
                                                disabled={!isEdit}
                                                labelId="grupo-label"
                                                label="Ruta de Estudios"
                                                {...field}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    field.onChange(value);
                                                }}
                                                sx={ !isEdit ? {...selectDisabled} : undefined}
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
                                    disabled={!isEdit}
                                    sx={ !isEdit ? {...textFieldDisabled} : undefined} 
                                    slotProps={!isEdit ? {...textFieldLabelDisabled} : undefined}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6}}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Correo del Tutor" 
                                    variant="outlined" 
                                    disabled={!isEdit}
                                    sx={ !isEdit ? {...textFieldDisabled} : undefined} 
                                    slotProps={!isEdit ? {...textFieldLabelDisabled} : undefined}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 12}}>
                                <Controller
                                    name="administrador"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth error={!!errors.administrador}>
                                            <InputLabel 
                                                id="grupo-label" 
                                                sx={!isEdit ? {...InputLabelDisabled} : undefined}
                                            >Administrador</InputLabel>
                                            <Select
                                                disabled={!isEdit}
                                                labelId="grupo-label"
                                                label="Administrador"
                                                {...field}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    field.onChange(value);
                                                }}
                                                sx={ !isEdit ? {...selectDisabled} : undefined}
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
                                    disabled={!isEdit}
                                    sx={ !isEdit ? {...textFieldDisabled} : undefined} 
                                    slotProps={!isEdit ? {...textFieldLabelDisabled} : undefined}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6}}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Fecha de modificación" 
                                    variant="outlined" 
                                    disabled={!isEdit}
                                    sx={ !isEdit ? {...textFieldDisabled} : undefined} 
                                    slotProps={!isEdit ? {...textFieldLabelDisabled} : undefined}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 12}}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Descripción del grupo" 
                                    variant="outlined" 
                                    disabled={!isEdit}
                                    sx={ !isEdit ? {...textFieldDisabled} : undefined} 
                                    slotProps={!isEdit ? {...textFieldLabelDisabled} : undefined}
                                />
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Box>
            </BoxContainer>
            <GrupoEstado />
            <GrupoTablaEstudiantes />
        </Box>
    );
}