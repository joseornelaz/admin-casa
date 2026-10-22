export interface VigenciaPayload {
  // Paso 1: Vigencia y Grupo
  idMateria: number;       // Select "Materia" (ej. "Diseño de Interfaces I")
  nombre: string;          // Input nombre del grupo (ej. "Grupo A")
  descripcionGrupo: string; // Input descripción del grupo (ej. "Grupo de estudio para la materia X")
  fechaInicio: string;     // Input fecha Inicio (ej. "2025-09-01")
  fechaFin: string;        // Input fecha fin (ej. "2025-09-30")
  tipoGrupo: string;       // Select tipo de grupo (ej. "1")
  tutor: number;           // Select tutor (ej. 12)

  // Paso 2: Clases/Tutorias
  planEstudio?: string;    // Select plan de estudios (ej. "plan2025")
  servicio?: string;       // Select servicio (ej. "Video")
  tituloClase?: string;    // Input título de la clase
  linkAdmin?: string;      // Input link de administrador
  linkTutoria?: string;    // Input link de tutoría
  descripcionClase?: string; // Input descripción de la clase
  tipoClase?: string;      // Select tipo de clase (ej. "Ordinaria")
  materiaClase?: string;   // Select materia de la clase (id_curso)
  gruposSeleccionados?: string[]; // Checkboxes de grupos

  // Campos opcionales del flujo de edición
  tipoVigencia?: string;   // Select tipo de vigencia (ej. "Normal")
  fechaProrroga?: string;  // Input fecha de prórroga (ej. "2025-10-15")
  idPlanEstudio: number; // ID del plan de estudio (ej. 3)
}

export interface Vigencia {
  id: number;                 // Corresponde al tag "PERIODO-0001"
  idMateria: number;       // Select "Materia" (ej. "Diseño de Interfaces I")
  materia: string;            // Select "Materia" (ej. "Diseño de Interfaces I")
  nombre: string;     // Input fecha "Fin de inscripción" (ej. "2025-09-30")
  fechaInicio: string;     // Input fecha "Fin de inscripción" (ej. "2025-09-30")
  fechaFin: string;   // Input fecha "Inicio en plataforma"  
  fechaProrroga?: string; // Input fecha de prórroga (ej. "2025-10-15")
  estatus: number;
  tipoVigencia: string;
}
