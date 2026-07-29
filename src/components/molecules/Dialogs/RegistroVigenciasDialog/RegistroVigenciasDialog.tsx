import React, { useEffect } from "react";
import { Box, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetMaterias } from "../../../../services/MateriasService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../../../providers/NotificationProvider";
import { VigenciaFormSchema, type VigenciaFormData } from "../../../../schemas/vigenciaSchema";
import { GetVigenciaById, PostRegistrarVigencia } from "../../../../services/VigenciasService";
import type { VigenciaPayload } from "../../../../types/Vigencias.interface";
import { HeaderDialog } from "../HeaderDialog/HeaderDialog";

type DialogProps = {
    isOpen?: boolean;
    close: (isConfirmacion: boolean) => void;
    idVigencia?: number; // Callback opcional para cuando se selecciona un grupo
}

const defaultValues = {
    idMateria: 0,
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    fechaProrroga: '',
    tipoVigencia: '',
};

export const RegistroVigenciasDialog: React.FC<DialogProps> = ({isOpen, close, idVigencia}) => {
    const { showNotification } = useNotification();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [_hasError, setHasError] = React.useState(false);
    const [_errorMessage, setErrorMessage] = React.useState('');
    const [_isEditMode, setIsEditMode] = React.useState(false);

    const { data: materiasData, isLoading: isLoadingMaterias } = GetMaterias({ enabled: true });
    const materias = materiasData ? [{ id: 0, nombre: 'Seleccionar' }, ...materiasData] : [{ id: 0, nombre: 'Seleccionar' }];

    const { control, handleSubmit, formState: { errors }, reset } = useForm<VigenciaFormData>({
            resolver: zodResolver(
                VigenciaFormSchema(
                    (materias?.map((m) => m.id)) ?? [],
                )
            ),
            defaultValues,
    });

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);
    
    const { data: vigenciaData, isSuccess } = GetVigenciaById(idVigencia ?? 0, { 
        enabled: !!idVigencia
    });

    useEffect(() => {    
        if (open && isSuccess && vigenciaData) {            
            setIsEditMode(true);
            reset(vigenciaData); // Carga ideal de tu formulario
        }
    }, [vigenciaData, isSuccess, reset, open]);

    const handleClose = () => {
        reset(defaultValues);

        setIsEditMode(false); // <- Apagamos el modo edición
        setOpen(false);
        close(false);
        setHasError(false);
        setErrorMessage("");
    };

    const onSubmit = async (data: VigenciaFormData) => {
        setLoading(true);
        
        const payload: VigenciaPayload = {
            idMateria: data.idMateria,
            nombre: data.nombre,
            fechaInicio: data.fechaInicio,
            fechaFin: data.fechaFin, 
            fechaProrroga: data.fechaProrroga,
            tipoVigencia: data.tipoVigencia,
        };
        
        createMutation.mutate(payload);
    }

    const createMutation = useMutation({
        mutationFn: PostRegistrarVigencia,
        onSuccess: () => {
            showNotification(`Vigencia registrada correctamente`,"success");
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
                    <HeaderDialog titulo="Nueva Vigencia" onClose={handleClose} />
                    
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
                                name="idMateria"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.idMateria}>
                                        <InputLabel id="grupo-label">Materia</InputLabel>
                                        <Select
                                            disabled={isLoadingMaterias}
                                            labelId="grupo-label"
                                            label="Materia"
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
                            <Controller
                                name="nombre"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="nombre"
                                        label="Nombre de la vigencia"
                                        fullWidth
                                        sx={{mb:0}}
                                    />
                                )}
                            />
                            <Controller
                                name="tipoVigencia"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="tipoVigencia"
                                        label="Tipo Vigencia"
                                        fullWidth
                                        sx={{mb:0}}
                                    />
                                )}
                            />
                            <Box sx={{display: 'flex', gap: '16px' }}>
                                <Controller
                                    name="fechaInicio"
                                    control={control}
                                    render={({ field: { onChange, value, ...fieldProps } }) => (
                                        <DatePicker
                                        {...fieldProps}
                                        label="Fecha inicio"
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
                                            error: !!errors.fechaInicio,
                                            helperText: errors.fechaInicio?.message,
                                            },
                                        }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="fechaFin"
                                    control={control}
                                    render={({ field: { onChange, value, ...fieldProps } }) => (
                                        <DatePicker
                                        {...fieldProps}
                                        label="Fecha fin"
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
                                            error: !!errors.fechaFin,
                                            helperText: errors.fechaFin?.message,
                                            },
                                        }}
                                        />
                                    )}
                                />
                            </Box>
                            <Controller
                                name="fechaProrroga"
                                control={control}
                                render={({ field: { onChange, value, ...fieldProps } }) => (
                                    <DatePicker
                                    {...fieldProps}
                                    label="Fecha de prórroga"
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
                                        error: !!errors.fechaProrroga,
                                        helperText: errors.fechaProrroga?.message,
                                        },
                                    }}
                                    />
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
                                >Guardar Vigencia</Button>
                            </Box>
                        </BoxContainer>
                    </LocalizationProvider>
                </Box>
            </DialogContent>
        </Dialog>
    );
}