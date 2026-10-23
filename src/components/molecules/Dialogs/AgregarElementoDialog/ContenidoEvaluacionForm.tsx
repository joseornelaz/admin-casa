import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Controller, useForm } from "react-hook-form";
import type { RecursosResponse } from '../../../../types/Cursos.interface';

type ContenidoEvaluacionFormProps = {
    onClose: () => void;
    onBack: () => void;
    onSubmit?: (data: { titulo: string; file: File | null }) => void;
    isEditMode?: boolean;
    recursoData?: RecursosResponse;
}

export const ContenidoEvaluacionForm: React.FC<ContenidoEvaluacionFormProps> = ({ onClose, onBack, onSubmit, recursoData, isEditMode = false }) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(recursoData?.file || null);
    const [isSaving, setIsSaving] = React.useState(false);
    const { control, handleSubmit, setValue, reset } = useForm({
        defaultValues: recursoData || {
            titulo: '',
            file: null,
        },
    });

    useEffect(() => {
        if (recursoData) {
        reset({
            titulo: recursoData.titulo || "",
            file: recursoData.file || null,
        });
        }
    }, [recursoData, reset]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setValue('file', file);
        }
    };

    const handleBack = () => {
        onBack();
    }

    const handleClose = () => {
        if (!isSaving) {
            onClose();
        }     
    }

    const handleSave = () => {
        setIsSaving(true);
        handleSubmit((data) => {
            if(onSubmit) onSubmit({ ...data, file: selectedFile });
        })();
    }

    return(
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    {
                        !isEditMode && (
                            <IconButton size="small" onClick={handleBack} sx={{ color: '#6B7280', p: 0 }}>
                                <ChevronLeftIcon />
                            </IconButton>
                        )
                    }
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem', lineHeight: 1.2 }}>
                    Subir archivo
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                    Explora un archivo
                    </Typography>
                </Box>
                </Stack>
                <IconButton size="small" onClick={handleClose} sx={{ color: '#9CA3AF' }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Formulario */}
            <Stack spacing={3}>
                <Controller
                    name="titulo"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="titulo"
                            label="Nombre del elemento *"
                            fullWidth
                            variant="outlined"
                            size="medium"
                            sx={{
                                mb:0,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    backgroundColor: '#FAFAFA'
                                }
                            }}
                        />
                    )}
                />
                {/* Zona Dropzone */}
                <Box
                    sx={{
                        p: 4,
                        borderRadius: '16px',
                        border: '2px dashed #E5E7EB',
                        backgroundColor: '#FAFAFA',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}
                >
                    <CloudUploadOutlinedIcon sx={{ fontSize: 40, color: '#9CA3AF', mb: 1 }} />
                    <Typography variant="caption" sx={{ color: selectedFile ? '#16A34A' : '#9CA3AF', mb: 2, fontWeight: selectedFile ? 600 : 400 }}>
                        {selectedFile ? `Archivo seleccionado: ${selectedFile.name}` : 'PDF, video, SCORM u otro formato'}
                    </Typography>

                    <Button
                        variant="outlined"
                        component="label"
                        sx={{
                        borderColor: '#E5E7EB',
                        color: '#374151',
                        borderRadius: '10px',
                        textTransform: 'none',
                        px: 3,
                        py: 0.8,
                        fontWeight: 600,
                        backgroundColor: '#FFFFFF',
                        '&:hover': { borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' }
                        }}
                    >
                        Explorar archivos
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                </Box>

                {/* Botones de Acción */}
                <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBack}
                    disabled={isSaving}
                    sx={{
                        borderColor: '#E5E7EB',
                        color: '#374151',
                        borderRadius: '10px',
                        textTransform: 'none',
                        py: 1.2,
                        fontWeight: 600
                    }}
                >
                    {
                        !isEditMode ? 'Atrás' : 'Cancelar'
                    }
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving}
                    sx={{
                        backgroundColor: '#B82338',
                        color: '#FFF',
                        borderRadius: '10px',
                        textTransform: 'none',
                        py: 1.2,
                        fontWeight: 600,
                        '&:hover': { backgroundColor: '#991B1B' }
                    }}
                >
                    {
                        !isEditMode ? 'Guardar elemento' : 'Editar elemento'
                    }
                </Button>
                </Stack>
            </Stack>
        </Box>
    );
}