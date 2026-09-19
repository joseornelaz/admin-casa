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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { AgregarElementoDialog } from "../AgregarElementoDialog/AgregarElementoDialog";

export interface AgregarModuloDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: { nombreModulo: string; ordenModulo: string }) => void;
  onAddElementToModule?: () => void;
}

export const AgregarModuloDialog: React.FC<AgregarModuloDialogProps> = ({
  open,
  onClose,
  onSave,
  onAddElementToModule,
}) => {
  const [nombreModulo, setNombreModulo] = useState<string>("");
  const [ordenModulo, setOrdenModulo] = useState<string>("Posición 1");
  const [openElementoDialog, setOpenElementoDialog] = useState<boolean>(false);

  const handleClose = () => {
    setNombreModulo("");
    setOrdenModulo("Posición 1");
    setOpenElementoDialog(false);
    onClose();
  };

  const handleOpenElemento = () => {
    if (onAddElementToModule) {
      onAddElementToModule();
    } else {
      setOpenElementoDialog(true);
    }
  };

  const handleGuardar = () => {
    if (onSave) {
      onSave({
        nombreModulo: nombreModulo.trim() || "Módulo Nuevo",
        ordenModulo,
      });
    }
    handleClose();
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
            sx={{ borderRadius: '10px', fontSize: "0.88rem" }}
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
            Guardar módulo
          </Button>
        </Stack>
      </Box>

      {/* DIÁLOGO SECUNDARIO: AGREGAR ELEMENTO */}
      <AgregarElementoDialog
        open={openElementoDialog}
        onClose={() => setOpenElementoDialog(false)}
      />
    </Dialog>
  );
};
