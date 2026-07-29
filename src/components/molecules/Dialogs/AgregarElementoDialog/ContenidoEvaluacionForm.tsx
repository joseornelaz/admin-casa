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

type ContenidoEvaluacionFormProps = {
    onClose: () => void;
    onBack: () => void;
    onSubmit?: (data: any) => void;
    initialData?: any;
}

export const ContenidoEvaluacionForm: React.FC<ContenidoEvaluacionFormProps> = ({ onClose, onBack, onSubmit, initialData }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: initialData || {
            nombre: '',
            descripcion: '',
            fechaInicio: '',
            fechaFin: '',
        },
    });

    const handleBack = () => {
        onBack();
    }

    const handleClose = () => {
        onClose();
    }

    const handleSave = () => {
        handleSubmit((data) => {
            if(onSubmit) onSubmit(data);
        })();
    }

    return(
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                <IconButton size="small" onClick={handleBack} sx={{ color: '#6B7280', p: 0 }}>
                    <ChevronLeftIcon />
                </IconButton>
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
                    name="nombre"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="nombre"
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
                {/* <TextField
                fullWidth
                label="Nombre del elemento *"
                placeholder="Ej. Presentación del módulo"
                value={elementName}
                onChange={(e) => setElementName(e.target.value)}
                variant="outlined"
                size="medium"
                slotProps={{
                    inputLabel: {
                        shrink: true
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#FAFAFA'
                    }
                }}
                /> */}

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
                <Typography variant="caption" sx={{ color: '#9CA3AF', mb: 2 }}>
                    PDF, video, SCORM u otro formato
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
                    <input type="file" hidden />
                </Button>
                </Box>

                {/* Botones de Acción */}
                <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBack}
                    sx={{
                    borderColor: '#E5E7EB',
                    color: '#374151',
                    borderRadius: '10px',
                    textTransform: 'none',
                    py: 1.2,
                    fontWeight: 600
                    }}
                >
                    Atrás
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSave}
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
                    Guardar elemento
                </Button>
                </Stack>
            </Stack>
        </Box>
    );
}