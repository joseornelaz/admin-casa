import React, { useEffect } from "react";
import { Box, DialogContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";

import DsSvgIcon from "../../../atoms/Icon/Icon";
import { AddDocument } from "@iconsCustomizeds";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { Controller, useForm } from "react-hook-form";
import { RegistrarGrupoFormSchema, type RegistrarGrupoFormData } from "../../../../schemas/registrarGrupoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GetGrupoById, PostRegistrarGrupo } from "../../../../services/GruposService";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../../../providers/NotificationProvider";
import { GetTutores } from "../../../../services/TutoresService";
import { tipoGrupoOptions } from "../../../../types/Grupos.interface";

type DialogProps = {
    isOpen?: boolean;
    close: (isSaved: boolean) => void;
    idGrupo?: number; // Callback opcional para cuando se selecciona un grupo
}

const defaultValues = {
    nombre: '',
    descripcion: '',
    tipoGrupo: 1,
    tutor: 0,
};
export const RegistroGruposDialog: React.FC<DialogProps> = ({isOpen, close, idGrupo}) => {
    const { showNotification } = useNotification();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [_isEditMode, setIsEditMode] = React.useState(false);

    const { data: tutoresData, isLoading: isLoadingTutores } = GetTutores({ enabled: true });
    const tutores = tutoresData ? [{ id: 0, nombre: 'Seleccionar' }, ...tutoresData] : [{ id: 0, nombre: 'Seleccionar' }];

    const { control, handleSubmit, formState: { errors }, reset } = useForm<RegistrarGrupoFormData>({
            resolver: zodResolver(
                RegistrarGrupoFormSchema(
                    (tutores?.map((m) => m.id).filter((id) => id !== 0)) ?? [],
                    (tipoGrupoOptions?.map((m) => m.id)) ?? [],
                )
            ),
            defaultValues,
    });

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);
    
    const { data: grupoData, isSuccess } = GetGrupoById(idGrupo ?? 0, { 
        enabled: !!idGrupo
    });

    useEffect(() => {    
        if (open && isSuccess && grupoData) {
            console.log('Datos del grupo cargados reactivamente: ', grupoData);
            setIsEditMode(true);
            reset(grupoData); // Carga ideal de tu formulario
        }
    }, [grupoData, isSuccess, reset, open]);

    const handleClose = () => {
        reset(defaultValues); // Reseteamos el formulario al cerrar

        setIsEditMode(false); // <- Apagamos el modo edición
        setOpen(false);
        close(false);
    };

    const onSubmit = async (data: RegistrarGrupoFormData) => {
        setLoading(true);
        createMutation.mutate(data);
    }

    const createMutation = useMutation({
        mutationFn: PostRegistrarGrupo,
        onSuccess: () => {
            showNotification(`Grupo registrado correctamente`,"success");
            reset();
            setLoading(false);
            setOpen(false);
            close(true);
        },
        onError: (error : any) => {
            showNotification(error?.response?.data?.message ?? "Ocurrió un error inesperado", "error");
            setLoading(false);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });
    
    return(
        <Dialog isOpen={open} sxProps={{ margin: '5px', width: '520px'}} >
            <DialogContent sx={{ backgroundColor: `#E6EFFC` }}>
                <Box sx={{display: 'flex', justifyContent: 'center', gap: '24px', flexDirection: 'column', pb: '10px'}}>
                    <Box sx={{display: 'flex', gap: '8px' }}>
                        <DsSvgIcon component={AddDocument} />
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                            <Typography component="h4" variant="h4">Crear Grupo</Typography>
                            <Typography component="span" variant="body1" >Nuevo grupo para la vigencia activa</Typography>
                        </Box>
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <BoxContainer 
                            sxProps={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                backgroundColor: '#FFFFFF'
                            }}
                        >
                            <Controller
                                name="nombre"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="nombre"
                                        label="Nombre del grupo *"
                                        fullWidth
                                        sx={{mb:0}}
                                        error={!!errors.nombre}
                                        helperText={errors.nombre?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="descripcion"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="descripcion"
                                        label="Descripción del grupo"
                                        fullWidth
                                        sx={{mb:0}}
                                        multiline
                                        rows={3}
                                    />
                                )}
                            />
                            
                            <Controller
                                name="tipoGrupo"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.tipoGrupo}>
                                        <InputLabel id="grupo-label">Tipo de Grupo</InputLabel>
                                        <Select
                                            labelId="grupo-label"
                                            label="Tipo de Grupo"
                                            {...field}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                field.onChange(value);
                                            }}
                                        >
                                            {
                                                tipoGrupoOptions && tipoGrupoOptions.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.label}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name="tutor"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.tutor}>
                                        <InputLabel id="tutor-label">Tutor *</InputLabel>
                                        <Select
                                            disabled={isLoadingTutores}
                                            labelId="tutor-label"
                                            label="Tutor *"
                                            {...field}
                                        >
                                            {tutores && tutores.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.tutor && (
                                            <FormHelperText>{errors.tutor.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />

                            <Box sx={{display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                    disabled={loading}
                                >Cancelar</Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={loading}
                                >Guardar Grupo</Button>
                            </Box>
                        </BoxContainer>
                    </LocalizationProvider>
                </Box>
            </DialogContent>
        </Dialog>
    );
}