import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths } from "@constants";

import { ConfirmacionInscripcionDialog } from "./ConfirmacionInscripcionDialog";
import { CamposObligatoriosDialog } from "./CamposObligatoriosDialog";
import { AlumnoInscritoDialog } from "./AlumnoInscritoDialog";

import {
  AltaUnicaStepper,
  Step1DatosPersonales,
  Step2Documentos,
  Step3Inscripcion,
  Step4Confirmacion,
  type RedSocialItem,
  type TelefonoItem,
} from "./steps";
import { GuardarSalirDialog } from "./GuardarSalirDialog";

export const NuevaAltaUnica: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll al inicio del formulario al cambiar de paso
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    const mainCanvas = contentRef.current?.closest("main");
    if (mainCanvas) {
      mainCanvas.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Dialogs States
  const [openValidationDialog, setOpenValidationDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openSaveExitDialog, setOpenSaveExitDialog] = useState<boolean>(false);

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
    if (!tipoUsuario || tipoUsuario === "Selecciona..." || tipoUsuario === "Seleccionar..." || tipoUsuario === "") {
      setOpenValidationDialog(true);
    } else {
      setOpenConfirmDialog(true);
    }
  };

  const handleSaveAndExit = () => {
    setOpenSaveExitDialog(true);
  };

  const handleExitWithoutSaving = () => {
    navigate(AppRoutingPaths.ALTA_UNICA);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        mx: { xs: -2, sm: -3, md: -4 },
        mt: { xs: -2, sm: -3, md: -4 },
        mb: { xs: -2, sm: -3, md: -4 },
      }}
    >
      {/* AREA DE CONTENIDO / FORMULARIO (Tiene su propio scroll y ancla) */}
      <Box
        ref={contentRef}
        id="top-alta-unica-anchor"
        sx={{
          flex: 1,
          overflowY: "auto",
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
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
              onClick={handleSaveAndExit}
              startIcon={<LogoutOutlinedIcon />}
              size="small"
              color="inherit"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                borderColor: "divider",
                padding: '5px 10px',
                height: 24,
                backgroundColor: "background.paper",
                "&:hover": {
                  backgroundColor: "action.hover",
                  borderColor: "text.disabled",
                },
              }}
            >
              Salir y guardar
            </Button>

            <Typography variant="body2" color="text.secondary">
              /
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              Nueva Alta Única
            </Typography>
          </Stack>

          {/* Stepper dinámico y reutilizable */}
          <AltaUnicaStepper currentStep={currentStep} />
        </Box>

        {/* PASO 1: DATOS PERSONALES */}
        {currentStep === 1 && (
          <Step1DatosPersonales
            nombre={nombre}
            setNombre={setNombre}
            apellidoPaterno={apellidoPaterno}
            setApellidoPaterno={setApellidoPaterno}
            apellidoMaterno={apellidoMaterno}
            setApellidoMaterno={setApellidoMaterno}
            fechaNacimiento={fechaNacimiento}
            setFechaNacimiento={setFechaNacimiento}
            curp={curp}
            setCurp={setCurp}
            correo={correo}
            setCorreo={setCorreo}
            telefono={telefono}
            setTelefono={setTelefono}
            genero={genero}
            setGenero={setGenero}
            corporacion={corporacion}
            setCorporacion={setCorporacion}
            asociacion={asociacion}
            setAsociacion={setAsociacion}
            empresa={empresa}
            setEmpresa={setEmpresa}
            programaAcademico={programaAcademico}
            setProgramaAcademico={setProgramaAcademico}
            rutaEstudios={rutaEstudios}
            setRutaEstudios={setRutaEstudios}
            tipoUsuario={tipoUsuario}
            setTipoUsuario={setTipoUsuario}
            estado={estado}
            setEstado={setEstado}
            ciudad={ciudad}
            setCiudad={setCiudad}
            centro={centro}
            setCentro={setCentro}
            region={region}
            setRegion={setRegion}
            puesto={puesto}
            setPuesto={setPuesto}
            calle={calle}
            setCalle={setCalle}
            numero={numero}
            setNumero={setNumero}
            colonia={colonia}
            setColonia={setColonia}
            delegacion={delegacion}
            setDelegacion={setDelegacion}
            cp={cp}
            setCp={setCp}
            correoEmpresa={correoEmpresa}
            setCorreoEmpresa={setCorreoEmpresa}
            redesSociales={redesSociales}
            setRedesSociales={setRedesSociales}
            handleAddRedSocial={handleAddRedSocial}
            handleRemoveRedSocial={handleRemoveRedSocial}
            telefonos={telefonos}
            setTelefonos={setTelefonos}
            handleAddTelefono={handleAddTelefono}
            handleRemoveTelefono={handleRemoveTelefono}
            horariosLlamada={horariosLlamada}
            setHorariosLlamada={setHorariosLlamada}
            accesoInternet={accesoInternet}
            setAccesoInternet={setAccesoInternet}
            elegible={elegible}
            setElegible={setElegible}
            interesado={interesado}
            setInteresado={setInteresado}
            campana={campana}
            setCampana={setCampana}
            responsable={responsable}
            setResponsable={setResponsable}
            comentarios={comentarios}
            setComentarios={setComentarios}
          />
        )}

        {/* PASO 2: DOCUMENTOS */}
        {currentStep === 2 && (
          <Step2Documentos
            rutaFormacion={rutaFormacion}
            setRutaFormacion={setRutaFormacion}
            modalidadExpediente={modalidadExpediente}
            setModalidadExpediente={setModalidadExpediente}
            estatusRecepcion={estatusRecepcion}
            setEstatusRecepcion={setEstatusRecepcion}
            doc1Accion={doc1Accion}
            setDoc1Accion={setDoc1Accion}
            doc1Condicion={doc1Condicion}
            setDoc1Condicion={setDoc1Condicion}
            doc1Obs={doc1Obs}
            setDoc1Obs={setDoc1Obs}
            doc2Accion={doc2Accion}
            setDoc2Accion={setDoc2Accion}
            doc2Condicion={doc2Condicion}
            setDoc2Condicion={setDoc2Condicion}
            doc2Obs={doc2Obs}
            setDoc2Obs={setDoc2Obs}
            doc3Condicion={doc3Condicion}
            setDoc3Condicion={setDoc3Condicion}
            doc3Obs={doc3Obs}
            setDoc3Obs={setDoc3Obs}
            openDoc4={openDoc4}
            setOpenDoc4={setOpenDoc4}
            doc4Accion={doc4Accion}
            setDoc4Accion={setDoc4Accion}
            doc4Condicion={doc4Condicion}
            setDoc4Condicion={setDoc4Condicion}
            doc4Obs={doc4Obs}
            setDoc4Obs={setDoc4Obs}
            openDoc5={openDoc5}
            setOpenDoc5={setOpenDoc5}
            doc5Accion={doc5Accion}
            setDoc5Accion={setDoc5Accion}
            doc5Condicion={doc5Condicion}
            setDoc5Condicion={setDoc5Condicion}
            doc5Obs={doc5Obs}
            setDoc5Obs={setDoc5Obs}
            openDoc6={openDoc6}
            setOpenDoc6={setOpenDoc6}
            doc6Accion={doc6Accion}
            setDoc6Accion={setDoc6Accion}
            doc6Condicion={doc6Condicion}
            setDoc6Condicion={setDoc6Condicion}
            doc6Obs={doc6Obs}
            setDoc6Obs={setDoc6Obs}
            doc7Obs={doc7Obs}
            setDoc7Obs={setDoc7Obs}
          />
        )}

        {/* PASO 3: INSCRIPCIÓN */}
        {currentStep === 3 && (
          <Step3Inscripcion
            insRutaFormacion={insRutaFormacion}
            setInsRutaFormacion={setInsRutaFormacion}
            insGeneracion={insGeneracion}
            setInsGeneracion={setInsGeneracion}
            insPeriodo={insPeriodo}
            setInsPeriodo={setInsPeriodo}
          />
        )}

        {/* PASO 4: CONFIRMACIÓN */}
        {currentStep === 4 && (
          <Step4Confirmacion
            nombre={nombre}
            apellidoPaterno={apellidoPaterno}
            apellidoMaterno={apellidoMaterno}
            curp={curp}
            fechaNacimiento={fechaNacimiento || "12 de enero de 2000"}
            correo={correo || "garcia.elena@correo.com"}
            telefono={telefono || "55 1234 5678"}
            rutaEstudios={insRutaFormacion !== "Seleccionar ruta..." ? insRutaFormacion : rutaEstudios}
            generacionGrupo={`${insGeneracion !== "Seleccionar generación..." ? insGeneracion : "Gen 2024-A"} · Grupo A - Presencial`}
          />
        )}
      </Box>

      {/* FOOTER ACCIONES (Fijo al fondo del canvas main) */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E5E7EB",
          py: 1.5,
          px: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.05)",
          zIndex: 10,
          mb: "-32px",
        }}
      >
        {/* Lado Izquierdo: Únicamente el botón Anterior */}
        <Box>
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
        </Box>

        {/* Lado Derecho: Leyenda + Botón de Acción Principal (Continuar o Inscribir) */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.82rem" }}
          >
            Paso {currentStep} de 4
          </Typography>

          {currentStep === 4 ? (
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
          ) : (
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
          )}
        </Stack>
      </Box>

      {/* DIÁLOGOS DE VALIDACIÓN Y CONFIRMACIÓN */}
      <CamposObligatoriosDialog open={openValidationDialog} onClose={() => setOpenValidationDialog(false)} />
      <ConfirmacionInscripcionDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={() => {
          setOpenConfirmDialog(false);
          setOpenSuccessDialog(true);
        }}
      />
      <AlumnoInscritoDialog
        open={openSuccessDialog}
        onClose={() => {
          setOpenSuccessDialog(false);
          navigate(AppRoutingPaths.ALTA_UNICA);
        }}
        onViewDetails={() => {
          setOpenSuccessDialog(false);
          navigate(AppRoutingPaths.ALTA_UNICA);
        }}
      />
      <GuardarSalirDialog 
        open={openSaveExitDialog}
        onClose={() => setOpenSaveExitDialog(false)}
        onConfirm={handleExitWithoutSaving}
      />
    </Box>
  );
};

export default NuevaAltaUnica;