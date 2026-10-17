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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { CreateModuloPayload, Curso } from "../../../../types/Cursos.interface";
import {
  CreateCurso,
  CreateModulo,
  DeleteModulo,
  GetModulosByCursoId,
  UpdateCurso,
  UpdateModulo,
} from "../../../../services/CursosService";
import { CURSOS } from "../../../../types/endpoints";

export interface ModuleItem {
  id: string;
  title: string;
}

export interface CursoDrawerProps {
  open: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  cursoData?: Curso | null;
  onSave?: (data: any) => void;
}

export const CursoDrawer: React.FC<CursoDrawerProps> = ({
  open,
  onClose,
  mode,
  cursoData,
  onSave,
}) => {
  const queryClient = useQueryClient();
  const isEdit = mode ? mode === "edit" : Boolean(cursoData);

  // 1. Form State (Campos principales del Curso)
  const [nombreCurso, setNombreCurso] = useState<string>("");
  const [periodo, setPeriodo] = useState<string>("Selecciona un periodo");
  const [seriacion, setSeriacion] = useState<string>("Sin seriación");
  const [ordenPeriodo, setOrdenPeriodo] = useState<string>("Periodo 1");
  const [estado, setEstado] = useState<string>("Publicado");
  const [horas, setHoras] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");

  // Planes de estudio / Años seleccionados
  const [rutasSeleccionadas, setRutasSeleccionadas] = useState<string[]>([
    "2025",
    "2026",
  ]);

  const aosDisponibles = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];

  const toggleRuta = (ano: string) => {
    if (rutasSeleccionadas.includes(ano)) {
      setRutasSeleccionadas(rutasSeleccionadas.filter((item) => item !== ano));
    } else {
      setRutasSeleccionadas([...rutasSeleccionadas, ano]);
    }
  };

  const handleHorasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setHoras(val);
    }
  };

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^0-9.]/g, "");
    const parts = raw.split(".");
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;

    if (parts[0]) {
      parts[0] = parseInt(parts[0], 10).toLocaleString("en-US");
    }
    const formatted = parts.join(".");
    setPrecio(formatted);
  };

  const formatInitialPrice = (val?: string | number) => {
    if (val === undefined || val === null || val === "") return "";
    const str = String(val).replace(/[^0-9.]/g, "");
    const parts = str.split(".");
    if (parts[0]) {
      parts[0] = parseInt(parts[0], 10).toLocaleString("en-US");
    }
    return parts.join(".");
  };

  // Ponderaciones State
  const [contenidoVal, setContenidoVal] = useState<number | string>(20);
  const [contenidoExtra, setContenidoExtra] = useState<boolean>(false);

  const [actividadesVal, setActividadesVal] = useState<number | string>(20);
  const [actividadesExtra, setActividadesExtra] = useState<boolean>(false);

  const [forosVal, setForosVal] = useState<number | string>(20);
  const [forosExtra, setForosExtra] = useState<boolean>(false);

  const [evaluacionesVal, setEvaluacionesVal] = useState<number | string>(40);
  const [evaluacionesExtra, setEvaluacionesExtra] = useState<boolean>(false);

  // Suma total de ponderaciones
  const totalPonderacion =
    (Number(contenidoVal) || 0) +
    (Number(actividadesVal) || 0) +
    (Number(forosVal) || 0) +
    (Number(evaluacionesVal) || 0);

  // 2. Módulos State (solo aplicable a modo edición)
  const [modulos, setModulos] = useState<ModuleItem[]>([]);
  const [nuevoModuloNombre, setNuevoModuloNombre] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const courseId = cursoData?.id_curso || 0;

  // Consulta los módulos reales asociados al ID del curso actual (solo cuando esté en edición)
  const { data: modulosData, isLoading: isModulosLoading } = GetModulosByCursoId(
    courseId,
    { enabled: Boolean(open && isEdit && courseId) }
  );

  // Sincroniza campos al abrir el drawer o cambiar el curso seleccionado
  useEffect(() => {
    if (open) {
      if (isEdit && cursoData) {
        setNombreCurso(cursoData.titulo || "");
        setPeriodo((cursoData as any).periodo || "Ene-Jun 2026");
        setSeriacion((cursoData as any).seriacion || "Sin seriación");
        setOrdenPeriodo((cursoData as any).ordenPeriodo || "Periodo 1");
        setEstado(cursoData.estado_curso || "Publicado");
        setHoras(
          cursoData.horas !== undefined && cursoData.horas !== null
            ? String(cursoData.horas)
            : ""
        );
        setPrecio(formatInitialPrice(cursoData.precio));

        // Rutas
        if (
          (cursoData as any).rutasSeleccionadas &&
          Array.isArray((cursoData as any).rutasSeleccionadas)
        ) {
          setRutasSeleccionadas((cursoData as any).rutasSeleccionadas);
        } else {
          setRutasSeleccionadas(["2025", "2026"]);
        }

        // Ponderaciones
        const pond = (cursoData as any).ponderaciones;
        if (pond) {
          setContenidoVal(pond.contenido?.valor ?? 20);
          setContenidoExtra(Boolean(pond.contenido?.extra));
          setActividadesVal(pond.actividades?.valor ?? 20);
          setActividadesExtra(Boolean(pond.actividades?.extra));
          setForosVal(pond.foros?.valor ?? 20);
          setForosExtra(Boolean(pond.foros?.extra));
          setEvaluacionesVal(pond.evaluaciones?.valor ?? 40);
          setEvaluacionesExtra(Boolean(pond.evaluaciones?.extra));
        } else {
          setContenidoVal(20);
          setContenidoExtra(false);
          setActividadesVal(20);
          setActividadesExtra(false);
          setForosVal(20);
          setForosExtra(false);
          setEvaluacionesVal(40);
          setEvaluacionesExtra(false);
        }
      } else {
        // Reset a valores por defecto para nuevo curso
        setNombreCurso("");
        setPeriodo("Selecciona un periodo");
        setSeriacion("Sin seriación");
        setOrdenPeriodo("Periodo 1");
        setEstado("Publicado");
        setHoras("");
        setPrecio("");
        setRutasSeleccionadas(["2025", "2026"]);
        setContenidoVal(20);
        setContenidoExtra(false);
        setActividadesVal(20);
        setActividadesExtra(false);
        setForosVal(20);
        setForosExtra(false);
        setEvaluacionesVal(40);
        setEvaluacionesExtra(false);
        setModulos([]);
        setNuevoModuloNombre("");
      }
    }
  }, [open, isEdit, cursoData]);

  // Sincroniza la lista de módulos con los datos obtenidos de la API en modo edición
  useEffect(() => {
    if (open && isEdit && modulosData) {
      const formattedModules: ModuleItem[] = modulosData.map((m) => ({
        id: String(m.id_modulo),
        title: m.titulo,
      }));
      setModulos(formattedModules);
    } else if (open && !courseId) {
      setModulos([]);
    }
  }, [open, isEdit, modulosData, courseId]);

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
    try {
      setIsSaving(true);

      const cursoPayload: Partial<Curso> = {
        ...(isEdit && cursoData ? cursoData : {}),
        titulo: nombreCurso,
        horas: horas ? parseFloat(horas) : 0,
        precio: precio.replace(/,/g, ""),
        estado_curso: estado,
        ...({
          periodo,
          seriacion,
          rutasSeleccionadas,
          ordenPeriodo,
          ponderaciones: {
            contenido: { valor: Number(contenidoVal) || 0, extra: contenidoExtra },
            actividades: { valor: Number(actividadesVal) || 0, extra: actividadesExtra },
            foros: { valor: Number(forosVal) || 0, extra: forosExtra },
            evaluaciones: { valor: Number(evaluacionesVal) || 0, extra: evaluacionesExtra },
          },
        } as any),
      };

      if (isEdit && cursoData?.id_curso) {
        // 1. Actualizar datos del curso
        await UpdateCurso(cursoData.id_curso, cursoPayload);

        // 2. Gestionar módulos (eliminación, creación y orden)
        const modulosOriginales = modulosData || [];
        const idsOriginales = new Set(modulosOriginales.map((m) => String(m.id_modulo)));
        const idsActuales = new Set(modulos.map((m) => m.id));

        const modulosAEliminar = modulosOriginales.filter(
          (m) => !idsActuales.has(String(m.id_modulo))
        );

        const deletePromises = modulosAEliminar.map((m) =>
          DeleteModulo(m.id_modulo)
        );

        const modulosGuardarPromises = modulos.map((mod, index) => {
          const orden = index + 1;

          if (idsOriginales.has(mod.id)) {
            return UpdateModulo(Number(mod.id), {
              titulo: mod.title,
              orden: orden,
              descripcion:
                modulosOriginales.find((m) => String(m.id_modulo) === mod.id)?.descripcion || "",
            });
          } else {
            const payload: CreateModuloPayload = {
              id_modulo: 0,
              id_curso: cursoData.id_curso,
              titulo: mod.title,
              orden: orden,
            };
            return CreateModulo(cursoData.id_curso, payload);
          }
        });

        await Promise.all([...deletePromises, ...modulosGuardarPromises]);
      } else {
        // Modo Creación
        await CreateCurso(cursoPayload);
      }

      await queryClient.invalidateQueries({
        queryKey: [CURSOS.GET_CURSOS.key],
      });
      await queryClient.invalidateQueries({
        queryKey: [CURSOS.GET_CURSOS_BY_PLAN.key],
      });

      if (onSave) {
        onSave(cursoPayload);
      }

      onClose();
    } catch (error) {
      console.error(
        isEdit
          ? "Error al guardar los cambios del curso:"
          : "Error al crear el curso:",
        error
      );
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
          py: 1.8,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#111827", fontSize: "1.1rem", lineHeight: 1.2 }}
          >
            {isEdit ? "Editar Curso" : "Agregar Curso"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.82rem", mt: 0.2 }}
          >
            {isEdit
              ? "Edita la información del curso y gestiona sus módulos"
              : "Nuevo curso para el programa"}
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
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.6,
        }}
      >
        {/* 1. Nombre del curso * */}
        <TextField
          fullWidth
          size="small"
          label="Nombre del curso *"
          placeholder="Ej. Fundamentos de Administración"
          value={nombreCurso}
          onChange={(e) => setNombreCurso(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
            },
          }}
        />

        {/* 2. Periodo al que corresponde * */}
        <FormControl fullWidth size="small">
          <InputLabel id="periodo-label">Periodo al que corresponde *</InputLabel>
          <Select
            labelId="periodo-label"
            label="Periodo al que corresponde *"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            sx={{ borderRadius: "10px" }}
          >
            <MenuItem value="Selecciona un periodo">Selecciona un periodo</MenuItem>
            <MenuItem value="Ene-Jun 2026">Ene-Jun 2026</MenuItem>
            <MenuItem value="Jul-Dic 2026">Jul-Dic 2026</MenuItem>
            <MenuItem value="Ene-Jun 2027">Ene-Jun 2027</MenuItem>
          </Select>
        </FormControl>

        {/* 3. Seriación */}
        <FormControl fullWidth size="small">
          <InputLabel id="seriacion-label">Seriación</InputLabel>
          <Select
            labelId="seriacion-label"
            label="Seriación"
            value={seriacion}
            onChange={(e) => setSeriacion(e.target.value)}
            sx={{ borderRadius: "10px" }}
          >
            <MenuItem value="Sin seriación" sx={{ fontSize: "0.85rem" }}>
              Sin seriación
            </MenuItem>
            <MenuItem value="Seriación directa" sx={{ fontSize: "0.85rem" }}>
              Seriación directa
            </MenuItem>
            <MenuItem value="Seriación por créditos" sx={{ fontSize: "0.85rem" }}>
              Seriación por créditos
            </MenuItem>
          </Select>
        </FormControl>

        {/* 4. Ruta — planes de estudio en los que estará disponible * */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: "#374151",
              mb: 0.8,
              display: "block",
              fontSize: "0.78rem",
            }}
          >
            Ruta — planes de estudio en los que estará disponible *
          </Typography>

          <Stack direction="row" spacing={0.8} flexWrap="nowrap" alignItems="center">
            {aosDisponibles.map((ano) => {
              const isSelected = rutasSeleccionadas.includes(ano);
              return (
                <Box
                  key={ano}
                  onClick={() => toggleRuta(ano)}
                  sx={{
                    px: 1.6,
                    py: 0.4,
                    borderRadius: "18px",
                    cursor: "pointer",
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: "0.82rem",
                    transition: "all 0.15s ease",
                    backgroundColor: "#FFFFFF",
                    color: isSelected ? "#2563EB" : "#4B5563",
                    border: isSelected ? "1.5px solid #2563EB" : "1px solid #D1D5DB",
                    "&:hover": {
                      borderColor: isSelected ? "#1D4ED8" : "#9CA3AF",
                    },
                  }}
                >
                  {ano}
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* 5. Orden del período * */}
        <Box>
          <FormControl fullWidth size="small">
            <InputLabel id="orden-periodo-label">Orden del período *</InputLabel>
            <Select
              labelId="orden-periodo-label"
              label="Orden del período *"
              value={ordenPeriodo}
              onChange={(e) => setOrdenPeriodo(e.target.value)}
              sx={{ borderRadius: "10px" }}
            >
              <MenuItem value="Periodo 1" sx={{ fontSize: "0.85rem" }}>
                Periodo 1
              </MenuItem>
              <MenuItem value="Periodo 2" sx={{ fontSize: "0.85rem" }}>
                Periodo 2
              </MenuItem>
              <MenuItem value="Periodo 3" sx={{ fontSize: "0.85rem" }}>
                Periodo 3
              </MenuItem>
              <MenuItem value="Periodo 4" sx={{ fontSize: "0.85rem" }}>
                Periodo 4
              </MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontSize: "0.73rem", mt: 0.4, display: "block" }}
          >
            Define en qué orden se cursará la materia dentro del plan seleccionado.
          </Typography>
        </Box>

        {/* 6. Estado * */}
        <FormControl fullWidth size="small">
          <InputLabel id="estado-label">Estado *</InputLabel>
          <Select
            labelId="estado-label"
            label="Estado *"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            sx={{ borderRadius: "10px" }}
          >
            <MenuItem value="Publicado" sx={{ fontSize: "0.85rem" }}>
              Publicado
            </MenuItem>
            <MenuItem value="Borrador" sx={{ fontSize: "0.85rem" }}>
              Borrador
            </MenuItem>
            <MenuItem value="Archivado" sx={{ fontSize: "0.85rem" }}>
              Archivado
            </MenuItem>
          </Select>
        </FormControl>

        {/* 7. Horas y Precio */}
        <Stack direction="row" spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            label="Horas"
            placeholder="Ej. 40.00"
            value={horas}
            onChange={handleHorasChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
              },
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Precio"
            placeholder="0.00"
            value={precio}
            onChange={handlePrecioChange}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              },
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
              },
              "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                transform: "translate(14px, -9px) scale(0.75) !important",
              },
            }}
          />
        </Stack>

        {/* 8. Ponderaciones * */}
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 0.8 }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "#374151", fontSize: "0.82rem" }}
            >
              Ponderaciones *
            </Typography>

            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: totalPonderacion === 100 ? "#16A34A" : "#D97706",
                fontSize: "0.82rem",
              }}
            >
              {totalPonderacion}% / 100%
            </Typography>
          </Stack>

          <Stack spacing={0.8}>
            {/* Contenido */}
            <Box
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                py: 0.8,
                px: 1.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}
              >
                Contenido
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={contenidoExtra}
                      onChange={(e) => setContenidoExtra(e.target.checked)}
                      sx={{ p: 0.3 }}
                    />
                  }
                  label={
                    <Typography
                      variant="caption"
                      sx={{ color: "#6B7280", fontSize: "0.76rem" }}
                    >
                      Puntos extra
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />

                <TextField
                  size="small"
                  value={contenidoVal}
                  onChange={(e) => setContenidoVal(e.target.value)}
                  sx={{
                    width: "65px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}
                >
                  %
                </Typography>
              </Stack>
            </Box>

            {/* Actividades */}
            <Box
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                py: 0.8,
                px: 1.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}
              >
                Actividades
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={actividadesExtra}
                      onChange={(e) => setActividadesExtra(e.target.checked)}
                      sx={{ p: 0.3 }}
                    />
                  }
                  label={
                    <Typography
                      variant="caption"
                      sx={{ color: "#6B7280", fontSize: "0.76rem" }}
                    >
                      Puntos extra
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />

                <TextField
                  size="small"
                  value={actividadesVal}
                  onChange={(e) => setActividadesVal(e.target.value)}
                  sx={{
                    width: "65px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}
                >
                  %
                </Typography>
              </Stack>
            </Box>

            {/* Foros */}
            <Box
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                py: 0.8,
                px: 1.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}
              >
                Foros
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={forosExtra}
                      onChange={(e) => setForosExtra(e.target.checked)}
                      sx={{ p: 0.3 }}
                    />
                  }
                  label={
                    <Typography
                      variant="caption"
                      sx={{ color: "#6B7280", fontSize: "0.76rem" }}
                    >
                      Puntos extra
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />

                <TextField
                  size="small"
                  value={forosVal}
                  onChange={(e) => setForosVal(e.target.value)}
                  sx={{
                    width: "65px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}
                >
                  %
                </Typography>
              </Stack>
            </Box>

            {/* Evaluaciones */}
            <Box
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                py: 0.8,
                px: 1.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}
              >
                Evaluaciones
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={evaluacionesExtra}
                      onChange={(e) => setEvaluacionesExtra(e.target.checked)}
                      sx={{ p: 0.3 }}
                    />
                  }
                  label={
                    <Typography
                      variant="caption"
                      sx={{ color: "#6B7280", fontSize: "0.76rem" }}
                    >
                      Puntos extra
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />

                <TextField
                  size="small"
                  value={evaluacionesVal}
                  onChange={(e) => setEvaluacionesVal(e.target.value)}
                  sx={{
                    width: "65px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}
                >
                  %
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* 9. SECCIÓN MÓDULOS (Solo en modo Edición) */}
        {isEdit && (
          <Box sx={{ mt: 1 }}>
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
        )}

        {/* 10. AGREGAR MÓDULO ROW (Solo en modo Edición) */}
        {isEdit && (
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
        )}

        {/* 11. TARJETA INFORMATIVA */}
        <Box
          sx={{
            backgroundColor: "#F9FAFB",
            border: "1px solid #F3F4F6",
            borderRadius: "10px",
            p: 1.8,
            mt: 0.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.8rem", lineHeight: 1.5 }}
          >
            {isEdit
              ? 'La "Información de la materia" y los "Elementos Audiovisuales" ahora se gestionan fuera de los módulos, a nivel de la materia.'
              : "El curso se creará dentro del programa actualmente seleccionado. Podrás agregar módulos y contenido después de crearlo."}
          </Typography>
        </Box>
      </Box>

      {/* FOOTER FIXED CON BOTONES CANCELAR Y GUARDAR CURSO */}
      <Box
        sx={{
          px: 3,
          py: 1.8,
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSaving}
            sx={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              color: "#374151",
              borderColor: "#E5E7EB",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              py: 0.9,
              fontSize: "0.85rem",
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
            disabled={isSaving}
            startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{
              flex: 1,
              backgroundColor: "#111827",
              color: "#FFFFFF",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              py: 0.9,
              fontSize: "0.85rem",
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

export default CursoDrawer;
