import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
  Button,
  InputLabel,
  FormControl
} from "@mui/material";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DsSvgIcon from "../../../atoms/Icon/Icon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type DialogProps = {
  isOpen?: boolean;
  close: (isSaved: boolean) => void;
};

// Tipado de los valores del formulario
type FormValues = {
  planEstudio: string;
  servicio: string;
  titulo: string;
  linkAdmin: string;
  linkTutoria: string;
  descripcion: string;
  tipo: string;
  materia: string;
  grupo1: boolean;
  grupo2: boolean;
  fechaClase: string;
  hora: string;
  minuto: string;
};

// Datos dummy de ejemplo para la tabla basada en la imagen
const tutoriasData = [
  {
    id: 316,
    linkAdmin: "link",
    linkTutoria: "link",
    fecha: "2026 / JUL / 9",
    hora: "10:00",
    observaciones: "prueba",
  },
];

const planesEstudioOptions = [
    { value: "", label: "Seleccionar" },
    { value: "plan2025", label: "Plan 2025" },    
    { value: "plan2026", label: "Plan 2026" },
];

export const RegistrarClaseDialog: React.FC<DialogProps> = ({ isOpen, close }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      planEstudio: "",
      servicio: "Video",
      titulo: "",
      linkAdmin: "",
      linkTutoria: "",
      descripcion: "",
      tipo: "Ordinaria",
      materia: "Diseño de Interfaces I",
      grupo1: false,
      grupo2: false,
      fechaClase: "",
      hora: "10",
      minuto: "00",
    },
  });

  const handleClose = () => {
    close(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    close(true);
  };

  return (
    <Dialog isOpen={isOpen} sxProps={{ margin: "5px", width: "650px", maxWidth: "100%" }}>
      <DialogContent sx={{ backgroundColor: "#E6EFFC", padding: "24px" }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '24px', flexDirection: 'column', pb: '10px' }}>
          
          {/* Header */}
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <DsSvgIcon component={AssignmentTurnedInOutlinedIcon} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography component="h4" variant="h4">Agregar Clase</Typography>
              <Typography component="span" variant="body1">Nueva clase para este grupo</Typography>
            </Box>
          </Box>

          <BoxContainer 
            sxProps={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: '#FFFFFF'
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                {/* Fila 1: Planes de estudio, Servicio, Título */}
                <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Controller
                        name="planEstudio"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth size="small">
                                <InputLabel id="planes-label">Planes de estudio</InputLabel>
                                <Select
                                    {...field}
                                    labelId="planes-label"
                                    label="Planes de estudio"
                                >
                                    {planesEstudioOptions && planesEstudioOptions.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                      name="servicio"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth size="small">
                            <InputLabel id="grupo-label">Servicio</InputLabel>
                            <Select {...field} labelId="grupo-label" label="Servicio">
                                <MenuItem value="Video">Video</MenuItem>
                                <MenuItem value="Presencial">Presencial</MenuItem>
                            </Select>
                        </FormControl>                        
                      )}
                    />
                    <Controller
                      name="titulo"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} fullWidth placeholder="Título" label="Título" />
                      )}
                    />
                </Box>

                {/* Fila 2: Link de Administrador */}
                
                  <Controller
                    name="linkAdmin"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth placeholder="Link de Administrador" label="Link de Administrador" />
                    )}
                  />

                {/* Fila 3: Link de tutoría */}
                
                  <Controller
                    name="linkTutoria"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth placeholder="Link de tutoría" label="Link de tutoría" />
                    )}
                  />                

                {/* Fila 4: Descripción */}
                
                <Controller
                    name="descripcion"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} fullWidth multiline rows={2} placeholder="Descripción del video" label="Descripción del video" />
                    )}
                />

                {/* Fila 5: Tipo y Materia */}
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  
                    <Controller
                      name="tipo"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth size="small">
                            <InputLabel id="grupo-label">Tipo</InputLabel>
                            <Select {...field} labelId="grupo-label" label="Tipo">
                                <MenuItem value="Ordinaria">Ordinaria</MenuItem>
                                <MenuItem value="Extraordinaria">Extraordinaria</MenuItem>
                            </Select>
                        </FormControl>
                      )}
                    />
                    
                    <Controller
                      name="materia"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth size="small">
                            <InputLabel id="grupo-label">Materia</InputLabel>
                            <Select {...field} labelId="grupo-label" label="Materia">
                                <MenuItem value="Diseño de Interfaces I">Diseño de Interfaces I</MenuItem>
                            </Select>
                        </FormControl>
                      )}
                    />
                  
                </Box>

                {/* Fila 6: Grupos (Checkboxes) */}
                <Box sx={{mt: 2}}>
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#555", mb: 0.5 }}>
                    Grupos:
                  </Typography>
                  <FormGroup>
                    <Controller
                      name="grupo1"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} size="small" />}
                          label={
                            <Typography variant="body2" sx={{ color: "#555" }}>
                              Grupo PRUEBA IDS UMI Autoridad - Diseño de Interfaces I
                            </Typography>
                          }
                        />
                      )}
                    />
                    <Controller
                      name="grupo2"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} size="small" />}
                          label={
                            <Typography variant="body2" sx={{ color: "#555" }}>
                              Grupo PRUEBA IDS UMI Autoridad - Diseño de Interfaces I
                            </Typography>
                          }
                        />
                      )}
                    />
                  </FormGroup>
                </Box>

                {/* Fila 7: Fecha y Hora compuestas */}
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Controller
                                name="fechaClase"
                                control={control}
                                render={({ field: { onChange, value, ...fieldProps } }) => (
                                    <DatePicker
                                    {...fieldProps}
                                    label="Fecha de la clase"
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
                                        
                                        },
                                    }}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Controller
                                    name="hora"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} fullWidth placeholder="Hora" label="Hora" />
                                    )}
                                />
                                <Controller
                                    name="minuto"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} fullWidth placeholder="Minutos" label="Minutos" />
                                    )}
                                />
                            </Box>
                        </Box>
                    </Box>
                </LocalizationProvider>

                {/* Fila 8: Tabla de Fechas de tutorías */}
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#555", mb: 1 }}>
                    Fechas de tutorías
                  </Typography>

                  <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: "8px" }}>
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: "#F2EFF0" }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold", fontSize: "0.7rem", color: "#666" }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: "0.7rem", color: "#666" }}>LINK ADMIN.</TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: "0.7rem", color: "#666" }}>LINK TUTORÍA</TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: "0.7rem", color: "#666" }}>FECHA</TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: "0.7rem", color: "#666" }}>HORA</TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: "0.7rem", color: "#666" }}>OBSERVACIONES</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tutoriasData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell sx={{ fontSize: "0.8rem" }}>{row.id}</TableCell>
                            <TableCell sx={{ fontSize: "0.8rem" }}>
                              <Link href="#" color="error" underline="hover">{row.linkAdmin}</Link>
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.8rem" }}>
                              <Link href="#" color="error" underline="hover">{row.linkTutoria}</Link>
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.8rem" }}>{row.fecha}</TableCell>
                            <TableCell sx={{ fontSize: "0.8rem" }}>{row.hora}</TableCell>
                            <TableCell sx={{ fontSize: "0.8rem" }}>{row.observaciones}</TableCell>
                            <TableCell sx={{ fontSize: "0.8rem" }}>—</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                {/* Botones de acción */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
                  <Button variant="outlined" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="error">
                    Guardar
                  </Button>
                </Box>

              </Box>
            </form>
          </BoxContainer>
        </Box>
      </DialogContent>
    </Dialog>
  );
};