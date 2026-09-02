import React from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  FormControlLabel,
  IconButton,
  Divider,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { type Step1Props } from "./types";

export const Step1DatosPersonales: React.FC<Step1Props> = ({
  nombre,
  setNombre,
  apellidoPaterno,
  setApellidoPaterno,
  apellidoMaterno,
  setApellidoMaterno,
  fechaNacimiento,
  setFechaNacimiento,
  curp,
  setCurp,
  correo,
  setCorreo,
  telefono,
  setTelefono,
  genero,
  setGenero,
  corporacion,
  setCorporacion,
  asociacion,
  setAsociacion,
  empresa,
  setEmpresa,
  programaAcademico,
  setProgramaAcademico,
  rutaEstudios,
  setRutaEstudios,
  tipoUsuario,
  setTipoUsuario,
  estado,
  setEstado,
  ciudad,
  setCiudad,
  centro,
  setCentro,
  region,
  setRegion,
  puesto,
  setPuesto,
  calle,
  setCalle,
  numero,
  setNumero,
  colonia,
  setColonia,
  delegacion,
  setDelegacion,
  cp,
  setCp,
  correoEmpresa,
  setCorreoEmpresa,
  redesSociales,
  setRedesSociales,
  handleAddRedSocial,
  handleRemoveRedSocial,
  telefonos,
  setTelefonos,
  handleAddTelefono,
  handleRemoveTelefono,
  horariosLlamada,
  setHorariosLlamada,
  accesoInternet,
  setAccesoInternet,
  elegible,
  setElegible,
  interesado,
  setInteresado,
  campana,
  setCampana,
  responsable,
  setResponsable,
  comentarios,
  setComentarios,
}) => {
  return (
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
        <Stack>
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
        <Stack>
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
        <Stack>
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
          <Box sx={{my: 1}}>
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
        <Stack spacing={1.5}>
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
  );
};
