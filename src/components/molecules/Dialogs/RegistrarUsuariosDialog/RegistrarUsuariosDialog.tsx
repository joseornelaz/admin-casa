import React from "react";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { useNotification } from "../../../../providers/NotificationProvider";
import type { EstadoUsuario, NivelAcceso, NuevoUsuario, RolUsuario, TipoUsuario } from "../../../../types/Usuario.interface";
import { createButtonSx, fieldSx, primaryButtonSx, secondaryButtonSx } from "@styles";

export type RegistrarUsuariosDialogProps = {
  isOpen?: boolean;
  onClose: () => void;
  /** Se dispara al confirmar el alta, antes de cerrar el diálogo. */
  onCreated?: (usuario: NuevoUsuario) => void;
};

type FormState = {
  nombre: string;
  correo: string;
  telefono: string;
  tipoUsuario: TipoUsuario;
  estado: EstadoUsuario;
  rol: RolUsuario | "";
  permisos: string[];
  nivelAcceso: NivelAcceso;
  campus: string;
  programa: string;
  unidadAcademica: string;
};

type UpdateForm = <K extends keyof FormState,>(field: K, value: FormState[K]) => void;

/* -------------------------------------------------------------------------- */
/*                                 Constantes                                 */
/* -------------------------------------------------------------------------- */

const STEPS = ["General", "Tipo", "Roles", "Asignación", "Confirmación"] as const;

const ROLES: RolUsuario[] = ["Administrador", "Asesor", "Docente", "Tutor", "Coordinador"];

const PERMISOS = [
  "Ver reportes",
  "Gestionar alumnos",
  "Publicar cursos",
  "Configurar sistema",
] as const;

const CAMPUS = ["Campus Norte", "Campus Sur", "Campus Centro"] as const;

const PROGRAMAS = [
  "Todos los programas",
  "Licenciatura",
  "Maestría",
  "Doctorado",
  "Educación continua",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createInitialForm = (): FormState => ({
  nombre: "",
  correo: "",
  telefono: "",
  tipoUsuario: "Personal interno",
  estado: "Activo",
  rol: "",
  permisos: [],
  nivelAcceso: "Estándar",
  campus: "",
  programa: "Todos los programas",
  unidadAcademica: "",
});

/* -------------------------------------------------------------------------- */
/*                              Sub-componentes                               */
/* -------------------------------------------------------------------------- */

type StepItemProps = {
  index: number;
  label: string;
  activeStep: number;
  isLast: boolean;
  onStepClick: (index: number) => void;
};

const StepItem: React.FC<StepItemProps> = ({ index, label, activeStep, isLast, onStepClick }) => {
  const isActive = index === activeStep;
  const isCompleted = index < activeStep;
  const canNavigate = index < activeStep;
  const activeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!isActive || !activeRef.current) return;
    const container = activeRef.current.closest("[data-usuario-stepper]");
    if (!(container instanceof HTMLElement)) return;

    const targetLeft =
      activeRef.current.offsetLeft - (container.clientWidth - activeRef.current.clientWidth) / 2;

    container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [isActive]);

  return (
    <React.Fragment>
      <ButtonBase
        ref={isActive ? activeRef : undefined}
        disabled={!canNavigate}
        onClick={() => onStepClick(index)}
        aria-current={isActive ? "step" : undefined}
        aria-label={`Paso ${index + 1}: ${label}`}
        sx={{
          flexShrink: 0,
          px: isActive ? 1.1 : 0.5,
          py: 0.4,
          borderRadius: "18px",
          backgroundColor: isActive ? "#EEF2FF" : "transparent",
          transition: "background-color 0.2s ease",
          "&.Mui-disabled": {
            opacity: 1,
          },
          ...(canNavigate && {
            "&:hover": { backgroundColor: "#F5F6F8" },
          }),
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              width: 21,
              height: 21,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isActive || isCompleted ? "#2563EB" : "#FFFFFF",
              border: isActive || isCompleted ? "1px solid #2563EB" : "1px solid #E5E7EB",
              color: isActive || isCompleted ? "#FFFFFF" : "#9CA3AF",
              fontSize: "0.68rem",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {index + 1}
          </Box>
          <Typography
            component="span"
            sx={{
              fontSize: "0.78rem",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "#2563EB" : isCompleted ? "#374151" : "#9CA3AF",
              whiteSpace: "nowrap",
              lineHeight: 1.2,
            }}
          >
            {label}
          </Typography>
        </Box>
      </ButtonBase>

      {!isLast && (
        <Box
          aria-hidden
          sx={{
            flexShrink: 0,
            width: 14,
            height: 1,
            backgroundColor: "#D1D5DB",
          }}
        />
      )}
    </React.Fragment>
  );
};

type UsuarioStepperProps = {
  activeStep: number;
  onStepClick: (index: number) => void;
};

const UsuarioStepper: React.FC<UsuarioStepperProps> = ({ activeStep, onStepClick }) => (
  <Box
    data-usuario-stepper
    role="group"
    aria-label="Pasos para registrar un usuario"
    sx={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      px: 3,
      pb: 1.25,
      overflowX: "auto",
      overflowY: "hidden",
      scrollbarWidth: "thin",
      scrollbarColor: "#D1D5DB transparent",
      "&::-webkit-scrollbar": {
        height: 4,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#D1D5DB",
        borderRadius: 4,
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },
    }}
  >
    {STEPS.map((label, index) => (
      <StepItem
        key={label}
        index={index}
        label={label}
        activeStep={activeStep}
        isLast={index === STEPS.length - 1}
        onStepClick={onStepClick}
      />
    ))}
  </Box>
);

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  value: T;
  options: ReadonlyArray<SegmentedOption<T>>;
  onChange: (value: T) => void;
  ariaLabel: string;
  variant?: "filled" | "outlined";
  activeColor?: string;
};

function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  variant = "filled",
  activeColor = "#111827",
}: SegmentedControlProps<T>) {
  const isFilled = variant === "filled";

  return (
    <Box
      role="radiogroup"
      aria-label={ariaLabel}
      sx={{
        display: "flex",
        gap: isFilled ? 0 : 1,
        p: isFilled ? "3px" : 0,
        backgroundColor: isFilled ? "#F0F1F2" : "transparent",
        borderRadius: "10px",
      }}
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <ButtonBase
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            sx={{
              flex: 1,
              minHeight: 38,
              px: 1.5,
              borderRadius: "9px",
              fontSize: "0.85rem",
              fontWeight: isSelected ? 600 : 500,
              color: isSelected ? activeColor : "#6B7280",
              backgroundColor: isSelected ? "#FFFFFF" : "transparent",
              border: isFilled ? "none" : "1px solid",
              borderColor: isSelected ? "#2563EB" : "#E5E7EB",
              boxShadow: isFilled && isSelected ? "0 1px 3px rgba(17, 24, 39, 0.14)" : "none",
              transition: "background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease",
              ...(!isFilled &&
                isSelected && {
                  backgroundColor: "#EEF2FF",
                  color: "#2563EB",
                }),
              "&:hover": {
                backgroundColor: isSelected
                  ? isFilled
                    ? "#FFFFFF"
                    : "#EEF2FF"
                  : isFilled
                    ? "rgba(255, 255, 255, 0.55)"
                    : "#F9FAFB",
              },
            }}
          >
            {option.label}
          </ButtonBase>
        );
      })}
    </Box>
  );
}

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    component="p"
    sx={{
      fontSize: "0.82rem",
      fontWeight: 500,
      color: "#4B5563",
      mb: 0.75,
      lineHeight: 1.3,
    }}
  >
    {children}
  </Typography>
);

/* ------------------------------- Paso 1 ---------------------------------- */

type StepGeneralProps = {
  form: FormState;
  update: UpdateForm;
  correoInvalido: boolean;
};

const StepGeneral: React.FC<StepGeneralProps> = ({ form, update, correoInvalido }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <TextField
      label="Nombre completo *"
      placeholder="Apellidos, Nombre"
      value={form.nombre}
      onChange={(event) => update("nombre", event.target.value)}
      autoFocus
      slotProps={{ inputLabel: { shrink: true } }}
    //   sx={fieldSx}
    />

    <TextField
      label="Correo electrónico *"
      placeholder="nombre@casa.edu.mx"
      type="email"
      value={form.correo}
      onChange={(event) => update("correo", event.target.value)}
      error={correoInvalido}
      helperText={correoInvalido ? "Ingresa un correo electrónico válido" : undefined}
      slotProps={{ inputLabel: { shrink: true } }}
      sx={{
        // ...fieldSx,
        ...(correoInvalido && {
          "& .MuiFormHelperText-root": {
            mt: 0.5,
            mx: 0.25,
            fontSize: "0.72rem",
          },
        }),
      }}
    />

    <TextField
      label="Teléfono (opcional)"
      placeholder="662 000 0000"
      type="tel"
      value={form.telefono}
      onChange={(event) => update("telefono", event.target.value)}
      slotProps={{
        inputLabel: { shrink: true },
        htmlInput: { inputMode: "tel" },
      }}
    //   sx={fieldSx}
    />
  </Box>
);

/* ------------------------------- Paso 2 ---------------------------------- */

type StepTipoProps = {
  form: FormState;
  update: UpdateForm;
};

const StepTipo: React.FC<StepTipoProps> = ({ form, update }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
    <Box>
      <FieldLabel>Tipo de usuario</FieldLabel>
      <SegmentedControl<TipoUsuario>
        ariaLabel="Tipo de usuario"
        value={form.tipoUsuario}
        onChange={(value) => update("tipoUsuario", value)}
        options={[
          { value: "Personal interno", label: "Personal interno" },
          { value: "Colaborador externo", label: "Colaborador externo" },
        ]}
      />
    </Box>

    <Box>
      <FieldLabel>Estado</FieldLabel>
      <SegmentedControl<EstadoUsuario>
        ariaLabel="Estado del usuario"
        value={form.estado}
        onChange={(value) => update("estado", value)}
        activeColor="#15803D"
        options={[
          { value: "Activo", label: "Activo" },
          { value: "Inactivo", label: "Inactivo" },
        ]}
      />
    </Box>
  </Box>
);

/* ------------------------------- Paso 3 ---------------------------------- */

type StepRolesProps = {
  form: FormState;
  update: UpdateForm;
  togglePermiso: (permiso: string) => void;
};

const StepRoles: React.FC<StepRolesProps> = ({ form, update, togglePermiso }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}>
    <FormControl fullWidth size="small">
        <InputLabel id="rol-label">Rol</InputLabel>
        <Select
            labelId="rol-label"
            label="Rol"
            value={form.rol}
            onChange={(event) => update("rol", event.target.value as RolUsuario)}
            sx={{ borderRadius: "10px" }}
        >
        {ROLES.map((rol) => (
            <MenuItem key={rol} value={rol} sx={{ fontSize: "0.88rem" }}>
            {rol}
            </MenuItem>
        ))}
        </Select>
    </FormControl>
    {/* <TextField
      select
      label="Rol"
      value={form.rol}
      onChange={(event) => update("rol", event.target.value as RolUsuario)}
      slotProps={{
        inputLabel: { shrink: true },
        select: {
          displayEmpty: true,
          renderValue: (selected) =>
            selected ? (
              String(selected)
            ) : (
              <Box component="span" sx={{ color: "#9CA3AF" }}>
                Selecciona un rol
              </Box>
            ),
        },
      }}    
    >
      {ROLES.map((rol) => (
        <MenuItem key={rol} value={rol} sx={{ fontSize: "0.88rem" }}>
          {rol}
        </MenuItem>
      ))}
    </TextField> */}

    <Box>
      <FieldLabel>Permisos</FieldLabel>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {PERMISOS.map((permiso) => {
          const selected = form.permisos.includes(permiso);

          return (
            <Chip
              key={permiso}
              label={permiso}
              clickable
              aria-pressed={selected}
              onClick={() => togglePermiso(permiso)}
              sx={{
                height: 30,
                borderRadius: "16px",
                border: "1px solid",
                borderColor: selected ? "#2563EB" : "#E5E7EB",
                backgroundColor: selected ? "#EEF2FF" : "#FFFFFF",
                color: selected ? "#2563EB" : "#6B7280",
                fontWeight: 500,
                fontSize: "0.8rem",
                "& .MuiChip-label": { px: 1.6 },
                "&:hover": {
                  backgroundColor: selected ? "#E0E7FF" : "#F9FAFB",
                },
              }}
            />
          );
        })}
      </Box>
    </Box>

    <Box>
      <FieldLabel>Nivel de acceso</FieldLabel>
      <SegmentedControl<NivelAcceso>
        ariaLabel="Nivel de acceso"
        variant="outlined"
        value={form.nivelAcceso}
        onChange={(value) => update("nivelAcceso", value)}
        options={[
          { value: "Básico", label: "Básico" },
          { value: "Estándar", label: "Estándar" },
          { value: "Avanzado", label: "Avanzado" },
        ]}
      />
    </Box>
  </Box>
);

/* ------------------------------- Paso 4 ---------------------------------- */

type StepAsignacionProps = {
  form: FormState;
  update: UpdateForm;
};

const selectPlaceholderSx = {
  color: "#9CA3AF",
} as const;

const StepAsignacion: React.FC<StepAsignacionProps> = ({ form, update }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <FormControl fullWidth size="small">
        <InputLabel id="Campus-label">Campus</InputLabel>
        <Select
            labelId="Campus-label"
            label="Campus"
            value={form.campus}
            onChange={(event) => update("campus", event.target.value)}
            sx={{ borderRadius: "10px" }}
        >
        {CAMPUS.map((campus) => (
            <MenuItem key={campus} value={campus} sx={{ fontSize: "0.88rem" }}>
            {campus}
            </MenuItem>
        ))}
        </Select>
    </FormControl>
    {/* <TextField
      select
      label="Campus"
      value={form.campus}
      onChange={(event) => update("campus", event.target.value)}
      slotProps={{
        inputLabel: { shrink: true },
        select: {
          displayEmpty: true,
          renderValue: (selected) =>
            selected ? (
              String(selected)
            ) : (
              <Box component="span" sx={selectPlaceholderSx}>
                Selecciona un campus
              </Box>
            ),
        },
      }}
    //   sx={fieldSx}
    >
      {CAMPUS.map((campus) => (
        <MenuItem key={campus} value={campus} sx={{ fontSize: "0.88rem" }}>
          {campus}
        </MenuItem>
      ))}
    </TextField> */}

    <FormControl fullWidth size="small">
        <InputLabel id="programa-label">Programa (opcional)</InputLabel>
        <Select
            labelId="programa-label"
            label="Programa (opcional)"
            value={form.programa}
            onChange={(event) => update("programa", event.target.value)}
            sx={{ borderRadius: "10px" }}
        >
        {PROGRAMAS.map((programa) => (
            <MenuItem key={programa} value={programa} sx={{ fontSize: "0.88rem" }}>
            {programa}
            </MenuItem>
        ))}
        </Select>
    </FormControl>

    {/* <TextField
      select
      label="Programa (opcional)"
      value={form.programa}
      onChange={(event) => update("programa", event.target.value)}
      slotProps={{ inputLabel: { shrink: true } }}
    //   sx={fieldSx}
    >
      {PROGRAMAS.map((programa) => (
        <MenuItem key={programa} value={programa} sx={{ fontSize: "0.88rem" }}>
          {programa}
        </MenuItem>
      ))}
    </TextField> */}

    <TextField
      label="Unidad académica (opcional)"
      placeholder="Ej. Escuela de Negocios"
      value={form.unidadAcademica}
      onChange={(event) => update("unidadAcademica", event.target.value)}
      slotProps={{ inputLabel: { shrink: true } }}
    //   sx={fieldSx}
    />
  </Box>
);

/* ------------------------------- Paso 5 ---------------------------------- */

type SummaryRowProps = {
  label: string;
  value: string;
  last?: boolean;
  muted?: boolean;
};

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value, last = false, muted = false }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      px: 2,
      py: 1.35,
      borderBottom: last ? "none" : "1px solid #F0F1F3",
    }}
  >
    <Typography sx={{ fontSize: "0.78rem", color: "#9CA3AF", lineHeight: 1.3 }}>
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: "0.82rem",
        fontWeight: muted ? 500 : 600,
        color: muted ? "#6B7280" : "#111827",
        textAlign: "right",
        lineHeight: 1.35,
        wordBreak: "break-word",
      }}
    >
      {value}
    </Typography>
  </Box>
);

type StepConfirmacionProps = {
  form: FormState;
};

const StepConfirmacion: React.FC<StepConfirmacionProps> = ({ form }) => (
  <Box>
    <Typography sx={{ fontSize: "0.85rem", color: "#4B5563", mb: 2, lineHeight: 1.45 }}>
      Revisa la información antes de crear el usuario.
    </Typography>

    <Box
      sx={{
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      <SummaryRow label="Nombre" value={form.nombre.trim() || "—"} />
      <SummaryRow label="Correo" value={form.correo.trim() || "—"} />
      <SummaryRow label="Rol" value={form.rol || "Sin rol"} />
      <SummaryRow
        label="Permisos"
        value={form.permisos.length > 0 ? form.permisos.join(", ") : "Sin permisos adicionales"}
        muted={form.permisos.length === 0}
      />
      <SummaryRow label="Nivel de acceso" value={form.nivelAcceso} />
      <SummaryRow label="Campus" value={form.campus || "—"} />
      <SummaryRow label="Estado" value={form.estado} last />
    </Box>
  </Box>
);

/* -------------------------------------------------------------------------- */
/*                              Componente base                               */
/* -------------------------------------------------------------------------- */

export const RegistrarUsuariosDialog: React.FC<RegistrarUsuariosDialogProps> = ({
  isOpen = false,
  onClose,
  onCreated,
}) => {
  const { showNotification } = useNotification();
  const [activeStep, setActiveStep] = React.useState(0);
  const [form, setForm] = React.useState<FormState>(createInitialForm);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const wasOpenRef = React.useRef(false);

  const resetForm = React.useCallback(() => {
    setActiveStep(0);
    setForm(createInitialForm());
  }, []);

  // Reinicia el flujo cada vez que el diálogo se abre (no al cerrarse,
  // para evitar que el contenido parpadee durante la transición de salida).
  React.useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      resetForm();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, resetForm]);

  // Al cambiar de paso, el contenido vuelve al inicio.
  React.useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const update = React.useCallback(<K extends keyof FormState,>(field: K, value: FormState[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  }, []);

  const togglePermiso = React.useCallback((permiso: string) => {
    setForm((previous) => {
      const isSelected = previous.permisos.includes(permiso);

      return {
        ...previous,
        permisos: isSelected
          ? previous.permisos.filter((item) => item !== permiso)
          : [...previous.permisos, permiso],
      };
    });
  }, []);

  const correoInvalido = form.correo.length > 0 && !EMAIL_REGEX.test(form.correo.trim());

  const isGeneralValid = form.nombre.trim().length > 0 && EMAIL_REGEX.test(form.correo.trim());
  const isRolesValid = form.rol !== "";
  const isAsignacionValid = form.campus !== "";

  const canContinue =
    activeStep === 0
      ? isGeneralValid
      : activeStep === 2
        ? isRolesValid
        : activeStep === 3
          ? isAsignacionValid
          : true;

  const handleNext = () => {
    if (!canContinue) return;
    setActiveStep((previous) => Math.min(previous + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setActiveStep((previous) => Math.max(previous - 1, 0));
  };

  const handleStepClick = (index: number) => {
    if (index < activeStep) {
      setActiveStep(index);
    }
  };

  const handleCreate = () => {
    if (!form.rol) return;

    const nuevoUsuario: NuevoUsuario = {
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      telefono: form.telefono.trim(),
      tipoUsuario: form.tipoUsuario,
      estado: form.estado,
      rol: form.rol,
      permisos: form.permisos,
      nivelAcceso: form.nivelAcceso,
      campus: form.campus,
      programa: form.programa,
      unidadAcademica: form.unidadAcademica.trim(),
    };

    onCreated?.(nuevoUsuario);
    showNotification("Usuario creado correctamente", "success");
    onClose();
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepGeneral form={form} update={update} correoInvalido={correoInvalido} />
        );
      case 1:
        return <StepTipo form={form} update={update} />;
      case 2:
        return <StepRoles form={form} update={update} togglePermiso={togglePermiso} />;
      case 3:
        return <StepAsignacion form={form} update={update} />;
      case 4:
        return <StepConfirmacion form={form} />;
      default:
        return null;
    }
  };

  const isConfirmation = activeStep === STEPS.length - 1;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      sxProps={{
        width: "540px",
        maxWidth: "calc(100vw - 32px)",
        borderRadius: "18px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 24px 60px rgba(17, 24, 39, 0.22)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "90vh", backgroundColor: "#FFFFFF" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            px: 3,
            pt: 2.5,
            pb: 1.5,
            flexShrink: 0,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.35,
            }}
          >
            Nuevo usuario
          </Typography>
          <IconButton
            size="small"
            aria-label="Cerrar"
            onClick={onClose}
            sx={{
              color: "#9CA3AF",
              mt: -0.25,
              "&:hover": { backgroundColor: "#F3F4F6", color: "#4B5563" },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <UsuarioStepper activeStep={activeStep} onStepClick={handleStepClick} />

        {/* Contenido del paso */}
        <Box
          ref={contentRef}
          sx={{
            px: 3,
            pt: 2,
            pb: 2.5,
            minHeight: { xs: 210, sm: 224 },
            overflowY: "auto",
            flex: 1,
          }}
        >
          {renderStep()}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            px: 3,
            py: 2,
            borderTop: "1px solid #E5E7EB",
            flexShrink: 0,
          }}
        >
          <Button
            variant="outlined"
            onClick={activeStep === 0 ? onClose : handleBack}
            sx={secondaryButtonSx}
          >
            {activeStep === 0 ? "Cancelar" : "Anterior"}
          </Button>

          {isConfirmation ? (
            <Button
              variant="contained"
              disableElevation
              onClick={handleCreate}
              startIcon={<CheckIcon sx={{ fontSize: 18 }} />}
              sx={createButtonSx}
            >
              Crear usuario
            </Button>
          ) : (
            <Button
              variant="contained"
              disableElevation
              disabled={!canContinue}
              onClick={handleNext}
              sx={primaryButtonSx}
            >
              Continuar
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};
