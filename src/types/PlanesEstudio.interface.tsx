export interface PlanEstudioTotalAlumnos {
    id_plan_estudio: number;
    nombre_plan: string;
    total_alumnos: number;
}


export interface EmpresaPlanesResponse {
    id: number;
    nombre: string;
    badgeText: string;
    badgeBgColor: string;
    badgeTextColor: string;
    programasCount: number;
    alumnosCount: number;
    programas: ProgramaAcademico[];
}

export interface ProgramaAcademico {
    id: number;
    nombre: string;
    alumnosCount: number;
    generacion: string;
    estado: "activa" | "futura" | "finalizada";
}

/** Espacio de trabajo activo: organización + plan. Única fuente de verdad en AuthContext. */
export interface PlanEstudioSeleccionado {
    id_plan: number;
    nombre_plan: string;
    id_empresa: number;
    nombre_empresa: string;
    badgeText: string;
}

export interface ProgramasAcademicosTotalCursosResponse {
    id_plan_estudio:            number;
    nombre_plan:                string;
    cod_plan:                   string | null;
    total_cursos:               number;
    modulos_promedio_por_curso: string;
}
