export interface ActividadesResponse {
    data: Actividad[];
    message: string;
    success: boolean;
}

export interface Actividad {
    id_actividad: number;
    titulo: string;
    descripcion: string;
    fecha_entrega: Date;
    id_curso: number;
    id_recurso: number;
}

export interface ActividadDetalleResponse {
    data: AlumnoActividad[];
    message: string;
    success: boolean;
}

export interface AlumnoActividad {
    id_entrega: number | null;
    id_usuario: number;
    alumno: string;
    fecha_envio: Date | null;
    fecha_entrega?: string | null; // Mapped from JSON
    calificacion: number | string | null;
    retroalimentacion: string | null;
    archivo_url: string | null;
    contenido_entregado: string | null;
    curso: string;
    recurso: string;
}

export interface CalificarActividadPayload {
    id_recurso: number;
    id_entrega: number | null;
    calificacion: number;
    retroalimentacion: string;
}

export interface CalificarActividadResponse {
    success: boolean;
    message: string;
}
