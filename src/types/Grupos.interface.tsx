export interface GrupoPayload {
  tipoGrupo: number;       // Select "Materia" (ej. "Diseño de Interfaces I")
  nombre: string;     // Input nombre del grupo (ej. "Grupo A")
  descripcion?: string;     // Input fecha Inicio (ej. "2025-09-01")
  tutor: number;   // Input fecha fin (ej. "2025-09-30")  
}

export interface Grupo {
  id: number;                 // Corresponde al tag "PERIODO-0001"
  tipoGrupo: number;       // Select "Materia" (ej. "Diseño de Interfaces I")
  nombre: string;     // Input nombre del grupo (ej. "Grupo A")
  descripcion: string;     // Input fecha Inicio (ej. "2025-09-01")
  tutor: number;   // Input fecha fin (ej. "2025-09-30")  
  nombreTutor: string; // Nombre del tutor (ej. "Cecilia Fornari")
  fechaRegistro: string; // Fecha de registro del grupo (ej. "2025-09-01")
  totalAlumnos: number; // Total de alumnos en el grupo (ej. 30)
  estatus: number;
}

export const tipoGrupoOptions = [
    { id: 1, label: 'Normal' },
    { id: 2, label: 'Especial' },
    { id: 3, label: 'Recursamiento' },
    { id: 4, label: 'Prueba' },
];