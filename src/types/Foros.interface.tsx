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
    data:    ListadoGrupoAlumnos[];
}

export interface ListadoGrupoAlumnos {
    id_grupo:     number;
    nombre_grupo: string;
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
