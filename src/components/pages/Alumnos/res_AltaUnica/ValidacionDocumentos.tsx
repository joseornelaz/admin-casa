import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Accordion } from '../../../molecules/Accordion/Accordion';
import { LinearProgress } from '../../../molecules/LinearProgress/LinearProgress';
import { BorderRadius, flexColumn, Paddings } from '@styles';
import { InputLabelRequired } from '../../../molecules/InputLabelRequired/InputLabelRequired';
import { CardStepFileUpload } from '../../../molecules/CardStepFileUpload/CardStepFileUpload';
import { GetFileType } from '../../../../utils/Helpers';
import { ButtonFileUpload } from '../../../molecules/ButtonFileUpload/ButtonFileUpload';

interface Documento {
    step: number;
    title: string;
    subtitle: string;
    isRequired: boolean;
    isOpenCard: boolean;
    file: File | null;
    condicion: string;
    observaciones: string;
}

const DOCUMENTACION_ESCOLAR: Documento[] = [
    {
        step: 1,
        title: 'Acta de Nacimiento',
        subtitle: 'Original certificada',
        isRequired: true,
        isOpenCard: false,
        file: null,
        condicion: '',
        observaciones: '',
    },
    {
        step: 2,
        title: 'CURP',
        subtitle: 'Clave Única de Registro de Población',
        isRequired: true,
        isOpenCard: false,
        file: null,
        condicion: '',
        observaciones: '',
    },
    {
        step: 3,
        title: 'Certificado',
        subtitle: 'Último grado de estudios completado',
        isRequired: true, 
        isOpenCard: false,
        file: null,
        condicion: '',
        observaciones: '',
    },
    {
        step: 4,
        title: 'Carta de autenticidad',
        subtitle: 'Aceptación de documentos originales',
        isRequired: false,
        isOpenCard: false,
        file: null,
        condicion: '',
        observaciones: '',
    },
    {
        step: 5,
        title: 'Equivalencia',
        subtitle: 'Revalidación de Materias',
        isRequired: false,
        isOpenCard: false,
        file: null,
        condicion: '',
        observaciones: '',
    },
    {
        step: 6,
        title: 'Certificado Parcial de Estudios',
        subtitle: 'Último grado de estudios completado',
        isRequired: false,
        isOpenCard: false,
        file: null,
        condicion: '',
        observaciones: '',
    },
    {
        step: 7,
        title: 'Fotografías',
        subtitle: '2 fotografías tamaño infantil blanco y negro',
        isRequired: false,
        isOpenCard: false,
        file: null,
        condicion: '',
        observaciones: '',
    },
];


export const ValidacionDocumentos: React.FC = () => {
    const theme = useTheme();
    const [expanded, _setExpanded] = useState(true);
    const [modalidad, setModalidad] = useState('Físico/Digital/Físico y Digital');
    const [estatusRecepcion, setEstatusRecepcion] = useState('');
    const [_condicion, _setCondicion] = useState('Aceptable');
    const [_observaciones, _setObservaciones] = useState('');  
    const [observacionesGenerales, setObservacionesGenerales] = useState('');  


    const [archivosSubidos, setArchivosSubidos] = useState(0);
    const [progress, setProgress] = useState(0);

    const [documentacion, setDocumentacion] = useState(DOCUMENTACION_ESCOLAR);

    const handleUploadFile = (fileData: { step: number, file: File }) => {
        setDocumentacion((prev) => 
            prev.map((item) => {
                if (item.step === fileData.step) {
                    return { ...item, isOpenCard: true, file: fileData.file };
                }
                return item;
            })
        );

        setProgress((prog: number) => prog + 16);
        setArchivosSubidos((prog: number) => prog + 1);
    };

    const handleReUploadFile = (fileData: { step: number, file: File }) => {
        setDocumentacion((prev) => 
            prev.map((item) => {
                if (item.step === fileData.step) {
                    return { ...item, isOpenCard: true, file: fileData.file };
                }
                return item;
            })
        );

        // setProgress((prog: number) => prog + 16);
        // setArchivosSubidos((prog: number) => prog + 1);
    };

    const handleCondicionChange = (step: number, value: string) => {
        setDocumentacion((prev) =>
            prev.map((item) => {
                if (item.step === step) {
                    return { ...item, condicion: value };
                }
                return item;
            })
        );
    };

    const handleObservacionesChange = (step: number, value: string) => {
        setDocumentacion((prev) =>
            prev.map((item) => {
                if (item.step === step) {
                    return { ...item, observaciones: value };
                }
                return item;
            })
        );
    };

    const handleGuardarCambios = (step: number) => {
        const documento = documentacion.find(doc => doc.step === step);
        console.log('Guardando cambios del documento:', documento);
        // Aquí puedes enviar al servidor
    };

    // const handleGuardarFormulario = () => {
    //     const formularioCompleto = {
    //         modalidad,
    //         estatusRecepcion,
    //         observacionesGenerales,
    //         documentos: documentacion.map(doc => ({
    //             step: doc.step,
    //             title: doc.title,
    //             subtitle: doc.subtitle,
    //             isRequired: doc.isRequired,
    //             file: doc.file,
    //             condicion: doc.condicion,
    //             observaciones: doc.observaciones,
    //         })),
    //     };

    //     console.log('Formulario completo:', formularioCompleto);
    //     // Aquí puedes enviar al servidor
    //     return formularioCompleto;
    // };

    const fileType = (file: string) => {
        if(file === '') return <></>;

        const { icon } = GetFileType(file);

        return(
            <>
                { icon }
                <Typography variant="body2">
                    { file }
                </Typography>
            </>
        )
    }

    const CardStepFiles = (item: any) => {
        const documento = documentacion.find(doc => doc.step === item.step);

        return !item.isOpenCard ? (
                <Box
                    key={item.step}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: theme.palette.primary[100],
                        border: `1px solid ${theme.palette.primary[200]}`,
                        borderRadius: BorderRadius.sm,
                        padding: `${Paddings.m} ${Paddings.l} ${Paddings.m} ${Paddings.l}`,
                        mb: 2
                    }}
                >
                    <CardStepFileUpload
                        step={item.step}
                        title={item.title}
                        subtitle={item.subtitle}
                        isRequired={item.isRequired}
                        showFileUploap={true}
                        onFileUpload={handleUploadFile}
                    />
                </Box>
            ) : (
                <Card
                    key={item.step}
                    variant="outlined"
                    sx={{ border: 2, borderColor: 'warning.main', mb: 2 }}
                >
                    <CardContent>
                        <CardStepFileUpload 
                            step={item.step}
                            title={item.title}
                            subtitle={item.subtitle}
                            status={{text: "PENDIENTE DE REVISIÓN", status: "prueba"}}
                            isRequired={item.isRequired}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', mb: 2 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                                    { fileType(documento?.file?.name || '') }
                                    <IconButton>
                                        <VisibilityOutlinedIcon color='primary'/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>

                        <FormControl fullWidth sx={{ mb: 2 }} size='small'>
                            <InputLabelRequired text='Condición del documento' isRequired={true} />
                            <Select
                                value={documento?.condicion || ''}
                                onChange={(e) => handleCondicionChange(item.step, e.target.value)}
                                label="Condición del documento *"
                            >
                                <MenuItem value="">Seleccionar</MenuItem>
                                <MenuItem value="Aceptable">Aceptable</MenuItem>
                                <MenuItem value="No aceptable">No aceptable</MenuItem>
                                <MenuItem value="Requiere corrección">Requiere corrección</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Observaciones del documento"
                            placeholder="Comentarios acerca del documento"
                            value={documento?.observaciones || ''}
                            onChange={(e) => handleObservacionesChange(item.step, e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                            <ButtonFileUpload buttonText="Re-subir" fileUpload={(file) => handleReUploadFile({step: item.step, file: file })} />
                            <Button 
                                variant="contained"
                                onClick={() => handleGuardarCambios(item.step)}
                            >
                                Guardar cambios
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            );
    };

  return (
    <Accordion title="Validación de documentos" isExpanded={expanded}>
        <Box sx={{...flexColumn, alignItems: 'flex-start', mb: 3, width: '100%', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, width: '100%' }}>
                <Typography variant='caption'>
                    Validación e inscripción
                </Typography>
                <Typography variant='caption'>
                    Documentos {archivosSubidos}/6
                </Typography>
            </Box>
            <LinearProgress value={progress} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2, gap: 2 }}>
            <FormControl fullWidth size='small'>
              <InputLabel>Modalidad del expediente</InputLabel>
              <Select
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
                label="Modalidad del expediente"
              >
                <MenuItem value="Físico">Físico</MenuItem>
                <MenuItem value="Digital">Digital</MenuItem>
                <MenuItem value="Físico/Digital/Físico y Digital">
                  Físico/Digital/Físico y Digital
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size='small'>
              <InputLabel>Estatus de recepción</InputLabel>
              <Select
                value={estatusRecepcion}
                onChange={(e) => setEstatusRecepcion(e.target.value)}
                label="Estatus de recepción"
              >
                <MenuItem value="En caso de ser Físico, especificar el estatus de la recepción">
                  En caso de ser Físico, especificar el estatus de la recepción
                </MenuItem>
                <MenuItem value="Recibido completo">Recibido completo</MenuItem>
                <MenuItem value="Recibido incompleto">Recibido incompleto</MenuItem>
                <MenuItem value="Pendiente">Pendiente</MenuItem>
              </Select>
            </FormControl>
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Documentación Personal
        </Typography>
        {
            documentacion.slice(0,2).map((item) => CardStepFiles(item))
        }
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Documentación Escolar
        </Typography>
        {
            documentacion.slice(2,6).map((item) => CardStepFiles(item))
        }
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Otros Documentos
        </Typography>
        {
            documentacion.slice(6,7).map((item) => CardStepFiles(item))
        }
        <TextField
            fullWidth
            id="observaciones"
            label="Observaciones y/o comentarios"
            placeholder="Escribe si hay observaciones y/o comentarios"
            value={observacionesGenerales}
            onChange={(e) => setObservacionesGenerales(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
            multiline
            rows={2}
        />
        
    </Accordion>
  );
}