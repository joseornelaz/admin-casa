import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { CreateModuloPayload, Curso } from "../../../../types/Cursos.interface";
import { CreateModulo, DeleteModulo, GetModulosByCursoId, UpdateCurso, UpdateModulo } from "../../../../services/CursosService";
import { CURSOS } from "../../../../types/endpoints";

export interface ModuleItem {
  id: string;
  title: string;
}

interface EditarCursoDrawerProps {
  open: boolean;
  onClose: () => void;
  cursoData?: Curso | null;
}

export const EditarCursoDrawer: React.FC<EditarCursoDrawerProps> = ({
  open,
  onClose,
  cursoData,
}) => {
  const queryClient = useQueryClient();
  const [nombreCurso, setNombreCurso] = useState<string>("");
  const [modulos, setModulos] = useState<ModuleItem[]>([]);
  const [nuevoModuloNombre, setNuevoModuloNombre] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const courseId = cursoData?.id_curso || 0;

  // Consulta los módulos reales asociados al ID del curso actual
  const { data: modulosData, isLoading: isModulosLoading } = GetModulosByCursoId(
    courseId,
    { enabled: Boolean(open && courseId) }
  );

  // Sincroniza el nombre del curso al abrir el drawer o cambiar el curso seleccionado
  useEffect(() => {
    if (open) {
      setNombreCurso(cursoData?.titulo || "");
    }
  }, [open, cursoData]);

  // Sincroniza la lista de módulos con los datos obtenidos de la API
  useEffect(() => {
    if (open && modulosData) {
      const formattedModules: ModuleItem[] = modulosData.map((m) => ({
        id: String(m.id_modulo),
        title: m.titulo,
      }));
      setModulos(formattedModules);
    } else if (open && !courseId) {
      setModulos([]);
    }
  }, [open, modulosData, courseId]);

  const handleAgregarModulo = () => {
    if (!nuevoModuloNombre.trim()) return;
    const newMod: ModuleItem = {
      id: Date.now().toString(),
      title: nuevoModuloNombre.trim(),
    };
    setModulos([...modulos, newMod]);
    setNuevoModuloNombre("");
  };

  const handleEliminarModulo = (id: string) => {
    setModulos(modulos.filter((m) => m.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...modulos];
    const temp = newArr[index - 1];
    newArr[index - 1] = newArr[index];
    newArr[index] = temp;
    setModulos(newArr);
  };

  const handleMoveDown = (index: number) => {
    if (index === modulos.length - 1) return;
    const newArr = [...modulos];
    const temp = newArr[index + 1];
    newArr[index + 1] = newArr[index];
    newArr[index] = temp;
    setModulos(newArr);
  };

  const handleGuardar = async () => {
    if (!cursoData?.id_curso) return;

    try {
      setIsSaving(true);

      // 1. Actualizar título del curso
      await UpdateCurso(cursoData.id_curso, {...cursoData, titulo: nombreCurso });

      // 2. Obtener IDs originales del backend
      const modulosOriginales = modulosData || [];
      const idsOriginales = new Set(modulosOriginales.map((m) => String(m.id_modulo)));
      const idsActuales = new Set(modulos.map((m) => m.id));

      // A) Módulos a eliminar (estaban en el backend pero ya no están en el estado local)
      const modulosAEliminar = modulosOriginales.filter(
        (m) => !idsActuales.has(String(m.id_modulo))
      );

      // Ejecutar eliminaciones
      const deletePromises = modulosAEliminar.map((m) =>
        DeleteModulo(m.id_modulo)
      );

      // B) Módulos a crear o actualizar con su nuevo orden
      const modulosGuardarPromises = modulos.map((mod, index) => {
        const orden = index + 1; // Índice basándonos en la posición actual

        if (idsOriginales.has(mod.id)) {
          // Módulo existente -> UPDATE
          return UpdateModulo(Number(mod.id), {
            titulo: mod.title,
            orden: orden,
            descripcion: modulosOriginales.find((m) => String(m.id_modulo) === mod.id)?.descripcion || "",
          });
        } else {
          // Módulo nuevo (creado con Date.now()) -> CREATE
          const payload: CreateModuloPayload = {
            id_modulo: 0, // O omitir si el backend lo autogenera
            id_curso: cursoData.id_curso,
            titulo: mod.title,
            orden: orden,
          };
          return CreateModulo(cursoData.id_curso, payload);
        }
      });

      // 3. Ejecutar todas las peticiones en paralelo
      await Promise.all([
        ...deletePromises,
        ...modulosGuardarPromises,
      ]);
      
      await queryClient.invalidateQueries({
        queryKey: [CURSOS.GET_CURSOS.key],
      });

      onClose();
    } catch (error) {
      console.error("Error al guardar los cambios del curso:", error);
      // Aquí puedes disparar una notificación / Toast de error
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: "540px", md: "580px" },
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            display: "flex",
            flexDirection: "column",
            p: 0,
            boxShadow: "-8px 0px 24px rgba(0, 0, 0, 0.12)",
          },
        },
      }}
    >
      {/* HEADER DEL SIDENAV */}
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
            Editar Curso
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.83rem", mt: 0.3 }}
          >
            Edita el curso y su lista de módulos
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "#6B7280", p: 0.5, "&:hover": { backgroundColor: "#F3F4F6" } }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* CONTENIDO DEL FORMULARIO CON SCROLL */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          py: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        {/* 1. Nombre del curso */}
        <TextField
          fullWidth
          label="Nombre del curso"
          value={nombreCurso}
          onChange={(e) => setNombreCurso(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "#F9FAFB",
              fontSize: "0.88rem",
            },
            "& .MuiInputLabel-root": { fontSize: "0.85rem" },
          }}
          size="small"
        />

        {/* 2. Sección Módulos (count) */}
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#374151", mb: 1.5, fontSize: "0.88rem" }}
          >
            Módulos ({modulos.length})
          </Typography>

          {isModulosLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={28} sx={{ color: "#111827" }} />
            </Box>
          ) : modulos.length === 0 ? (
            <Box
              sx={{
                p: 3,
                textAlign: "center",
                border: "1px dashed #D1D5DB",
                borderRadius: "10px",
                backgroundColor: "#F9FAFB",
              }}
            >
              <Typography variant="body2" sx={{ color: "#9CA3AF", fontSize: "0.85rem" }}>
                No hay módulos registrados en este curso.
              </Typography>
            </Box>
          ) : (
            /* LISTA DE MÓDULOS */
            <Stack spacing={1.2}>
              {modulos.map((mod, index) => (
                <Box
                  key={mod.id}
                  sx={{
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "10px",
                    py: 1,
                    px: 1.8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      backgroundColor: "#FFFFFF",
                      borderColor: "#D1D5DB",
                      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  {/* Lado Izquierdo: Controles de Reordenar + Título del Módulo */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Stack direction="column" spacing={-0.3} sx={{ color: "#9CA3AF" }}>
                      {index > 0 ? (
                        <Tooltip title="Subir">
                          <IconButton
                            size="small"
                            onClick={() => handleMoveUp(index)}
                            sx={{ p: 0, color: "#6B7280" }}
                          >
                            <KeyboardArrowUpIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Tooltip>
                      ) : null}

                      {index < modulos.length - 1 ? (
                        <Tooltip title="Bajar">
                          <IconButton
                            size="small"
                            onClick={() => handleMoveDown(index)}
                            sx={{ p: 0, color: "#6B7280" }}
                          >
                            <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Tooltip>
                      ) : null}

                      {modulos.length === 1 && (
                        <UnfoldMoreIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
                      )}
                    </Stack>

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}
                    >
                      {mod.title}
                    </Typography>
                  </Stack>

                  {/* Lado Derecho: Botón Eliminar */}
                  <Tooltip title="Eliminar módulo">
                    <IconButton
                      size="small"
                      onClick={() => handleEliminarModulo(mod.id)}
                      sx={{
                        color: "#6B7280",
                        p: 0.5,
                        "&:hover": { color: "#EF4444", backgroundColor: "#FEF2F2" },
                      }}
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        {/* 3. AGREGAR MÓDULO ROW */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Nombre del nuevo módulo..."
            value={nuevoModuloNombre}
            onChange={(e) => setNuevoModuloNombre(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAgregarModulo();
              }
            }}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                fontSize: "0.85rem",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleAgregarModulo}
            sx={{
              backgroundColor: "#111827",
              color: "#FFFFFF",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              px: 2.2,
              py: 0.9,
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#1F2937",
              },
            }}
          >
            + Agregar módulo
          </Button>
        </Stack>

        {/* 4. TARJETA INFORMATIVA */}
        <Box
          sx={{
            backgroundColor: "#F9FAFB",
            border: "1px solid #F3F4F6",
            borderRadius: "10px",
            p: 2,
            mt: 0.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.8rem", lineHeight: 1.5 }}
          >
            La "Información de la materia" y los "Elementos Audiovisuales" ahora se gestionan fuera de los módulos, a nivel de la materia.
          </Typography>
        </Box>
      </Box>

      {/* FOOTER FIXED CON BOTONES CANCELAR Y GUARDAR CURSO */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={onClose}
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
            startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : null}
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
            {isSaving ? "Guardando..." : "Guardar Curso"}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};
