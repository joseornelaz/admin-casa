export interface VigenciaPayload {
  idMateria: number;       // Select "Materia" (ej. "Diseño de Interfaces I")
  nombre: string;     // Input nombre del grupo (ej. "Grupo A")
  descripcionGrupo: string;     // Input descripción del grupo (ej. "Grupo de estudio para la materia X")
  fechaInicio: string;     // Input fecha Inicio (ej. "2025-09-01")
  fechaFin: string;   // Input fecha fin (ej. "2025-09-30")  
  tipoGrupo: string;
  tutor: number;
}

export interface Vigencia {
  id: number;                 // Corresponde al tag "PERIODO-0001"
  idMateria: number;       // Select "Materia" (ej. "Diseño de Interfaces I")
  materia: string;            // Select "Materia" (ej. "Diseño de Interfaces I")
  nombre: string;     // Input fecha "Fin de inscripción" (ej. "2025-09-30")
  fechaInicio: string;     // Input fecha "Fin de inscripción" (ej. "2025-09-30")
  fechaFin: string;   // Input fecha "Inicio en plataforma"  
  estatus: number;
  tipoVigencia: string;
}