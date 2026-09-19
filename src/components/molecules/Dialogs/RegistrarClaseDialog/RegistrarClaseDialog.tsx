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
  Typography,
  Link as MuiLink,
  IconButton,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { useNotification } from "../../../../providers/NotificationProvider";

type DialogProps = {
  isOpen?: boolean;
  close: (isSaved: boolean) => void;
};

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
  anio: string;
  mes: string;
  dia: string;
  hora: string;
  minuto: string;
};

const tutoriasData = [
  {
    id: 316,
    linkAdmin: "link",
    linkTutoria: "link",
    fecha: "2026/JUL/9",
    hora: "10:00",
    observaciones: "prueba",
  },
];

export const RegistrarClaseDialog: React.FC<DialogProps> = ({ isOpen, close }) => {
  const { showNotification } = useNotification();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      planEstudio: "",
      servicio: "Video",
      titulo: "",
      linkAdmin: "",
      linkTutoria: "",
      descripcion: "",
      tipo: "Ordinaria",
      materia: "",
      grupo1: false,
      grupo2: false,
      anio: "2026",
      mes: "JULIO",
      dia: "9",
      hora: "10",
      minuto: "00",
    },
  });

  const handleClose = () => {
    reset();
    close(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    showNotification("Clase agregada correctamente", "success");
    reset();
    close(true);
  };

  return (
    <Dialog isOpen={isOpen} sxProps={{ margin: "5px", width: "680px", maxWidth: "95vw" }}>
      <DialogContent sx={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "20px" }}>
        {/* Header Superior */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827", fontSize: "1.25rem" }}>
              Agregar Clase
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.88rem" }}>
              Nueva clase para este grupo
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small" sx={{ color: "#9CA3AF" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Fila 1: Planes de estudio, Servicio, Título */}
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
              <Box sx={{ flex: 1, minWidth: "180px" }}>
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "#4B5563", mb: 0.5 }}>
                  Planes de estudio:
                </Typography>
                <Controller
                  name="planEstudio"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <Select
                        {...field}
                        displayEmpty
                        sx={{
                          backgroundColor: "#FAFAFA",
                          borderRadius: "10px",
                          fontSize: "0.88rem",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        }}
                      >
                        <MenuItem value="">
                          <span style={{ color: "#9CA3AF" }}>Selecciona un plan de estudio</span>
                        </MenuItem>
                        <MenuItem value="plan2025">Plan 2025</MenuItem>
                        <MenuItem value="plan2026">Plan 2026</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: 1, minWidth: "150px" }}>
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "#4B5563", mb: 0.5 }}>
                  Servicio:
                </Typography>
                <Controller
                  name="servicio"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <Select
                        {...field}
                        sx={{
                          backgroundColor: "#FAFAFA",
                          borderRadius: "10px",
                          fontSize: "0.88rem",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        }}
                      >
                        <MenuItem value="Video">Video</MenuItem>
                        <MenuItem value="Presencial">Presencial</MenuItem>
                        <MenuItem value="Online">Online</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: 1, minWidth: "150px" }}>
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "#4B5563", mb: 0.5 }}>
                  Título:
                </Typography>
                <Controller
                  name="titulo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      placeholder="Título"
                      slotProps={{
                        input: {
                          sx: {
                            backgroundColor: "#FAFAFA",
                            borderRadius: "10px",
                            fontSize: "0.88rem",
                            "& fieldset": { borderColor: "#E5E7EB" },
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Box>

            {/* Fila 2: Link de Administrador */}
            <Box>
              <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "#4B5563", mb: 0.5 }}>
                Link de Administrador:
              </Typography>
              <Controller
                name="linkAdmin"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    placeholder="Link de Administrador"
                    slotProps={{
                      input: {
                        sx: {
                          backgroundColor: "#FAFAFA",
                          borderRadius: "10px",
                          fontSize: "0.88rem",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>

            {/* Fila 3: Link de tutoría */}
            <Box>
              <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "#4B5563", mb: 0.5 }}>
                Link de tutoría:
              </Typography>
              <Controller
                name="linkTutoria"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    placeholder="Link de tutoría"
                    slotProps={{
                      input: {
                        sx: {
                          backgroundColor: "#FAFAFA",
                          borderRadius: "10px",
                          fontSize: "0.88rem",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>

            {/* Fila 4: Descripción */}
            <Box>
              <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "#4B5563", mb: 0.5 }}>
                Descripción:
              </Typography>
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Descripción del video"
                    slotProps={{
                      input: {
                        sx: {
                          backgroundColor: "#FAFAFA",
                          borderRadius: "10px",
                          fontSize: "0.88rem",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>

            {/* Fila 5: Tipo y Materia */}
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
              <Box sx={{ flex: 1, minWidth: "200px" }}>
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "#4B5563", mb: 0.5 }}>
                  Tipo:
                </Typography>
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <Select
                        {...field}
                        sx={{
                          backgroundColor: "#FAFAFA",
                          borderRadius: "10px",
                          fontSize: "0.88rem",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        }}
                      >
                        <MenuItem value="Ordinaria">Ordinaria</MenuItem>
                        <MenuItem value="Extraordinaria">Extraordinaria</MenuItem>
                        <MenuItem value="Recursamiento">Recursamiento</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: 1, minWidth: "200px" }}>
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "#4B5563", mb: 0.5 }}>
                  Materia:
                </Typography>
                <Controller
                  name="materia"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <Select
                        {...field}
                        displayEmpty
                        sx={{
                          backgroundColor: "#FAFAFA",
                          borderRadius: "10px",
                          fontSize: "0.88rem",
                          "& fieldset": { borderColor: "#E5E7EB" },
                        }}
                      >
                        <MenuItem value="">
                          <span style={{ color: "#9CA3AF" }}>Selecciona una materia</span>
                        </MenuItem>
                        <MenuItem value="Diseño de Interfaces I">Diseño de Interfaces I</MenuItem>
                        <MenuItem value="Programación Web">Programación Web</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>

            {/* Fila 6: Grupos (Checkboxes) */}
            <Box sx={{ mt: 0.5 }}>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#4B5563", mb: 0.5 }}>
                Grupos:
              </Typography>
              <FormGroup sx={{ gap: 0.2 }}>
                <Controller
                  name="grupo1"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} size="small" color="success" />}
                      label={
                        <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
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
                      control={<Checkbox {...field} checked={field.value} size="small" color="success" />}
                      label={
                        <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
                          Grupo PRUEBA IDS UMI Autoridad - Diseño de Interfaces I
                        </Typography>
                      }
                    />
                  )}
                />
              </FormGroup>
            </Box>

            {/* Fila 7: Fecha (Año/Mes/Día) y Hora (Hora/Minuto) */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
              {/* Fecha: AÑO / MES / DIA */}
              <Box sx={{ flex: 1.2 }}>
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#4B5563", mb: 0.5 }}>
                  AÑO/MES/DIA:
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Controller
                    name="anio"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        slotProps={{
                          input: {
                            sx: {
                              backgroundColor: "#FAFAFA",
                              borderRadius: "10px",
                              fontSize: "0.88rem",
                              "& fieldset": { borderColor: "#E5E7EB" },
                            },
                          },
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="mes"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        slotProps={{
                          input: {
                            sx: {
                              backgroundColor: "#FAFAFA",
                              borderRadius: "10px",
                              fontSize: "0.88rem",
                              "& fieldset": { borderColor: "#E5E7EB" },
                            },
                          },
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="dia"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        slotProps={{
                          input: {
                            sx: {
                              backgroundColor: "#FAFAFA",
                              borderRadius: "10px",
                              fontSize: "0.88rem",
                              "& fieldset": { borderColor: "#E5E7EB" },
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>

              {/* Hora: HORA / MINUTO */}
              <Box sx={{ flex: 0.8 }}>
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#4B5563", mb: 0.5 }}>
                  HORA/MINUTO:
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Controller
                    name="hora"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        slotProps={{
                          input: {
                            sx: {
                              backgroundColor: "#FAFAFA",
                              borderRadius: "10px",
                              fontSize: "0.88rem",
                              "& fieldset": { borderColor: "#E5E7EB" },
                            },
                          },
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="minuto"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        slotProps={{
                          input: {
                            sx: {
                              backgroundColor: "#FAFAFA",
                              borderRadius: "10px",
                              fontSize: "0.88rem",
                              "& fieldset": { borderColor: "#E5E7EB" },
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>

            {/* Fila 8: Tabla Fechas de tutorías */}
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#4B5563", mb: 1 }}>
                Fechas de tutorías
              </Typography>
              <TableContainer
                sx={{
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  overflow: "hidden",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#F3F4F6" }}>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", color: "#6B7280" }}>
                        ID
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", color: "#6B7280" }}>
                        LINK ADMIN.
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", color: "#6B7280" }}>
                        LINK TUTORÍA
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", color: "#6B7280" }}>
                        FECHA
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", color: "#6B7280" }}>
                        HORA
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", color: "#6B7280" }}>
                        OBSERVACIONES
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", color: "#6B7280" }} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tutoriasData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: "0.85rem", color: "#374151" }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: "0.85rem" }}>
                          <MuiLink href="#" color="primary" underline="hover">
                            {row.linkAdmin}
                          </MuiLink>
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.85rem" }}>
                          <MuiLink href="#" color="primary" underline="hover">
                            {row.linkTutoria}
                          </MuiLink>
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.85rem", color: "#374151" }}>{row.fecha}</TableCell>
                        <TableCell sx={{ fontSize: "0.85rem", color: "#374151" }}>{row.hora}</TableCell>
                        <TableCell sx={{ fontSize: "0.85rem", color: "#374151" }}>{row.observaciones}</TableCell>
                        <TableCell sx={{ fontSize: "0.85rem", color: "#9CA3AF" }}>—</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Botón de Acción Guardar */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                icon={<AssignmentTurnedInOutlinedIcon sx={{ fontSize: 18 }} />}
                iconPosition="start"
                sxProps={{
                  borderRadius: "10px",
                  backgroundColor: "#16A34A",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3.5,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#15803D",
                  },
                }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};