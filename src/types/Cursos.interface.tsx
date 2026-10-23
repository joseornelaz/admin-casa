export type ViewMode = 'list' | 'grid';

export interface ModuleData {
  id: string | number;
  title: string;
  status?: string;
  isMandatory?: boolean;
  items?: Array<{
    id: string | number;
    sectionTitle: string;
    title: string;
    format: string;
    type?: 'article' | 'assignment' | 'forum' | 'quiz';
  }>;
}

export interface CourseData {
  id: string;
  title: string;
  author: string;
  period?: string;
  isMandatory?: boolean;
  status?: 'Publicado' | 'Borrador' | 'En revisión' | 'Sin publicar';
  modulesCount: number;
  description?: string;
  publishedCount?: number;
  draftCount?: number;
  unpublishedCount?: number;
  modules?: ModuleData[];
}


export interface Curso {
    id_curso:            number;
    id_profesor:         number;
    id_estado_curso:     number;
    titulo:              string;
    descripcion:         string;
    precio:              string;
    fecha_creacion:      string;
    fecha_actualizacion: string;
    id_usuario_modifico: number;
    eliminado:           number;
    horas:               number;
    idioma:              string;
    id_nivel_dificultad: number;
    tipo_informacion:    string;
    id_modalidad:        number;
    estado_curso:        string;
    profesor_nombre:     string;
    nombre_modalidad:    string;
    total_modulos:       number;
    used_in_plans:       number;
    modulos?: ModuleData[];
}


export interface CreateModuloPayload {
  id_modulo:      number;
  id_curso:       number;
  titulo:         string;
  descripcion?:   string;
  orden?:         number;
}

export interface ModulosResponse {
    id_modulo:           number;
    id_curso:            number;
    titulo:              string;
    descripcion:         string;
    orden:               number;
    fecha_creacion:      string;
    fecha_actualizacion: string;
    id_usuario_modifico: number;
    eliminado:           number;
    total_lecciones:     number;
    id_leccion?:         number | null; // Agregado para vincular con lecciones
}


export interface LeccionesResponse {
    id_leccion:          number;
    id_modulo:           number;
    titulo:              string;
    contenido_texto:     string;
    orden:               number;
    duracion_minutos:    number;
    fecha_creacion:      string;
    fecha_actualizacion: string;
    id_usuario_modifico: number;
    eliminado:           number;
    total_recursos:      number;
}

export interface RecursosResponse {
    id_recurso:          number;
    id_leccion:          number;
    id_tipo_recurso:     number;
    titulo:              string;
    descripcion_html:    string;
    fecha_entrega:       string;
    instrucciones:       string;
    tipo_examen:         string;
    url:                 string;
    package_uuid:        string;
    tipo_material:       string;
    activo:              number;
    obligatorio:         number;
    ponderable:          number;
    orden:               number;
    eliminado:           number;
    fecha_creacion:      string;
    tipo_recurso_nombre: string;
    file?:               File | null; // Agregado para manejar archivos subidos 
}

/** Recursos de un módulo agrupados por tipo de recurso (ej. "Video", "Documento", "Examen") */
export type RecursosPorTipo = Record<string, RecursosResponse[]>;

/** Recursos agrupados por id de módulo y, dentro de cada módulo, por tipo de recurso */
export type RecursosPorModulo = Record<number, RecursosPorTipo>;


export interface CreateRecursoPayload {
    id_recurso:         number;
    id_leccion:         number;
    titulo:             string;
    descripcion_html:   string;
    id_tipo_recurso:    number;
    url:                string;
    package_uuid:       string;
    tipo_material:      string;
    tipo_examen:        string;
    file?:              File | null; // Agregado para manejar archivos subidos
}
