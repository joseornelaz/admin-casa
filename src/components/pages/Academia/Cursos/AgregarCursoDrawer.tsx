import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AgregarCursoDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export const AgregarCursoDrawer: React.FC<AgregarCursoDrawerProps> = ({
  open,
  onClose,
  onSave,
}) => {
  // Form State
  const [nombreCurso, setNombreCurso] = useState<string>("");
  const [periodo, setPeriodo] = useState<string>("Selecciona un periodo");
  const [seriacion, setSeriacion] = useState<string>("Sin seriación");
  const [ordenPeriodo, setOrdenPeriodo] = useState<string>("Periodo 1");

  // Planes de estudio / Años seleccionados (2025 y 2026 seleccionados por defecto como en la maqueta)
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

  const handleGuardar = () => {
    const cursoData = {
      nombreCurso,
      periodo,
      seriacion,
      rutasSeleccionadas,
      ordenPeriodo,
      ponderaciones: {
        contenido: { valor: contenidoVal, extra: contenidoExtra },
        actividades: { valor: actividadesVal, extra: actividadesExtra },
        foros: { valor: forosVal, extra: forosExtra },
        evaluaciones: { valor: evaluacionesVal, extra: evaluacionesExtra },
      },
    };

    if (onSave) {
      onSave(cursoData);
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
            Agregar Curso
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.82rem", mt: 0.2 }}
          >
            Nuevo curso para el programa
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

      {/* CONTENIDO COMPACTO DEL FORMULARIO */}
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
            sx={{ borderRadius: '10px', mb: 1.2 }}
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
            sx={{ borderRadius: '10px', mb: 1.2 }}
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
            sx={{ fontWeight: 700, color: "#374151", mb: 0.8, display: "block", fontSize: "0.78rem" }}
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
        <Box sx={{mt: 1.2}}>
          <FormControl fullWidth size="small">
            <InputLabel id="orden-periodo-label">Orden del período *</InputLabel>
            <Select
              labelId="orden-periodo-label"
              label="Orden del período *"
              value={ordenPeriodo}
              onChange={(e) => setOrdenPeriodo(e.target.value)}
              sx={{ borderRadius: '10px' }}
            >
              <MenuItem value="Periodo 1" sx={{ fontSize: "0.85rem" }}>Periodo 1</MenuItem>
              <MenuItem value="Periodo 2" sx={{ fontSize: "0.85rem" }}>Periodo 2</MenuItem>
              <MenuItem value="Periodo 3" sx={{ fontSize: "0.85rem" }}>Periodo 3</MenuItem>
              <MenuItem value="Periodo 4" sx={{ fontSize: "0.85rem" }}>Periodo 4</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontSize: "0.73rem", mt: 0.4, display: "block" }}
          >
            Define en qué orden se cursará la materia dentro del plan seleccionado.
          </Typography>
        </Box>

        {/* 6. Ponderaciones * */}
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 0.8 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#374151", fontSize: "0.82rem" }}>
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
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}>
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
                    <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.76rem" }}>
                      Puntos extra
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />

                <TextField
                  value={contenidoVal}
                  onChange={(e) => setContenidoVal(e.target.value)}
                  sx={{
                    width: "65px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}>
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
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}>
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
                    <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.76rem" }}>
                      Puntos extra
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />

                <TextField
                  value={actividadesVal}
                  onChange={(e) => setActividadesVal(e.target.value)}
                  sx={{
                    width: "65px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}>
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
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}>
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
                    <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.76rem" }}>
                      Puntos extra
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />

                <TextField
                  value={forosVal}
                  onChange={(e) => setForosVal(e.target.value)}
                  sx={{
                    width: "65px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}>
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
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}>
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
                    <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.76rem" }}>
                      Puntos extra
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />

                <TextField
                  value={evaluacionesVal}
                  onChange={(e) => setEvaluacionesVal(e.target.value)}
                  sx={{
                    width: "65px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}>
                  %
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* 7. TARJETA INFORMATIVA */}
        <Box
          sx={{
            backgroundColor: "#F9FAFB",
            border: "1px solid #F3F4F6",
            borderRadius: "10px",
            p: 1.5,
            mt: 0.2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: "0.78rem", lineHeight: 1.45 }}
          >
            El curso se creará dentro del programa actualmente seleccionado. Podrás agregar módulos y contenido después de crearlo.
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
            Guardar Curso
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};
