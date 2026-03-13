export interface ForosGrupoResponse {
    success: boolean;
    data:    ForosGrupo[];
}

export interface ForosGrupo {
    id_recurso: number;
    titulo:     string;
    tema_principal: string;
}


export interface ForosResponse {
    success: boolean;
    data:    Foros[];
}

export interface Foros {
    id_recurso:        number;
    id_entrega:        number;
    id_mensaje:        number;
    calificacion:      string;
    retroalimentacion: string;
    id_usuario:        number;
    alumno:            string;
    mensaje:           string;
    fecha_envio:       string;
}

export interface ListadoGrupoAlumnosResponse {
    success: boolean;
    data: {
        grupos: ListadoGrupoAlumnos[];
    };
}

export interface ListadoGrupoAlumnos {
    id_grupo:       number;
    id_curso:       number;
    nombre_grupo:   string;
    fecha_inicio:   string;
    fecha_fin:      string;
    estatus:        string;
    estatus_codigo: number;
}

export interface RespuestasForoResponse {
    success: boolean;
    data:    RespuestasForo[];
}

export interface RespuestasForo {
    id_recurso:        number;
    id_entrega:        null;
    id_mensaje:        number;
    calificacion:      null;
    retroalimentacion: null;
    id_usuario:        number;
    alumno:            string;
    mensaje:           string;
    fecha_envio:       Date;
}

export interface CalificarForoPayload {
    id_recurso: number;
    id_entrega: number | null;
    id_mensaje: number;
    calificacion: number;
    retroalimentacion: string;
}

export interface CalificarForoResponse {
    success: boolean;
    message: string;
}
