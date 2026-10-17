export const LOGIN_ENDPOINTS = {
    POST_AUTH: { path: '/auth' },
    POST_LOGIN: { path: '/auth/login' },
    POST_LOGOUT: { path: '/auth/logout' },
    POST_NEW_PASSWORD: { path: '/auth/complete-new-password' },
}

export const PERFIL_ENDPOINTS = {
    GET_PERFIL: { path: '/perfil', key: 'perfil' },
    POST_PERFIL: { path: '/actualizar', key: 'actualizar' }
}

export const USUARIOS_ADMIN = {
    GET_USUARIOS: { path: '/usuarios', key: 'usuarios' },
    GET_USUARIOS_BY_ID: { path: '/usuarios/:id', key: 'usuarios-id' },
    POST_REGISTRAR_USUARIO: { path: '/usuarios', key: 'registrar-usuario' },
    PUT_ACTUALIZAR_USUARIO: { path: '/usuarios/:id', key: 'actualizar-usuario' },
    DELETE_ELIMINAR_USUARIO: { path: '/usuarios/:id', key: 'eliminar-usuario' },
}

export const FOROS_ADMIN = {
    GET_FORO_GRUPOS: { path: '/foros/grupo', key: 'foros-grupo'},
    GET_FORO_CALIFICAR: { path: '/calificaciones/foros', key: 'foros-calificaciones'},
    GET_GRUPOS_ASIGNADOS: { path: '/grupos/asignados', key: 'grupos-asignados'},
}

export const SALA_CONVERSACION = {
    GET_SALA_CONVERSACION: { path: '/sala-conversacion', key: 'get-id-conversacion' },
    GET_MENSAJES: { path: '/sala-conversacion/mensajes', key: 'sala-conversacion' },
    SET_MENSAJES: { path: 'sala-conversacion/mensajes/guardar', key: 'sala-conversacion-guardar' },
    DELETE_MENSAJES: { path: '/sala-conversacion/mensajes/eliminar', key: 'sala-conversacion-eliminar' },
    GET_TEMA_FORO_BY_ID: { path: '/sala-conversacion', key: 'tema-foro-by-id' },
}

export const PERIODOS_INSCRIPCION = {
    GET_PERIODOS_INSCRIPCION: { path: '/periodos-inscripcion', key: 'periodos-inscripcion' },
    POST_REGISTRAR_PERIODO: { path: '/periodos-inscripcion/registrar', key: 'registrar-periodo' },
    PUT_ACTUALIZAR_PERIODO: { path: '/periodos-inscripcion/actualizar', key: 'actualizar-periodo' },
    DELETE_ELIMINAR_PERIODO: { path: '/periodos-inscripcion/eliminar', key: 'eliminar-periodo' },
}

export const MATERIAS = {
    GET_MATERIAS: { path: '/materias', key: 'materias' },
}

export const CURSOS = {
    GET_CURSOS: { path: '/cursos', key: 'cursos' },
    POST_REGISTRAR_CURSO: { path: '/cursos', key: 'registrar-curso' },
    PUT_ACTUALIZAR_CURSO: { path: '/cursos/:id', key: 'actualizar-curso' },
    DELETE_ELIMINAR_CURSO: { path: '/cursos/:id', key: 'eliminar-curso' },

    GET_CURSOS_BY_PLAN: { path: '/cursos/planes/:id_plan', key: 'cursos-by-plan' },
}

export const MODULOS_CURSOS = {
    GET_MODULOS: { path: '/modulos/cursos/:id_curso', key: 'modulos' },
    POST_REGISTRAR_MODULO: { path: '/modulos/cursos/:id_curso', key: 'registrar-modulo' },
    PUT_ACTUALIZAR_MODULO: { path: '/modulos/:id_modulo', key: 'actualizar-modulo' },
    DELETE_MODULO: { path: '/modulos/:id_modulo', key: 'eliminar-modulo' },
    
    GET_LISTAR_LECCIONES_MODULO: { path: '/lecciones/modulos/:id_modulo', key: 'listar-lecciones-modulo' },
    GET_LISTAR_RECURSOS_MODULO: { path: '/recursos/lecciones/:id_leccion', key: 'listar-recursos-modulo' },

    POST_REGISTRAR_RECURSO: { path: '/recursos/lecciones/:id_leccion', key: 'registrar-recurso' },
    PUT_ACTUALIZAR_RECURSO: { path: '/recursos/:id_recurso', key: 'actualizar-recurso' },
    DELETE_RECURSO: { path: '/recursos/:id_recurso', key: 'eliminar-recurso' },
}

export const PLANES_ESTUDIO = {
    GET_PLANES_ESTUDIO_TOTAL_ALUMNOS: { path: '/planes/programas/academicos', key: 'planes-programas-academicos' },
    GET_PLANES_ESTUDIO_TOTAL_CURSOS: { path: '/planes/programas/academicos/total-cursos', key: 'planes-programas-academicos-cursos' },
}

export const CATALOGOS = {
    GET_ESTATUS_CURSOS: { path: '/catalogo/estados-curso', key: 'estatus-cursos' },
    GET_NIVELES: { path: '/catalogo/niveles', key: 'niveles' },
    GET_EMPRESAS: { path: '/catalogo/empresas', key: 'empresas' },
    GET_MODALIDADES: { path: '/catalogo/modalidades', key: 'modalidades' },
    GET_TIPOS_RECURSO: { path: '/catalogo/tipos-recurso', key: 'tipos-recurso' },
    GET_PROFESORES: { path: '/catalogo/profesores', key: 'profesores' },
} 