import React, { useEffect } from "react";
import { Box, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";

// import { useMutation } from "@tanstack/react-query";
// import { useCreateConfirmar } from "../../../../services/PlanEstudioService";
// import { useNotification } from "../../../../providers/NotificationProvider";

import DsSvgIcon from "../../../atoms/Icon/Icon";
import { AddDocument } from "@iconsCustomizeds";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { Controller, useForm } from "react-hook-form";
import { VigenciaFormSchema, type VigenciaFormData } from "../../../../schemas/vigenciaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import theme from "../../../../themes/theme";

type DialogProps = {
    isOpen?: boolean;
    close: (isConfirmacion: boolean) => void;
}

export const RegistroVigenciasDialog: React.FC<DialogProps> = ({isOpen, close}) => {
    // const { showNotification } = useNotification();
    const [open, setOpen] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);
    // const [hasError, setHasError] = React.useState(false);
    // const [errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    const handleClose = () => {
        setOpen(false);
        close(false);
        // setHasError(false);
        // setErrorMessage("");
    };

    const materias = [{ id: 0, nombre: 'Todas'}, { id: 1, nombre: 'Pendientes de calificar'}, { id: 2, nombre: 'Calificados'}];
    const { control, formState: { errors } } = useForm<VigenciaFormData>({
            resolver: zodResolver(
                VigenciaFormSchema(
                    (materias?.map((m) => m.id)) ?? [],
                )
            ),
            defaultValues: {
                materia: 0,
                name: '',
                fechaInicioInscripcion: '',
                fechaLimiteCarga: '',
                fechaInicioCurso: '',
                fechaFinCurso: '',
            },
    });


    // const handleConfirmar = () => {
    //     setLoading(true);
    //     createMutation.mutate(idCurso);
    // }

    // const createMutation = useMutation({
    //     mutationFn: useCreateConfirmar,
    //     onSuccess: () => {
    //         showNotification(`Se inscribio satisfactoriamente al curso`,"success");
    //         setLoading(false);
    //         setOpen(false);
    //         close(true);
    //     },
    //     onError: (error : any) => {
    //         setErrorMessage(error?.response?.data?.message ?? "Ocurrió un error inesperado");
    //         setLoading(false);
    //         setHasError(true);
    //     },
    //     onSettled: () => {
    //         console.log('La mutación ha finalizado');
    //     }
    // });
    
    return(
        <Dialog isOpen={open} sxProps={{ margin: '5px', width: '520px'}} >
            <DialogContent sx={{ backgroundColor: `${theme.palette.primary[100]}` }}>
                <Box sx={{display: 'flex', justifyContent: 'center', gap: '24px', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', gap: '8px' }}>
                        <DsSvgIcon component={AddDocument} />
                        <Typography component="h4" variant="h4">Nueva Vigencia</Typography>
                    </Box>
                    <BoxContainer 
                        backgroundColor="grey"
                        sxProps={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <Controller
                            name="materia"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.materia}>
                                    <InputLabel id="grupo-label">Materia</InputLabel>
                                    <Select
                                        // disabled={isLoading}
                                        labelId="grupo-label"
                                        label="Materia"
                                        {...field}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            field.onChange(value);
                                            // setIsDisabledListadoForos(true);
                                            // handleForos();
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
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="name"
                                    label="Nombre de la vigencia"
                                    fullWidth
                                    sx={{mb:0}}
                                />
                            )}
                        />
                        <Box sx={{display: 'flex', gap: '16px' }}>
                            <Controller
                                name="fechaInicioInscripcion"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="fechaInicioInscripcion"
                                        label="Fecha inicio de inscripción"
                                        fullWidth
                                        sx={{mb:0}}
                                    />
                                )}
                            />
                            <Controller
                                name="fechaLimiteCarga"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="fechaLimiteCarga"
                                        label="Fecha limite de carga"
                                        fullWidth
                                        sx={{mb:0}}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{display: 'flex', gap: '16px' }}>
                            <Controller
                                name="fechaInicioCurso"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="fechaInicioCurso"
                                        label="Fecha inicio de curso"
                                        fullWidth
                                        sx={{mb:0}}
                                    />
                                )}
                            />
                            <Controller
                                name="fechaFinCurso"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="fechaFinCurso"
                                        label="Fecha fin de curso"
                                        fullWidth
                                        sx={{mb:0}}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                onClick={handleClose}
                            >Cancelar</Button>
                            <Button
                                variant="contained"
                                onClick={()=> {}}
                            >Guardar vigencia</Button>
                        </Box>
                    </BoxContainer>
                </Box>
            </DialogContent>
        </Dialog>
    );
}