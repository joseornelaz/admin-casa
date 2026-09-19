import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface ModuleItem {
  id: string;
  title: string;
}

interface EditarCursoDrawerProps {
  open: boolean;
  onClose: () => void;
  cursoData?: {
    id?: string;
    title?: string;
    modules?: ModuleItem[];
  };
  onSave?: (data: any) => void;
}

const DEFAULT_MODULES: ModuleItem[] = [
  { id: "1", title: "Módulo 1 — Introducción" },
  { id: "2", title: "Módulo 2 — Marco Conceptual" },
  { id: "3", title: "Módulo 3 — Diagnóstico" },
  { id: "4", title: "Módulo 4 — Desarrollo I" },
  { id: "5", title: "Módulo 5 — Desarrollo II" },
  { id: "6", title: "Módulo 6 — Práctica Aplicada" },
  { id: "7", title: "Módulo 7 — Evaluación Intermedia" },
  { id: "8", title: "Módulo 8 — Síntesis" },
  { id: "9", title: "Módulo de Cierre" },
];

export const EditarCursoDrawer: React.FC<EditarCursoDrawerProps> = ({
  open,
  onClose,
  cursoData,
  onSave,
}) => {
  const [nombreCurso, setNombreCurso] = useState<string>(
    cursoData?.title || "Introducción a la Administración de Empresas"
  );
  const [modulos, setModulos] = useState<ModuleItem[]>(
    cursoData?.modules || DEFAULT_MODULES
  );
  const [nuevoModuloNombre, setNuevoModuloNombre] = useState<string>("");

  useEffect(() => {
    if (cursoData?.title) setNombreCurso(cursoData.title);
    if (cursoData?.modules) setModulos(cursoData.modules);
  }, [cursoData]);

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

  const handleGuardar = () => {
    if (onSave) {
      onSave({
        nombreCurso,
        modulos,
      });
    }
    onClose();
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

          {/* LISTA DE MÓDULOS */}
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
            Guardar Curso
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};
