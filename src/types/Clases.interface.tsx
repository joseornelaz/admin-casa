export interface ClasesResponse {
    success: boolean;
    data:    Clase[];
}

export interface Clase {
    id_tutoria:     number;
    titulo:         string;
    descripcion:    string;
    fecha_inicio:   string;
    fecha_fin:      string;
    calendario_url: string | null;
    reunion_url:    string;
    grabacion_url:  string | null;
    estatus:        string;
}

export interface CreateClasePayload {
    titulo:         string;
    descripcion:    string;
    fecha_inicio:   string;
    fecha_fin:      string;
    calendario_url: string | null;
    reunion_url:    string;
    grabacion_url:  string | null;
    id_grupo:       number;
}

export interface CreateClaseResponse {
    success: boolean;
    message: string;
    data?:   Clase;
}
