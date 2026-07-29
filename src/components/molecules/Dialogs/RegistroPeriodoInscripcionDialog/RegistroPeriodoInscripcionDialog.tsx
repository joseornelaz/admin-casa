import React, { useEffect } from "react";
import { Box, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";

import { useMutation } from "@tanstack/react-query";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { Controller, useForm } from "react-hook-form";
import { PeriodoInscripcionFormSchema, type PeriodoInscripcionFormData } from "../../../../schemas/periodoInscripcionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "../../../../providers/NotificationProvider";
import { PostRegistrarPeriodo } from "../../../../services/PeriodoInscripcionService";
import type { PeriodoInscripcionPayload } from "../../../../types/PeriodoInscripcion.interface";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { HeaderDialog } from "../HeaderDialog/HeaderDialog";

dayjs.locale('es');

type DialogProps = {
    isOpen?: boolean;
    close: (isConfirmacion: boolean) => void;
}

export const RegistroPeriodoInscripcionDialog: React.FC<DialogProps> = ({isOpen, close}) => {
    const { showNotification } = useNotification();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [_hasError, setHasError] = React.useState(false);
    const [_errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    const handleClose = () => {
        reset();
        setOpen(false);
        close(false);
        // setHasError(false);
        // setErrorMessage("");
    };
    
    const estatus = [{ id: 0, nombre: 'Seleccionar'}, { id: 1, nombre: 'Abierto'}, { id: 2, nombre: 'Proximo'}, { id: 3, nombre: 'Cerrado'}];
    const { control, handleSubmit, formState: { errors }, reset } = useForm<PeriodoInscripcionFormData>({
            resolver: zodResolver(
                PeriodoInscripcionFormSchema(
                    (estatus?.map((m) => m.id)) ?? [],
                )
            ),
            defaultValues: {
                nombrePeriodo: '',
                fechaInicioInscripcion: '',
                fechaFinInscripcion: '',
                fechaInicioPlataforma: '',
                estatusPeriodo: 0,
            },
    });

    const onSubmit = async (data: PeriodoInscripcionFormData) => {
        setLoading(true);
        
        const estatusDescripcion = estatus.find((item) => item.id === Number(data.estatusPeriodo))?.nombre ?? '';
        
        const payload: PeriodoInscripcionPayload = {
            nombrePeriodo: data.nombrePeriodo,
            inicioInscripcion: data.fechaInicioInscripcion,
            finInscripcion: data.fechaFinInscripcion,
            inicioPlataforma: data.fechaInicioPlataforma,
            idEstatusPeriodo: Number(data.estatusPeriodo),
            estatusPeriodo: estatusDescripcion
        };
        
        createMutation.mutate(payload);
    }

    const createMutation = useMutation({
        mutationFn: PostRegistrarPeriodo,
        onSuccess: (response: any) => {
            console.log('Periodo de inscripción registrado correctamente: ', response.data);
            showNotification(`Periodo de inscripción registrado correctamente`,"success");
            reset();
            setLoading(false);
            setOpen(false);
            close(true);
        },
        onError: (error : any) => {
            setErrorMessage(error?.response?.data?.message ?? "Ocurrió un error inesperado");
            setLoading(false);
            setHasError(true);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });
    
    return(
        <Dialog isOpen={open} sxProps={{ margin: '5px', width: '520px', backgroundColor: '#FFF'}} >
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <HeaderDialog titulo="Nuevo Periodo de Inscripción" onClose={handleClose} />
                    <BoxContainer 
                        sxProps={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            backgroundColor: '#FFFFFF'
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                            <Controller
                                name="nombrePeriodo"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="nombrePeriodo"
                                        label="Nombre del periodo"
                                        fullWidth
                                        sx={{mb:0}}
                                    />
                                )}
                            />
                        <Box sx={{display: 'flex', gap: '16px' }}>
                            <Controller
                                name="fechaInicioInscripcion"
                                control={control}
                                render={({ field: { onChange, value, ...fieldProps } }) => (
                                    <DatePicker
                                    {...fieldProps}
                                    label="Inicio de inscripción"
                                    // Si el valor viene vacío de base '', le pasamos null para que MUI no falle
                                    value={value ? dayjs(value) : null}
                                    // Al cambiar, convertimos el objeto de Day.js a string ISO (YYYY-MM-DD) para tu Backend/Payload
                                    onChange={(date) => {
                                        const dayjsDate = date as dayjs.Dayjs | null;
                                        onChange(dayjsDate ? dayjsDate.format('YYYY-MM-DD') : '');
                                    }}
                                    slotProps={{
                                        textField: {
                                        fullWidth: true,
                                        size: 'small', // Mantiene el estilo compacto de tu UI
                                        error: !!errors.fechaInicioInscripcion,
                                        helperText: errors.fechaInicioInscripcion?.message,
                                        },
                                    }}
                                    />
                                )}
                            />
                            <Controller
                                name="fechaFinInscripcion"
                                control={control}
                                render={({ field: { onChange, value, ...fieldProps } }) => (
                                    <DatePicker
                                    {...fieldProps}
                                    label="Fin de inscripción"
                                    // Si el valor viene vacío de base '', le pasamos null para que MUI no falle
                                    value={value ? dayjs(value) : null}
                                    // Al cambiar, convertimos el objeto de Day.js a string ISO (YYYY-MM-DD) para tu Backend/Payload
                                    onChange={(date) => {
                                        const dayjsDate = date as dayjs.Dayjs | null;
                                        onChange(dayjsDate ? dayjsDate.format('YYYY-MM-DD') : '');
                                    }}
                                    slotProps={{
                                        textField: {
                                        fullWidth: true,
                                        size: 'small', // Mantiene el estilo compacto de tu UI
                                        error: !!errors.fechaInicioInscripcion,
                                        helperText: errors.fechaInicioInscripcion?.message,
                                        },
                                    }}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{display: 'flex', gap: '16px' }}>
                            <Controller
                                name="fechaInicioPlataforma"
                                control={control}
                                render={({ field: { onChange, value, ...fieldProps } }) => (
                                    <DatePicker
                                    {...fieldProps}
                                    label="Inicio en plataforma"
                                    // Si el valor viene vacío de base '', le pasamos null para que MUI no falle
                                    value={value ? dayjs(value) : null}
                                    // Al cambiar, convertimos el objeto de Day.js a string ISO (YYYY-MM-DD) para tu Backend/Payload
                                    onChange={(date) => {
                                        const dayjsDate = date as dayjs.Dayjs | null;
                                        onChange(dayjsDate ? dayjsDate.format('YYYY-MM-DD') : '');
                                    }}
                                    slotProps={{
                                        textField: {
                                        fullWidth: true,
                                        size: 'small', // Mantiene el estilo compacto de tu UI
                                        error: !!errors.fechaInicioInscripcion,
                                        helperText: errors.fechaInicioInscripcion?.message,
                                        },
                                    }}
                                    />
                                )}
                            />
                        </Box>
                        <Controller
                            name="estatusPeriodo"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.estatusPeriodo}>
                                    <InputLabel id="grupo-label">Estatus del periodo</InputLabel>
                                    <Select
                                        // disabled={isLoading}
                                        labelId="grupo-label"
                                        label="Estatus del periodo"
                                        {...field}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            field.onChange(value);
                                        }}
                                    >
                                        {
                                            estatus && estatus.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.nombre}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
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
                            >Guardar periodo</Button>
                        </Box>
                        </LocalizationProvider>
                        
                    </BoxContainer>
                </Box>
            </DialogContent>
        </Dialog>
    );
}