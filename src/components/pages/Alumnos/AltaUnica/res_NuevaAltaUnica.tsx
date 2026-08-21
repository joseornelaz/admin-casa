import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  FormControlLabel,
  IconButton,
  Divider,
  Chip,
  Tooltip,
  Grid,
  Dialog,
  DialogContent,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths } from "@constants";

interface RedSocialItem {
  id: string;
  link: string;
  network: string;
}

interface TelefonoItem {
  id: string;
  number: string;
  type: string;
}

export const NuevaAltaUnica: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(4);

  // Dialogs States
  const [openValidationDialog, setOpenValidationDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  // States para Acordeón Documentación Escolar (Items 4, 5, 6)
  const [openDoc4, setOpenDoc4] = useState<boolean>(false);
  const [openDoc5, setOpenDoc5] = useState<boolean>(false);
  const [openDoc6, setOpenDoc6] = useState<boolean>(false);

  // Form State - Step 1: Datos Personales
  const [nombre, setNombre] = useState<string>("Maria Elena");
  const [apellidoPaterno, setApellidoPaterno] = useState<string>("Garcia");
  const [apellidoMaterno, setApellidoMaterno] = useState<string>("López");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [curp, setCurp] = useState<string>("GARX001201MDFLPR09");
  const [correo, setCorreo] = useState<string>("alumno@correo.com");
  const [telefono, setTelefono] = useState<string>("55 1234 5678");
  const [genero, setGenero] = useState<string>("Seleccionar..");

  // Form State - Step 1: Datos Laborales
  const [corporacion, setCorporacion] = useState<string>("Coppel");
  const [asociacion, setAsociacion] = useState<string>("Asociación");
  const [empresa, setEmpresa] = useState<string>("Empresa");
  const [programaAcademico, setProgramaAcademico] = useState<string>("Licenciatura");
  const [rutaEstudios, setRutaEstudios] = useState<string>("Licenciatura Coppel 2020");
  const [tipoUsuario, setTipoUsuario] = useState<string>("Seleccionar...");
  const [estado, setEstado] = useState<string>("Ciudad de México");
  const [ciudad, setCiudad] = useState<string>("Miguel Hidalgo");
  const [centro, setCentro] = useState<string>("Tacuba");
  const [region, setRegion] = useState<string>("IZTP");
  const [puesto, setPuesto] = useState<string>("Seleccionar puesto...");

  // Form State - Step 1: Datos de Contacto
  const [calle, setCalle] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [colonia, setColonia] = useState<string>("");
  const [delegacion, setDelegacion] = useState<string>("");
  const [cp, setCp] = useState<string>("");
  const [correoEmpresa, setCorreoEmpresa] = useState<string>("");

  const [redesSociales, setRedesSociales] = useState<RedSocialItem[]>([
    { id: "1", link: "", network: "Facebook" },
    { id: "2", link: "", network: "Instagram" },
  ]);

  const [telefonos, setTelefonos] = useState<TelefonoItem[]>([
    { id: "1", number: "", type: "WhatsApp" },
  ]);

  const [horariosLlamada, setHorariosLlamada] = useState<{ [key: string]: boolean }>({
    mornings: false,
    afternoons: false,
    evenings: false,
  });

  const [accesoInternet, setAccesoInternet] = useState<{ [key: string]: boolean }>({
    datos: false,
    ethernet: false,
    general: false,
  });

  // Form State - Step 1: Notas y Observaciones
  const [elegible, setElegible] = useState<string>("Selecciona...");
  const [interesado, setInteresado] = useState<string>("Selecciona...");
  const [campana, setCampana] = useState<string>("Selecciona campaña...");
  const [responsable, setResponsable] = useState<string>("Selecciona asesor responsable...");
  const [comentarios, setComentarios] = useState<string>("");

  // Form State - Step 2: Documentos
  const [rutaFormacion, setRutaFormacion] = useState<string>("Seleccionar ruta...");
  const [modalidadExpediente, setModalidadExpediente] = useState<string>("Físico/Digital/Físico y Digital");
  const [estatusRecepcion, setEstatusRecepcion] = useState<string>("En caso de ser Físico, especificar el estatus de la recepción");

  // Form State - Step 3: Inscripción
  const [insRutaFormacion, setInsRutaFormacion] = useState<string>("Seleccionar ruta...");
  const [insGeneracion, setInsGeneracion] = useState<string>("Seleccionar generación...");
  const [insPeriodo, setInsPeriodo] = useState<string>("PERIODO-0001 · 1-30 Sep 2025");

  // Document Fields States
  const [doc1Accion, setDoc1Accion] = useState<string>("Validar");
  const [doc1Condicion, setDoc1Condicion] = useState<string>("Aceptable");
  const [doc1Obs, setDoc1Obs] = useState<string>("");

  const [doc2Accion, setDoc2Accion] = useState<string>("Rechazar");
  const [doc2Condicion, setDoc2Condicion] = useState<string>("Dañado");
  const [doc2Obs, setDoc2Obs] = useState<string>("El documento no es original y está borroso");

  const [doc3Condicion, setDoc3Condicion] = useState<string>("Aceptable");
  const [doc3Obs, setDoc3Obs] = useState<string>("");

  const [doc4Accion, setDoc4Accion] = useState<string>("Pendiente");
  const [doc4Condicion, setDoc4Condicion] = useState<string>("Aceptable");
  const [doc4Obs, setDoc4Obs] = useState<string>("");

  const [doc5Accion, setDoc5Accion] = useState<string>("Pendiente");
  const [doc5Condicion, setDoc5Condicion] = useState<string>("Aceptable");
  const [doc5Obs, setDoc5Obs] = useState<string>("");

  const [doc6Accion, setDoc6Accion] = useState<string>("Pendiente");
  const [doc6Condicion, setDoc6Condicion] = useState<string>("Aceptable");
  const [doc6Obs, setDoc6Obs] = useState<string>("");

  const [doc7Obs, setDoc7Obs] = useState<string>("");

  // Handler Dynamic Redes
  const handleAddRedSocial = () => {
    setRedesSociales([
      ...redesSociales,
      { id: Date.now().toString(), link: "", network: "Facebook" },
    ]);
  };

  const handleRemoveRedSocial = (id: string) => {
    setRedesSociales(redesSociales.filter((item) => item.id !== id));
  };

  // Handler Dynamic Telefonos
  const handleAddTelefono = () => {
    setTelefonos([
      ...telefonos,
      { id: Date.now().toString(), number: "", type: "WhatsApp" },
    ]);
  };

  const handleRemoveTelefono = (id: string) => {
    setTelefonos(telefonos.filter((item) => item.id !== id));
  };

  const handleInscribirClick = () => {
    if (!tipoUsuario || tipoUsuario === "Selecciona..." || tipoUsuario === "") {
      setOpenValidationDialog(true);
    } else {
      setOpenConfirmDialog(true);
    }
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", pb: 10 }}>
      {/* ================= HEADER Y STEPPER SUPERIOR ================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          pb: 2,
          borderBottom: "1px solid #E5E7EB",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Salir y guardar + Título */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="outlined"
            onClick={() => navigate(AppRoutingPaths.ALTA_UNICA)}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#374151",
              borderColor: "#E5E7EB",
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.8rem",
              px: 1.8,
              py: 0.4,
              "&:hover": { backgroundColor: "#F9FAFB", borderColor: "#D1D5DB" },
            }}
          >
            ‹ Salir y guardar
          </Button>
          <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>
            / Nueva Alta Única
          </Typography>
        </Stack>

        {/* Stepper (1 Datos Personales - 2 Documentos - 3 Inscripción - 4 Confirmación) */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          {/* Step 1 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              backgroundColor: currentStep === 1 ? "#2563EB" : "transparent",
              color: currentStep === 1 ? "#FFFFFF" : currentStep > 1 ? "#16A34A" : "#6B7280",
              borderRadius: "16px",
              px: 1.5,
              py: 0.4,
            }}
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: currentStep === 1 ? "#FFFFFF" : currentStep > 1 ? "#F0FDF4" : "#E5E7EB",
                color: currentStep === 1 ? "#2563EB" : currentStep > 1 ? "#16A34A" : "#6B7280",
                fontSize: "0.7rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentStep > 1 ? <CheckIcon sx={{ fontSize: 12 }} /> : "1"}
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
              Datos Personales
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ color: "#D1D5DB" }}>—</Typography>

          {/* Step 2 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              backgroundColor: currentStep === 2 ? "#2563EB" : "transparent",
              color: currentStep === 2 ? "#FFFFFF" : currentStep > 2 ? "#16A34A" : "#6B7280",
              borderRadius: "16px",
              px: 1.5,
              py: 0.4,
            }}
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: currentStep === 2 ? "#FFFFFF" : currentStep > 2 ? "#F0FDF4" : "#E5E7EB",
                color: currentStep === 2 ? "#2563EB" : currentStep > 2 ? "#16A34A" : "#6B7280",
                fontSize: "0.7rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentStep > 2 ? <CheckIcon sx={{ fontSize: 12 }} /> : "2"}
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
              Documentos
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ color: "#D1D5DB" }}>—</Typography>

          {/* Step 3 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              backgroundColor: currentStep === 3 ? "#2563EB" : "transparent",
              color: currentStep === 3 ? "#FFFFFF" : currentStep > 3 ? "#16A34A" : "#6B7280",
              borderRadius: "16px",
              px: 1.5,
              py: 0.4,
            }}
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: currentStep === 3 ? "#FFFFFF" : currentStep > 3 ? "#F0FDF4" : "#E5E7EB",
                color: currentStep === 3 ? "#2563EB" : currentStep > 3 ? "#16A34A" : "#6B7280",
                fontSize: "0.7rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentStep > 3 ? <CheckIcon sx={{ fontSize: 12 }} /> : "3"}
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
              Inscripción
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ color: "#D1D5DB" }}>—</Typography>

          {/* Step 4 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              backgroundColor: currentStep === 4 ? "#2563EB" : "transparent",
              color: currentStep === 4 ? "#FFFFFF" : "#6B7280",
              borderRadius: "16px",
              px: 1.5,
              py: 0.4,
            }}
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: currentStep === 4 ? "#FFFFFF" : "#E5E7EB",
                color: currentStep === 4 ? "#2563EB" : "#6B7280",
                fontSize: "0.7rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              4
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
              Confirmación
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* ========================================================================= */}
      {/* ============================ PASO 1: DATOS PERSONALES =================== */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <>
          {/* TÍTULO DE SECCIÓN Y DESCRIPCIÓN */}
          <Box sx={{ maxWidth: "760px", mx: "auto", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
              Datos Personales
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
              Información de identificación del alumno. Los campos marcados con * son obligatorios.
            </Typography>
          </Box>

          {/* TARJETA 1: DATOS PERSONALES */}
          <Box
            sx={{
              maxWidth: "760px",
              mx: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              p: { xs: 2.5, sm: 3.5 },
              mb: 4,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
            }}
          >
            <Stack spacing={2.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                    Nombre(s) *
                  </Typography>
                  <TextField fullWidth size="small" value={nombre} onChange={(e) => setNombre(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                    Apellido paterno *
                  </Typography>
                  <TextField fullWidth size="small" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                    Apellido materno
                  </Typography>
                  <TextField fullWidth size="small" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                    Fecha de nacimiento *
                  </Typography>
                  <TextField fullWidth size="small" placeholder="dd/mm/aaaa" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} slotProps={{ input: { endAdornment: <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} /> } }} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
              </Stack>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                  CURP *
                </Typography>
                <TextField fullWidth size="small" value={curp} onChange={(e) => setCurp(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.72rem", mt: 0.5, display: "block" }}>
                  18 caracteres. Se valida contra RENAPO.
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "#F3F4F6", my: 0.5 }} />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                    Correo electrónico *
                  </Typography>
                  <TextField fullWidth size="small" value={correo} onChange={(e) => setCorreo(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                    Teléfono *
                  </Typography>
                  <TextField fullWidth size="small" value={telefono} onChange={(e) => setTelefono(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
              </Stack>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                  Género
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value={genero} onChange={(e) => setGenero(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px", fontSize: "0.875rem" }}>
                    <MenuItem value="Seleccionar..">Seleccionar..</MenuItem>
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>

          {/* TARJETA 2: DATOS LABORALES */}
          <Box sx={{ maxWidth: "760px", mx: "auto", mb: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827" }}>
              Datos Laborales
            </Typography>
          </Box>

          <Box sx={{ maxWidth: "760px", mx: "auto", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #E5E7EB", p: { xs: 2.5, sm: 3.5 }, mb: 4, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)" }}>
            <Stack spacing={2.5}>
              {/* Row 1: Corporación | Asociación | Empresa */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Corporación</Typography>
                  <TextField fullWidth size="small" value={corporacion} onChange={(e) => setCorporacion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Asociación</Typography>
                  <TextField fullWidth size="small" value={asociacion} onChange={(e) => setAsociacion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Empresa</Typography>
                  <TextField fullWidth size="small" value={empresa} onChange={(e) => setEmpresa(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
              </Stack>

              {/* Row 2: Programa Académico | Ruta de Estudios */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Programa Académico</Typography>
                  <TextField fullWidth size="small" value={programaAcademico} onChange={(e) => setProgramaAcademico(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Ruta de Estudios</Typography>
                  <TextField fullWidth size="small" value={rutaEstudios} onChange={(e) => setRutaEstudios(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
              </Stack>

              {/* Row 3: Tipo de usuario * | Estado | Ciudad */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Tipo de usuario *</Typography>
                  <FormControl fullWidth size="small">
                    <Select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px", fontSize: "0.875rem" }}>
                      <MenuItem value="Seleccionar...">Seleccionar...</MenuItem>
                      <MenuItem value="Empleado">Empleado</MenuItem>
                      <MenuItem value="Familiar">Familiar</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Estado</Typography>
                  <TextField fullWidth size="small" value={estado} onChange={(e) => setEstado(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Ciudad</Typography>
                  <TextField fullWidth size="small" value={ciudad} onChange={(e) => setCiudad(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
              </Stack>

              {/* Row 4: Centro | Región | Puesto */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Centro</Typography>
                  <TextField fullWidth size="small" value={centro} onChange={(e) => setCentro(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Región</Typography>
                  <TextField fullWidth size="small" value={region} onChange={(e) => setRegion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Puesto</Typography>
                  <FormControl fullWidth size="small">
                    <Select value={puesto} onChange={(e) => setPuesto(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px", fontSize: "0.875rem" }}>
                      <MenuItem value="Seleccionar puesto...">Seleccionar puesto...</MenuItem>
                      <MenuItem value="Asesor">Asesor</MenuItem>
                      <MenuItem value="Gerente">Gerente</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* TARJETA 3: DATOS DE CONTACTO */}
          <Box sx={{ maxWidth: "760px", mx: "auto", mb: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827" }}>
              Datos de Contacto
            </Typography>
          </Box>

          <Box sx={{ maxWidth: "760px", mx: "auto", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #E5E7EB", p: { xs: 2.5, sm: 3.5 }, mb: 4, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)" }}>
            <Stack spacing={2.5}>
              {/* Row 1: Calle | Número | Colonia */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Calle</Typography>
                  <TextField fullWidth size="small" placeholder="Escribe la calle" value={calle} onChange={(e) => setCalle(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Número</Typography>
                  <TextField fullWidth size="small" placeholder="Número ext./int." value={numero} onChange={(e) => setNumero(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Colonia</Typography>
                  <TextField fullWidth size="small" placeholder="Colonia" value={colonia} onChange={(e) => setColonia(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
              </Stack>

              {/* Row 2: Delegación / Municipio | Código Postal */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Delegación / Municipio</Typography>
                  <TextField fullWidth size="small" placeholder="Delegación o Municipio" value={delegacion} onChange={(e) => setDelegacion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Código Postal</Typography>
                  <TextField fullWidth size="small" placeholder="C. P ." value={cp} onChange={(e) => setCp(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>
              </Stack>

              {/* Row 3: Correo electrónico */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Correo electrónico</Typography>
                <TextField fullWidth size="small" placeholder="correo@empresa.com" value={correoEmpresa} onChange={(e) => setCorreoEmpresa(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
              </Box>

              {/* Row 4: Redes Sociales */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                  Redes Sociales
                </Typography>
                <Stack spacing={1.2}>
                  {redesSociales.map((item) => (
                    <Stack key={item.id} direction="row" spacing={1.5} alignItems="center">
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Link o usuario"
                        value={item.link}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRedesSociales(redesSociales.map((r) => (r.id === item.id ? { ...r, link: val } : r)));
                        }}
                        sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }}
                      />
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <Select
                          value={item.network}
                          onChange={(e) => {
                            const val = e.target.value;
                            setRedesSociales(redesSociales.map((r) => (r.id === item.id ? { ...r, network: val } : r)));
                          }}
                          sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px", fontSize: "0.85rem" }}
                        >
                          <MenuItem value="Facebook">Facebook</MenuItem>
                          <MenuItem value="Instagram">Instagram</MenuItem>
                          <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                          <MenuItem value="X">X (Twitter)</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton size="small" onClick={() => handleRemoveRedSocial(item.id)} sx={{ border: "1px solid #E5E7EB", borderRadius: "6px", p: 0.6, color: "#6B7280" }}>
                        <CloseIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Stack>
                  ))}
                  <Box>
                    <Typography variant="caption" onClick={handleAddRedSocial} sx={{ color: "#2563EB", fontWeight: 700, cursor: "pointer", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: 0.5, "&:hover": { textDecoration: "underline" } }}>
                      + + Añadir Red Social
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Row 5: Teléfonos */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                  Teléfonos
                </Typography>
                <Stack spacing={1.2}>
                  {telefonos.map((item) => (
                    <Stack key={item.id} direction="row" spacing={1.5} alignItems="center">
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="+00 000 000 00"
                        value={item.number}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTelefonos(telefonos.map((t) => (t.id === item.id ? { ...t, number: val } : t)));
                        }}
                        sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }}
                      />
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <Select
                          value={item.type}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTelefonos(telefonos.map((t) => (t.id === item.id ? { ...t, type: val } : t)));
                          }}
                          sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px", fontSize: "0.85rem" }}
                        >
                          <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                          <MenuItem value="Móvil">Móvil</MenuItem>
                          <MenuItem value="Casa">Casa</MenuItem>
                          <MenuItem value="Trabajo">Trabajo</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton size="small" onClick={() => handleRemoveTelefono(item.id)} sx={{ border: "1px solid #E5E7EB", borderRadius: "6px", p: 0.6, color: "#6B7280" }}>
                        <CloseIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Stack>
                  ))}
                  <Box>
                    <Typography variant="caption" onClick={handleAddTelefono} sx={{ color: "#2563EB", fontWeight: 700, cursor: "pointer", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: 0.5, "&:hover": { textDecoration: "underline" } }}>
                      + + Añadir Teléfono
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Row 6: Horario de Contacto para llamadas */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                  Horario de Contacto para llamadas
                </Typography>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  <FormControlLabel control={<Checkbox size="small" checked={horariosLlamada.mornings} onChange={(e) => setHorariosLlamada({ ...horariosLlamada, mornings: e.target.checked })} />} label={<Typography variant="body2" sx={{ fontSize: "0.82rem", color: "#4B5563" }}>8:00am – 12:00pm</Typography>} />
                  <FormControlLabel control={<Checkbox size="small" checked={horariosLlamada.afternoons} onChange={(e) => setHorariosLlamada({ ...horariosLlamada, afternoons: e.target.checked })} />} label={<Typography variant="body2" sx={{ fontSize: "0.82rem", color: "#4B5563" }}>12:00pm – 7:00pm</Typography>} />
                  <FormControlLabel control={<Checkbox size="small" checked={horariosLlamada.evenings} onChange={(e) => setHorariosLlamada({ ...horariosLlamada, evenings: e.target.checked })} />} label={<Typography variant="body2" sx={{ fontSize: "0.82rem", color: "#4B5563" }}>7:00pm – 9:00pm</Typography>} />
                </Stack>
              </Box>

              {/* Row 7: Acceso a Internet */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                  Acceso a Internet
                </Typography>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  <FormControlLabel control={<Checkbox size="small" checked={accesoInternet.datos} onChange={(e) => setAccesoInternet({ ...accesoInternet, datos: e.target.checked })} />} label={<Typography variant="body2" sx={{ fontSize: "0.82rem", color: "#4B5563" }}>Internet en celular (Datos)</Typography>} />
                  <FormControlLabel control={<Checkbox size="small" checked={accesoInternet.ethernet} onChange={(e) => setAccesoInternet({ ...accesoInternet, ethernet: e.target.checked })} />} label={<Typography variant="body2" sx={{ fontSize: "0.82rem", color: "#4B5563" }}>Internet en casa (Ethernet)</Typography>} />
                  <FormControlLabel control={<Checkbox size="small" checked={accesoInternet.general} onChange={(e) => setAccesoInternet({ ...accesoInternet, general: e.target.checked })} />} label={<Typography variant="body2" sx={{ fontSize: "0.82rem", color: "#4B5563" }}>Internet en general</Typography>} />
                </Stack>
              </Box>
            </Stack>
          </Box>

          {/* TARJETA 4: NOTAS Y OBSERVACIONES */}
          <Box sx={{ maxWidth: "760px", mx: "auto", mb: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827" }}>
              Notas y Observaciones
            </Typography>
          </Box>

          <Box sx={{ maxWidth: "760px", mx: "auto", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #E5E7EB", p: { xs: 2.5, sm: 3.5 }, mb: 6, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)" }}>
            <Stack spacing={2.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Elegible *</Typography>
                  <FormControl fullWidth size="small">
                    <Select value={elegible} onChange={(e) => setElegible(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px", fontSize: "0.875rem" }}>
                      <MenuItem value="Selecciona...">Selecciona...</MenuItem>
                      <MenuItem value="Sí">Sí</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Interesado *</Typography>
                  <FormControl fullWidth size="small">
                    <Select value={interesado} onChange={(e) => setInteresado(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px", fontSize: "0.875rem" }}>
                      <MenuItem value="Selecciona...">Selecciona...</MenuItem>
                      <MenuItem value="Sí">Sí</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Campaña *</Typography>
                  <FormControl fullWidth size="small">
                    <Select value={campana} onChange={(e) => setCampana(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px", fontSize: "0.875rem" }}>
                      <MenuItem value="Selecciona campaña...">Selecciona campaña...</MenuItem>
                      <MenuItem value="AGC-Q1">AGC-Q1</MenuItem>
                      <MenuItem value="AGC-Q2">AGC-Q2</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Responsable del Alta Única *</Typography>
                <FormControl fullWidth size="small">
                  <Select value={responsable} onChange={(e) => setResponsable(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px", fontSize: "0.875rem" }}>
                    <MenuItem value="Selecciona asesor responsable...">Selecciona asesor responsable...</MenuItem>
                    <MenuItem value="Cynthia Cuevas">Cynthia Cuevas</MenuItem>
                    <MenuItem value="Ana Belén Ávila">Ana Belén Ávila</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>Comentarios</Typography>
                <TextField fullWidth multiline rows={4} placeholder="Escribe observaciones y/o comentarios sobre el registro..." value={comentarios} onChange={(e) => setComentarios(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
              </Box>
            </Stack>
          </Box>
        </>
      )}

      {/* ========================================================================= */}
      {/* ============================ PASO 2: DOCUMENTOS ========================= */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <>
          {/* TÍTULO Y DESCRIPCIÓN DE DOCUMENTOS */}
          <Box sx={{ maxWidth: "780px", mx: "auto", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
              Documentos
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
              Verifica que la información esté respaldada con la documentación correspondiente para la inscripción.
            </Typography>
          </Box>

          {/* BANNER AZUL INFORMATIVO: RUTA DE FORMACIÓN */}
          <Box
            sx={{
              maxWidth: "780px",
              mx: "auto",
              backgroundColor: "#EFF6FF",
              border: "1px solid #BFDBFE",
              borderRadius: "16px",
              p: 2.5,
              mb: 3,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1E3A8A", mb: 1.2, fontSize: "0.875rem" }}>
              Para verificar la documentación obligatoria, selecciona la ruta de formación de interés
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={rutaFormacion}
                onChange={(e) => setRutaFormacion(e.target.value)}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  color: "#374151",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D1D5DB" },
                }}
              >
                <MenuItem value="Seleccionar ruta...">Seleccionar ruta...</MenuItem>
                <MenuItem value="Licenciatura Coppel 2020">Licenciatura Coppel 2020</MenuItem>
                <MenuItem value="Bachillerato General 2022">Bachillerato General 2022</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* CONTENEDOR PRINCIPAL: EXPEDIENTE DOCUMENTAL */}
          <Box
            sx={{
              maxWidth: "780px",
              mx: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              p: { xs: 2.5, sm: 3.5 },
              mb: 6,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
            }}
          >
            {/* Header del Expediente Documental con Barra de Progreso 1/6 */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <FolderOutlinedIcon sx={{ color: "#374151", fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.98rem" }}>
                  Expediente documental
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ width: 60, height: 6, backgroundColor: "#E5E7EB", borderRadius: 3, overflow: "hidden" }}>
                  <Box sx={{ width: "16.6%", height: "100%", backgroundColor: "#D97706" }} />
                </Box>
                <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 700, fontSize: "0.78rem" }}>
                  1/6
                </Typography>
              </Stack>
            </Stack>

            {/* Campos de Modalidad y Estatus de Recepción */}
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.6, display: "block" }}>
                  Modalidad del expediente
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={modalidadExpediente}
                  onChange={(e) => setModalidadExpediente(e.target.value)}
                  sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }}
                />
              </Box>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.6, display: "block" }}>
                  Estatus de recepción
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={estatusRecepcion}
                  onChange={(e) => setEstatusRecepcion(e.target.value)}
                  sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }}
                />
              </Box>
            </Stack>

            <Divider sx={{ borderColor: "#F3F4F6", my: 2.5 }} />

            {/* SUB-HEADER: DOCUMENTACIÓN PERSONAL */}
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "1px", mb: 2, display: "block" }}>
              DOCUMENTACIÓN PERSONAL
            </Typography>

            {/* ================= DOCUMENTO 1: Acta de Nacimiento (VALIDADO) ================= */}
            <Box
              sx={{
                border: "1px solid #DCFCE7",
                borderRadius: "12px",
                p: 2.5,
                mb: 2.5,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box sx={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    1
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                        Acta de Nacimiento
                      </Typography>
                      <Chip label="Requerido" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#4B5563", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                      Original certificada
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="caption" sx={{ color: "#16A34A", fontWeight: 800, fontSize: "0.82rem" }}>
                  Validado
                </Typography>
              </Stack>

              {/* Archivo Adjunto (Pill PDF) */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FEE2E2",
                  borderRadius: "10px",
                  px: 1.5,
                  py: 0.8,
                  gap: 1,
                  mb: 2,
                }}
              >
                <PictureAsPdfIcon sx={{ color: "#EF4444", fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.78rem" }}>
                  ActaNacimiento.pdf
                </Typography>
                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.72rem" }}>
                  200KB
                </Typography>

                <Stack direction="row" spacing={0.3} sx={{ ml: 1 }}>
                  <Tooltip title="Ver"><IconButton size="small" sx={{ p: 0.3, color: "#2563EB" }}><VisibilityOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                  <Tooltip title="Descargar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><FileDownloadOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                  <Tooltip title="Editar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><EditOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                  <Tooltip title="Eliminar"><IconButton size="small" sx={{ p: 0.3, color: "#EF4444" }}><DeleteOutlineIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                </Stack>
              </Box>

              {/* Form de Validación */}
              <Stack spacing={1.8}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                    <TextField fullWidth size="small" value={doc1Accion} onChange={(e) => setDoc1Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                    <TextField fullWidth size="small" value={doc1Condicion} onChange={(e) => setDoc1Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                  </Box>
                </Stack>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
                  <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc1Obs} onChange={(e) => setDoc1Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                  <Button variant="outlined" size="small" startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem" }}>
                    Re-subir
                  </Button>
                  <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                    Guardar cambios
                  </Button>
                </Stack>
              </Stack>
            </Box>

            {/* ================= DOCUMENTO 2: CURP (RECHAZADO) ================= */}
            <Box
              sx={{
                border: "1px solid #FECACA",
                borderRadius: "12px",
                p: 2.5,
                mb: 2.5,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box sx={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    2
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                        CURP
                      </Typography>
                      <Chip label="Requerido" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#4B5563", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                      Clave Única de Registro de Población
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="caption" sx={{ color: "#DC2626", fontWeight: 800, fontSize: "0.82rem" }}>
                  RECHAZADO
                </Typography>
              </Stack>

              {/* Archivo Adjunto (Pill PDF) */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FEE2E2",
                  borderRadius: "10px",
                  px: 1.5,
                  py: 0.8,
                  gap: 1,
                  mb: 2,
                }}
              >
                <PictureAsPdfIcon sx={{ color: "#EF4444", fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.78rem" }}>
                  HETR11021HYATHNP00.pdf
                </Typography>
                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.72rem" }}>
                  200KB
                </Typography>

                <Stack direction="row" spacing={0.3} sx={{ ml: 1 }}>
                  <Tooltip title="Ver"><IconButton size="small" sx={{ p: 0.3, color: "#2563EB" }}><VisibilityOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                  <Tooltip title="Descargar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><FileDownloadOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                  <Tooltip title="Editar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><EditOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                  <Tooltip title="Eliminar"><IconButton size="small" sx={{ p: 0.3, color: "#EF4444" }}><DeleteOutlineIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                </Stack>
              </Box>

              {/* Form de Validación */}
              <Stack spacing={1.8}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                    <TextField fullWidth size="small" value={doc2Accion} onChange={(e) => setDoc2Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                    <TextField fullWidth size="small" value={doc2Condicion} onChange={(e) => setDoc2Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                  </Box>
                </Stack>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
                  <TextField fullWidth multiline rows={2} value={doc2Obs} onChange={(e) => setDoc2Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                  <Button variant="outlined" size="small" startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem" }}>
                    Re-subir
                  </Button>
                  <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                    Guardar cambios
                  </Button>
                </Stack>
              </Stack>
            </Box>

            {/* ================= DOCUMENTO 3: Certificado de Bachillerato (PENDIENTE DE REVISIÓN) ================= */}
            <Box
              sx={{
                border: "1px solid #FED7AA",
                borderRadius: "12px",
                p: 2.5,
                mb: 2.5,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box sx={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    3
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                        Certificado de Bachillerato
                      </Typography>
                      <Chip label="Requerido" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#4B5563", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                      Último grado de estudios completado
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="caption" sx={{ color: "#D97706", fontWeight: 800, fontSize: "0.82rem" }}>
                  PENDIENTE DE REVISIÓN
                </Typography>
              </Stack>

              {/* Archivo Adjunto (Pill PDF) */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FEE2E2",
                  borderRadius: "10px",
                  px: 1.5,
                  py: 0.8,
                  gap: 1,
                  mb: 2,
                }}
              >
                <PictureAsPdfIcon sx={{ color: "#EF4444", fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.78rem" }}>
                  CERT_BACHILLERATO.pdf
                </Typography>
                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.72rem" }}>
                  512KB
                </Typography>

                <Stack direction="row" spacing={0.3} sx={{ ml: 1 }}>
                  <Tooltip title="Ver"><IconButton size="small" sx={{ p: 0.3, color: "#2563EB" }}><VisibilityOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                  <Tooltip title="Descargar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><FileDownloadOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                  <Tooltip title="Editar"><IconButton size="small" sx={{ p: 0.3, color: "#4B5563" }}><EditOutlinedIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                  <Tooltip title="Eliminar"><IconButton size="small" sx={{ p: 0.3, color: "#EF4444" }}><DeleteOutlineIcon sx={{ fontSize: 15 }} /></IconButton></Tooltip>
                </Stack>
              </Box>

              {/* Form de Validación */}
              <Stack spacing={1.8}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                  <TextField fullWidth size="small" value={doc3Condicion} onChange={(e) => setDoc3Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
                  <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc3Obs} onChange={(e) => setDoc3Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                  <Button variant="outlined" size="small" startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem" }}>
                    Re-subir
                  </Button>
                  <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                    Guardar cambios
                  </Button>
                </Stack>
              </Stack>
            </Box>

            <Divider sx={{ borderColor: "#F3F4F6", my: 2.5 }} />

            {/* SUB-HEADER: DOCUMENTACIÓN ESCOLAR */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <SchoolOutlinedIcon sx={{ color: "#6B7280", fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "1px" }}>
                DOCUMENTACIÓN ESCOLAR
              </Typography>
            </Stack>

            {/* CONTENEDOR UNIFICADO EN ACORDEÓN PARA ITEMS 4, 5 Y 6 */}
            <Box
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                mb: 3,
              }}
            >
              {/* ITEM 4: Carta de autenticidad */}
              <Box sx={{ borderBottom: "1px solid #E5E7EB" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => setOpenDoc4(!openDoc4)}
                  sx={{
                    p: 2.5,
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                    "&:hover": { backgroundColor: "#F9FAFB" },
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.78rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      4
                    </Box>
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                          Carta de autenticidad
                        </Typography>
                        <Chip label="OPCIONAL" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#6B7280", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                      </Stack>
                      <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem", mt: 0.2, display: "block" }}>
                        Aceptación de documentos originales
                      </Typography>
                    </Box>
                  </Stack>

                  <IconButton size="small" sx={{ color: "#6B7280" }}>
                    {openDoc4 ? <KeyboardArrowUpIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />}
                  </IconButton>
                </Stack>

                {openDoc4 && (
                  <Box sx={{ px: 2.5, pb: 2.5, pt: 1, backgroundColor: "#FFFFFF" }}>
                    <Box sx={{ mb: 2 }}>
                      <Button variant="outlined" startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 16 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem", py: 0.5, px: 1.5 }}>
                        Subir archivo
                      </Button>
                    </Box>

                    <Stack spacing={1.8}>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                          <TextField fullWidth size="small" value={doc4Accion} onChange={(e) => setDoc4Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                          <TextField fullWidth size="small" value={doc4Condicion} onChange={(e) => setDoc4Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                        </Box>
                      </Stack>

                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
                        <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc4Obs} onChange={(e) => setDoc4Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                        <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                          Guardar cambios
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                )}
              </Box>

              {/* ITEM 5: Equivalencia */}
              <Box sx={{ borderBottom: "1px solid #E5E7EB" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => setOpenDoc5(!openDoc5)}
                  sx={{
                    p: 2.5,
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                    "&:hover": { backgroundColor: "#F9FAFB" },
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.78rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      5
                    </Box>
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                          Equivalencia
                        </Typography>
                        <Chip label="OPCIONAL" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#6B7280", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                      </Stack>
                      <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem", mt: 0.2, display: "block" }}>
                        Revalidación de Materias
                      </Typography>
                    </Box>
                  </Stack>

                  <IconButton size="small" sx={{ color: "#6B7280" }}>
                    {openDoc5 ? <KeyboardArrowUpIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />}
                  </IconButton>
                </Stack>

                {openDoc5 && (
                  <Box sx={{ px: 2.5, pb: 2.5, pt: 1, backgroundColor: "#FFFFFF" }}>
                    <Box sx={{ mb: 2 }}>
                      <Button variant="outlined" startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 16 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem", py: 0.5, px: 1.5 }}>
                        Subir archivo
                      </Button>
                    </Box>

                    <Stack spacing={1.8}>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                          <TextField fullWidth size="small" value={doc5Accion} onChange={(e) => setDoc5Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                          <TextField fullWidth size="small" value={doc5Condicion} onChange={(e) => setDoc5Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                        </Box>
                      </Stack>

                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
                        <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc5Obs} onChange={(e) => setDoc5Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                        <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                          Guardar cambios
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                )}
              </Box>

              {/* ITEM 6: Certificado Parcial de Estudios */}
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => setOpenDoc6(!openDoc6)}
                  sx={{
                    p: 2.5,
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                    "&:hover": { backgroundColor: "#F9FAFB" },
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.78rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      6
                    </Box>
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                          Certificado Parcial de Estudios
                        </Typography>
                        <Chip label="OPCIONAL" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#6B7280", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                      </Stack>
                      <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem", mt: 0.2, display: "block" }}>
                        Último grado de estudios completado
                      </Typography>
                    </Box>
                  </Stack>

                  <IconButton size="small" sx={{ color: "#6B7280" }}>
                    {openDoc6 ? <KeyboardArrowUpIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />}
                  </IconButton>
                </Stack>

                {openDoc6 && (
                  <Box sx={{ px: 2.5, pb: 2.5, pt: 1, backgroundColor: "#FFFFFF" }}>
                    <Box sx={{ mb: 2 }}>
                      <Button variant="outlined" startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 16 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem", py: 0.5, px: 1.5 }}>
                        Subir archivo
                      </Button>
                    </Box>

                    <Stack spacing={1.8}>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Acción</Typography>
                          <TextField fullWidth size="small" value={doc6Accion} onChange={(e) => setDoc6Accion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Condición del documento</Typography>
                          <TextField fullWidth size="small" value={doc6Condicion} onChange={(e) => setDoc6Condicion(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                        </Box>
                      </Stack>

                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones del documento</Typography>
                        <TextField fullWidth multiline rows={2} placeholder="Comentarios acerca del documento" value={doc6Obs} onChange={(e) => setDoc6Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                        <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px", backgroundColor: "#111827", color: "#FFFFFF", fontSize: "0.78rem", px: 2 }}>
                          Guardar cambios
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                )}
              </Box>
            </Box>

            <Divider sx={{ borderColor: "#F3F4F6", my: 2.5 }} />

            {/* SUB-HEADER: OTROS DOCUMENTOS */}
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "1px", mb: 2, display: "block" }}>
              OTROS DOCUMENTOS
            </Typography>

            {/* ================= DOCUMENTO 7: Fotografías (OPCIONAL) ================= */}
            <Box sx={{ border: "1px solid #E5E7EB", borderRadius: "12px", p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box sx={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    7
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.9rem" }}>
                        Fotografías
                      </Typography>
                      <Chip label="OPCIONAL" size="small" sx={{ backgroundColor: "#F3F4F6", color: "#6B7280", fontSize: "0.68rem", fontWeight: 600, height: 20 }} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                      2 fotografías tamaño infantil blanco y negro
                    </Typography>
                  </Box>
                </Stack>

                <Button variant="outlined" startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 16 }} />} sx={{ textTransform: "none", borderRadius: "8px", borderColor: "#E5E7EB", color: "#374151", fontSize: "0.78rem", py: 0.5, px: 1.5 }}>
                  Subir archivo
                </Button>
              </Stack>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#6B7280", mb: 0.5, display: "block" }}>Observaciones y/o comentarios</Typography>
                <TextField fullWidth multiline rows={2} placeholder="Escribe si hay observaciones y/o comentarios" value={doc7Obs} onChange={(e) => setDoc7Obs(e.target.value)} sx={{ backgroundColor: "#F9FAFB", borderRadius: "8px" }} />
              </Box>
            </Box>
          </Box>
        </>
      )}

      {/* ========================================================================= */}
      {/* ============================ PASO 3: INSCRIPCIÓN ======================== */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <>
          {/* TÍTULO Y DESCRIPCIÓN DE INSCRIPCIÓN */}
          <Box sx={{ maxWidth: "760px", mx: "auto", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
              Inscripción
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
              Selecciona el programa, generación y grupo en los que se inscribirá el alumno.
            </Typography>
          </Box>

          {/* TARJETA PRINCIPAL DE INSCRIPCIÓN */}
          <Box
            sx={{
              maxWidth: "760px",
              mx: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              p: { xs: 2.5, sm: 3.5 },
              mb: 6,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
            }}
          >
            <Stack spacing={2.5}>
              {/* Campo 1: Ruta de Formación * */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                  Ruta de Formación *
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={insRutaFormacion}
                    onChange={(e) => setInsRutaFormacion(e.target.value)}
                    sx={{
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      color: "#111827",
                    }}
                  >
                    <MenuItem value="Seleccionar ruta...">Seleccionar ruta...</MenuItem>
                    <MenuItem value="Licenciatura Coppel 2020">Licenciatura Coppel 2020</MenuItem>
                    <MenuItem value="Bachillerato General 2022">Bachillerato General 2022</MenuItem>
                    <MenuItem value="Diplomado en Administración">Diplomado en Administración</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Campo 2: Generación * */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                  Generación *
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={insGeneracion}
                    onChange={(e) => setInsGeneracion(e.target.value)}
                    sx={{
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      color: "#111827",
                    }}
                  >
                    <MenuItem value="Seleccionar generación...">Seleccionar generación...</MenuItem>
                    <MenuItem value="Generación 2024-A">Generación 2024-A</MenuItem>
                    <MenuItem value="Generación 2024-B">Generación 2024-B</MenuItem>
                    <MenuItem value="Generación 2025-A">Generación 2025-A</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Campo 3: Periodo de inscripción * */}
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151", mb: 0.6, display: "block" }}>
                  Periodo de inscripción *
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={insPeriodo}
                    onChange={(e) => setInsPeriodo(e.target.value)}
                    sx={{
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      color: "#111827",
                    }}
                  >
                    <MenuItem value="PERIODO-0001 · 1-30 Sep 2025">PERIODO-0001 · 1-30 Sep 2025</MenuItem>
                    <MenuItem value="PERIODO-0002 · 1-31 Oct 2025">PERIODO-0002 · 1-31 Oct 2025</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* BANNER DE CONTEXTO DEL PERIODO ACTIVO (AMBAR/CREMA) */}
              <Box
                sx={{
                  backgroundColor: "#FFFBEB",
                  border: "1px solid #FED7AA",
                  borderRadius: "12px",
                  p: 2.2,
                  mt: 1,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.8 }}>
                  <Chip
                    label="PERIODO-0001"
                    size="small"
                    sx={{
                      backgroundColor: "#FFF7ED",
                      border: "1px solid #FFEDD5",
                      color: "#D97706",
                      fontWeight: 800,
                      fontSize: "0.68rem",
                      borderRadius: "6px",
                      height: 22,
                    }}
                  />
                  <Chip
                    label="ACTIVA"
                    size="small"
                    sx={{
                      backgroundColor: "#F0FDF4",
                      border: "1px solid #DCFCE7",
                      color: "#16A34A",
                      fontWeight: 800,
                      fontSize: "0.68rem",
                      borderRadius: "6px",
                      height: 22,
                    }}
                  />
                </Stack>

                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.92rem" }}>
                  Periodo 1–30 Sep 2025
                </Typography>
                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.78rem", mt: 0.2, display: "block" }}>
                  Ventana de inscripción vigente para esta materia
                </Typography>
              </Box>
            </Stack>
          </Box>
        </>
      )}

      {/* ========================================================================= */}
      {/* ============================ PASO 4: CONFIRMACIÓN ======================= */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <>
          {/* TÍTULO Y DESCRIPCIÓN DE CONFIRMACIÓN */}
          <Box sx={{ maxWidth: "760px", mx: "auto", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
              Confirmación
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
              Revisa los datos antes de crear el Alta Única. La matrícula se generará automáticamente.
            </Typography>
          </Box>

          {/* TARJETA DE RESUMEN DEL PROSPECTO */}
          <Box
            sx={{
              maxWidth: "760px",
              mx: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              p: { xs: 2.5, sm: 3.5 },
              mb: 2.5,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
            }}
          >
            {/* Header del prospecto (Avatar, Nombre, Matrícula aviso, Chip Docs. incompletos) */}
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3, pb: 2.5, borderBottom: "1px solid #F3F4F6" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    backgroundColor: "#EEF2FF",
                    color: "#4F46E5",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  MG
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>
                    García López, María Elena
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280", fontFamily: "monospace", fontSize: "0.78rem" }}>
                    Matrícula: será asignada al guardar
                  </Typography>
                </Box>
              </Stack>

              <Chip
                label="Docs. incompletos"
                size="small"
                sx={{
                  backgroundColor: "#FFF7ED",
                  border: "1px solid #FED7AA",
                  color: "#C2410C",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  borderRadius: "12px",
                  height: 24,
                }}
              />
            </Stack>

            {/* Grid de Datos Resumidos */}
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
                  CURP
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
                  GARX001201MDFLPR09
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
                  FECHA DE NACIMIENTO
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
                  12 de enero de 2000
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
                  CORREO
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
                  garcia.elena@correo.com
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
                  TELÉFONO
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
                  55 1234 5678
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
                  RUTA DE FORMACIÓN
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
                  Lic. en Administración de Empresas
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#6B7280", letterSpacing: "0.5px", fontSize: "0.68rem", display: "block", mb: 0.3 }}>
                  GENERACIÓN - GRUPO
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem" }}>
                  Gen 2024-A · Grupo A - Presencial
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* BANNER INFORMATIVO VERDE */}
          <Box
            sx={{
              maxWidth: "760px",
              mx: "auto",
              backgroundColor: "#F0FDF4",
              border: "1px solid #DCFCE7",
              borderRadius: "12px",
              p: 2,
              mb: 6,
            }}
          >
            <Typography variant="body2" sx={{ color: "#16A34A", fontWeight: 600, fontSize: "0.85rem" }}>
              Al confirmar, se creará el Alta Única, se asignará matrícula y se notificará a Servicios Escolares.
            </Typography>
          </Box>
        </>
      )}

      {/* ================= FIXED BOTTOM ACTION BAR ================= */}
      <Box        
        sx={{
    position: "sticky",
    bottom: { xs: -16, sm: -24, md: -32 }, // Compensa el padding inferior (p) del <Box component="main">
    // Márgenes negativos para compensar el padding lateral de <Box component="main">
    mx: { xs: -2, sm: -3, md: -4 }, 
    mb: { xs: -2, sm: -3, md: -4 }, 
    backgroundColor: "#FFFFFF",
    borderTop: "1px solid #E5E7EB",
    py: 1.5,
    px: { xs: 2, sm: 3, md: 4 },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.05)",
    zIndex: 10,
    mt: "auto", // Si hay poco contenido, lo empuja al fondo
  }}
  
      >
        {/* Left Side */}
        {currentStep === 4 ? (
          <Button
            variant="outlined"
            onClick={() => setCurrentStep((s) => s - 1)}
            startIcon={<ChevronLeftIcon sx={{ fontSize: 18 }} />}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#374151",
              borderColor: "#D1D5DB",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              px: 2.5,
              py: 0.9,
              "&:hover": { backgroundColor: "#F9FAFB", borderColor: "#9CA3AF" },
            }}
          >
            Anterior
          </Button>
        ) : (
          <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}>
            Paso {currentStep} de 4
          </Typography>
        )}

        {/* Right Side */}
        {currentStep === 4 ? (
          <Stack direction="row" spacing={2.5} alignItems="center">
            <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}>
              Paso 4 de 4
            </Typography>
            <Button
              variant="contained"
              onClick={handleInscribirClick}
              sx={{
                backgroundColor: "#16A34A",
                color: "#FFFFFF",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                px: 3.5,
                py: 0.9,
                "&:hover": {
                  backgroundColor: "#15803D",
                },
              }}
            >
              Inscribir
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1.5}>
            {currentStep > 1 && (
              <Button
                variant="outlined"
                onClick={() => setCurrentStep((s) => s - 1)}
                startIcon={<ChevronLeftIcon sx={{ fontSize: 18 }} />}
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#374151",
                  borderColor: "#D1D5DB",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  px: 2.5,
                  py: 0.9,
                  "&:hover": { backgroundColor: "#F9FAFB", borderColor: "#9CA3AF" },
                }}
              >
                Anterior
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => {
                if (currentStep < 4) setCurrentStep((s) => s + 1);
              }}
              endIcon={<ChevronRightIcon sx={{ fontSize: 18 }} />}
              sx={{
                backgroundColor: "#111827",
                color: "#FFFFFF",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                px: 3,
                py: 0.9,
                "&:hover": {
                  backgroundColor: "#1F2937",
                },
              }}
            >
              Continuar
            </Button>
          </Stack>
        )}
      </Box>

      {/* ========================================================================= */}
      {/* ================= DIÁLOGO 1: FALTAN CAMPOS OBLIGATORIOS ================= */}
      {/* ========================================================================= */}
      <Dialog
        open={openValidationDialog}
        onClose={() => setOpenValidationDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 2.5,
            maxWidth: "460px",
            width: "100%",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                backgroundColor: "#FFF7ED",
                border: "1px solid #FED7AA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ReportProblemOutlinedIcon sx={{ color: "#D97706", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", fontSize: "1.05rem", lineHeight: 1.3 }}>
                Faltan campos obligatorios
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.88rem", lineHeight: 1.5, mb: 3 }}>
            No se puede inscribir al alumno todavía. Revisa el Paso 1 — falta seleccionar el <strong>Tipo de usuario</strong> (Colaborador o Familiar) antes de continuar.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setOpenValidationDialog(false)}
              sx={{
                backgroundColor: "#111827",
                color: "#FFFFFF",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                px: 2.8,
                py: 0.8,
                fontSize: "0.85rem",
                "&:hover": { backgroundColor: "#1F2937" },
              }}
            >
              Entendido
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* ================= DIÁLOGO 2: CONFIRMACIÓN DE INSCRIPCIÓN =============== */}
      {/* ========================================================================= */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 2.5,
            maxWidth: "460px",
            width: "100%",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                backgroundColor: "#EEF2FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <HelpOutlineOutlinedIcon sx={{ color: "#4F46E5", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", fontSize: "1.05rem", lineHeight: 1.3 }}>
                ¿Seguro que deseas inscribir a este alumno?
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.88rem", lineHeight: 1.5, mb: 3 }}>
            Se generará la matrícula, se creará su Alta Única y se enviará un correo de bienvenida. Esta acción no se puede deshacer desde aquí.
          </Typography>

          <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => setOpenConfirmDialog(false)}
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#374151",
                borderColor: "#E5E7EB",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                px: 2.2,
                py: 0.8,
                fontSize: "0.85rem",
                "&:hover": { backgroundColor: "#F9FAFB", borderColor: "#D1D5DB" },
              }}
            >
              Seguir editando
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                setOpenConfirmDialog(false);
                setOpenSuccessDialog(true);
              }}
              sx={{
                backgroundColor: "#16A34A",
                color: "#FFFFFF",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                px: 2.8,
                py: 0.8,
                fontSize: "0.85rem",
                "&:hover": { backgroundColor: "#15803D" },
              }}
            >
              Inscribir
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* ================= DIÁLOGO 3: ALUMNO INSCRITO ÉXITO ===================== */}
      {/* ========================================================================= */}
      <Dialog
        open={openSuccessDialog}
        onClose={() => {
          setOpenSuccessDialog(false);
          navigate(AppRoutingPaths.ALTA_UNICA);
        }}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 3,
            maxWidth: "460px",
            width: "100%",
          },
        }}
      >
        <DialogContent sx={{ p: 0, textAlign: "center" }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              backgroundColor: "#F0FDF4",
              color: "#16A34A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <CheckCircleOutlinedIcon sx={{ fontSize: 32 }} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", fontSize: "1.2rem", mb: 0.5 }}>
            ¡Alumno inscrito!
          </Typography>

          <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.85rem", mb: 2.5 }}>
            Se envió un correo de bienvenida a <strong>garcia.elena@correo.com</strong> con sus datos de acceso.
          </Typography>

          <Box
            sx={{
              backgroundColor: "#F9FAFB",
              border: "1px solid #F3F4F6",
              borderRadius: "12px",
              p: 2,
              textAlign: "left",
              mb: 3,
            }}
          >
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" sx={{ color: "#6B7280" }}>Nombre</Typography>
                <Typography variant="caption" sx={{ color: "#111827", fontWeight: 700 }}>García López, María Elena</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" sx={{ color: "#6B7280" }}>Matrícula</Typography>
                <Typography variant="caption" sx={{ color: "#111827", fontWeight: 800, fontFamily: "monospace" }}>AGC-2026-0412</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" sx={{ color: "#6B7280" }}>Usuario</Typography>
                <Typography variant="caption" sx={{ color: "#111827", fontFamily: "monospace" }}>garcia.elena</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" sx={{ color: "#6B7280" }}>ID Alumno</Typography>
                <Typography variant="caption" sx={{ color: "#111827", fontFamily: "monospace" }}>STU-004120</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" sx={{ color: "#6B7280" }}>Programa</Typography>
                <Typography variant="caption" sx={{ color: "#111827", fontWeight: 600 }}>Lic. en Administración de Empresas</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" sx={{ color: "#6B7280" }}>Plan</Typography>
                <Typography variant="caption" sx={{ color: "#111827", fontWeight: 600 }}>IDS Coppel</Typography>
              </Stack>
            </Stack>
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              setOpenSuccessDialog(false);
              navigate(AppRoutingPaths.ALTA_UNICA);
            }}
            endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />}
            sx={{
              backgroundColor: "#111827",
              color: "#FFFFFF",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              py: 0.9,
              fontSize: "0.85rem",
              "&:hover": { backgroundColor: "#1F2937" },
            }}
          >
            Ver detalles
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NuevaAltaUnica;
