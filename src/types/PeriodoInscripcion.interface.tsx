export interface PeriodoInscripcion {
  id: number;                 // Corresponde al tag "PERIODO-0001"
  nombrePeriodo: string;      // Select "Materia" (ej. "Diseño de Interfaces I")
  inicioInscripcion: string;  // Input fecha "Inicio de inscripción" (ej. "2025-09-01")
  finInscripcion: string;     // Input fecha "Fin de inscripción" (ej. "2025-09-30")
  inicioPlataforma: string;   // Input fecha "Inicio en plataforma"  
  estatusPeriodo: string; // Select "Estatus del periodo" + badge verde    
  fechaCreacion?: string;      // Icono calendario "Creación" (ej. "2025-09-26")  
  enabled?: boolean;             // Indica si el periodo está habilitado o no
}

export interface PeriodoInscripcionPayload {
  nombrePeriodo: string;      // Select "Materia" (ej. "Diseño de Interfaces I")
  inicioInscripcion: string;  // Input fecha "Inicio de inscripción" (ej. "2025-09-01")
  finInscripcion: string;     // Input fecha "Fin de inscripción" (ej. "2025-09-30")
  inicioPlataforma: string;   // Input fecha "Inicio en plataforma"  
  idEstatusPeriodo: number;   // Select "Estatus del periodo" + badge verde
  estatusPeriodo: string;     // Select "Estatus del periodo" + badge verde
}