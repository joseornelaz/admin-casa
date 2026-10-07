import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AgregarElementoDialog, type ElementoCapturedData } from "../AgregarElementoDialog/AgregarElementoDialog";
import { useQueryClient } from "@tanstack/react-query";
import { CreateModulo, CreateRecurso } from "../../../../services/CursosService";
import { MODULOS_CURSOS } from "../../../../types/endpoints";
import { apiClient } from "../../../../services/ApiConfiguration/httpClient";

export interface AgregarModuloDialogProps {
  open: boolean;
  onClose: () => void;
  idCurso?: number;
  onSave?: (data: {
    nombreModulo: string;
    ordenModulo: string;
    recursos?: ElementoCapturedData[];
  }) => void;
  onAddElementToModule?: (elementData?: ElementoCapturedData) => void;
}

export const AgregarModuloDialog: React.FC<AgregarModuloDialogProps> = ({
  open,
  onClose,
  idCurso,
  onSave,
  onAddElementToModule,
}) => {
  const queryClient = useQueryClient();
  const [nombreModulo, setNombreModulo] = useState<string>("");
  const [ordenModulo, setOrdenModulo] = useState<string>("Posición 1");
  const [recursos, setRecursos] = useState<ElementoCapturedData[]>([]);
  const [openElementoDialog, setOpenElementoDialog] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClose = () => {
    setNombreModulo("");
    setOrdenModulo("Posición 1");
    setRecursos([]);
    setOpenElementoDialog(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleOpenElemento = () => {
    if (onAddElementToModule) {
      onAddElementToModule();
    } else {
      setOpenElementoDialog(true);
    }
  };

  const handleElementSaved = (elementData: ElementoCapturedData) => {
    setRecursos((prev) => [...prev, elementData]);
    onAddElementToModule?.(elementData);
    setOpenElementoDialog(false);
  };

  const handleRemoveElement = (indexToRemove: number) => {
    setRecursos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleGuardar = async () => {
    if (!nombreModulo.trim()) return;

    setIsSubmitting(true);
    try {
      if (idCurso) {
        // 1. Registrar el módulo en la API
        const response = await CreateModulo(idCurso, {
          id_modulo: 0,
          id_curso: idCurso,
          titulo: nombreModulo.trim(),
        });
        
        const createdModuleId = response?.id;

        let targetLeccionId: number | null = null;

        // Intentar obtener id_leccion para el módulo recién creado
        if (createdModuleId) {
          try {
            const leccionesPath = MODULOS_CURSOS.GET_LISTAR_LECCIONES_MODULO.path.replace(':id_modulo', createdModuleId.toString());
            const leccionesData = await apiClient.get<any[]>(leccionesPath);

            if (Array.isArray(leccionesData) && leccionesData.length > 0 && leccionesData[0]?.id_leccion) {
              targetLeccionId = leccionesData[0].id_leccion;
            } else {
              // Si el módulo no tiene lección en lecciones_modulo, intentar crear una lección inicial
              try {
                const newLeccionRes: any = await apiClient.post(leccionesPath, {
                  titulo: nombreModulo.trim(),
                  contenido_texto: "",
                  orden: 1,
                  duracion_minutos: 0,
                });
                targetLeccionId = newLeccionRes?.id || newLeccionRes?.id_leccion || newLeccionRes?.data?.id || newLeccionRes?.data?.id_leccion || null;
              } catch (createErr) {
                console.warn("No se pudo crear lección inicial para el módulo:", createErr);
              }
            }
          } catch (err) {
            console.warn("No se pudo obtener las lecciones del módulo:", err);
          }
        }

        // 2. Si hay recursos temporales agregados y tenemos una lección válida en lecciones_modulo, crearlos
        if (targetLeccionId && recursos.length > 0) {
          for (const recurso of recursos) {
            const getTipoRecursoId = (tipo: string) => {
              switch (tipo) {
                case "actividad": return 1;
                case "evaluacion": return 2;
                case "contenido": return 3;
                case "foro": return 5;
                default: return 3;
              }
            };

            await CreateRecurso(targetLeccionId, {
              id_recurso: 0,
              id_leccion: targetLeccionId,
              titulo: recurso.nombre || "Elemento sin título",
              id_tipo_recurso: getTipoRecursoId(recurso.tipoElemento),
              package_uuid: "",
              descripcion_html: recurso.descripcion || recurso.contenidoHtml || "",
              url: "",
              tipo_material: "",
              tipo_examen: "",
              file: recurso.archivo || null,
            });
          }
        }

        // 3. Refrescar cachés de React Query
        await queryClient.invalidateQueries({
          queryKey: [MODULOS_CURSOS.GET_MODULOS.key],
        });
        await queryClient.invalidateQueries({
          queryKey: [MODULOS_CURSOS.GET_LISTAR_RECURSOS_MODULO.key],
        });
      }

      onSave?.({
        nombreModulo: nombreModulo.trim(),
        ordenModulo,
        recursos,
      });

      handleClose();
    } catch (error) {
      console.error("Error al guardar el módulo y sus elementos:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const posicionesDisponibles = Array.from(
    { length: 12 },
    (_, i) => `Posición ${i + 1}`
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "20px",
            p: 0,
            overflow: "hidden",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
          },
        },
      }}
    >
      {/* HEADER DEL DIÁLOGO */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#111827", fontSize: "1.15rem", lineHeight: 1.2 }}
          >
            Agregar módulo
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.83rem", mt: 0.3 }}
          >
            Nuevo módulo para la materia
          </Typography>
        </Box>

        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: "#6B7280", p: 0.5, "&:hover": { backgroundColor: "#F3F4F6" } }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* CUERPO DEL DIÁLOGO */}
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.2 }}>
        {/* 1. Nombre del módulo * */}
        <TextField
          fullWidth
          size="small"
          label="Nombre del módulo *"
          placeholder="Ej. Módulo 11 — Ampliación"
          value={nombreModulo}
          onChange={(e) => setNombreModulo(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
              fontSize: "0.88rem",
            },
            "& .MuiInputLabel-root": { fontSize: "0.85rem" },
          }}
        />

        {/* 2. Orden del módulo * */}
        <FormControl fullWidth size="small">
          <InputLabel id="periodo-label">Orden del módulo *</InputLabel>
          <Select
            labelId="periodo-label"
            label="Orden del módulo *"
            value={ordenModulo}
            onChange={(e) => setOrdenModulo(e.target.value)}
            sx={{ borderRadius: "10px", fontSize: "0.88rem" }}
          >
            {posicionesDisponibles.map((pos) => (
              <MenuItem key={pos} value={pos} sx={{ fontSize: "0.85rem" }}>
                {pos}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ borderColor: "#E5E7EB", my: 0.5 }} />

        {/* 3. Botón Agregar elemento al módulo */}
        <Box>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon sx={{ fontSize: 18 }} />}
            onClick={handleOpenElemento}
            disabled={isSubmitting}
            sx={{
              border: "1px dashed #D1D5DB",
              backgroundColor: "#F9FAFB",
              color: "#374151",
              borderRadius: "12px",
              py: 1.1,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.85rem",
              "&:hover": {
                backgroundColor: "#F3F4F6",
                borderColor: "#9CA3AF",
              },
            }}
          >
            Agregar elemento al módulo
          </Button>

          <Typography
            variant="caption"
            sx={{
              color: "#6B7280",
              fontSize: "0.78rem",
              mt: 1,
              display: "block",
              lineHeight: 1.45,
            }}
          >
            Usa el mismo flujo de Contenido, Actividad, Foro o Evaluación disponible dentro de los módulos.
          </Typography>

          {/* LISTA DE ELEMENTOS AGREGADOS TEMPORALMENTE */}
          {recursos.length > 0 && (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", fontSize: "0.75rem" }}>
                Elementos adjuntos ({recursos.length}):
              </Typography>
              {recursos.map((rec, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 1.2,
                    px: 1.5,
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#FAFAFA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ overflow: "hidden" }}>
                    <Chip
                      label={rec.tipoLabel || rec.tipoElemento}
                      size="small"
                      sx={{
                        height: "20px",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        backgroundColor:
                          rec.tipoElemento === "contenido"
                            ? "#EEF2FF"
                            : rec.tipoElemento === "actividad"
                            ? "#F3E8FF"
                            : rec.tipoElemento === "foro"
                            ? "#E0F2FE"
                            : "#FEF3C7",
                        color:
                          rec.tipoElemento === "contenido"
                            ? "#2563EB"
                            : rec.tipoElemento === "actividad"
                            ? "#9333EA"
                            : rec.tipoElemento === "foro"
                            ? "#06B6D4"
                            : "#D97706",
                      }}
                    />
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ fontWeight: 600, fontSize: "0.82rem", color: "#1F2937", maxWidth: 180 }}
                    >
                      {rec.nombre || "Sin título"}
                    </Typography>
                  </Stack>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveElement(index)}
                    sx={{ color: "#9CA3AF", "&:hover": { color: "#EF4444" } }}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>
      </Box>

      {/* FOOTER DEL DIÁLOGO */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={isSubmitting}
            sx={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              color: "#374151",
              borderColor: "#E5E7EB",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              py: 1.1,
              fontSize: "0.88rem",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#D1D5DB",
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleGuardar}
            disabled={isSubmitting || !nombreModulo.trim()}
            startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
            sx={{
              flex: 1,
              backgroundColor: "#111827",
              color: "#FFFFFF",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              py: 1.1,
              fontSize: "0.88rem",
              "&:hover": {
                backgroundColor: "#1F2937",
              },
            }}
          >
            {isSubmitting ? "Guardando..." : "Guardar módulo"}
          </Button>
        </Stack>
      </Box>

      {/* DIÁLOGO SECUNDARIO: AGREGAR ELEMENTO */}
      <AgregarElementoDialog
        open={openElementoDialog}
        onClose={() => setOpenElementoDialog(false)}
        onSave={handleElementSaved}
        isFromModulo={true}
      />
    </Dialog>
  );
};
