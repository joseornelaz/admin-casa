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
    GET_CURSOS: { path: '/academic/cursos', key: 'cursos' },
    POST_REGISTRAR_CURSO: { path: '/academic/cursos', key: 'registrar-curso' },
    PUT_ACTUALIZAR_CURSO: { path: '/academic/cursos/:id', key: 'actualizar-curso' },
    DELETE_ELIMINAR_CURSO: { path: '/academic/cursos/:id', key: 'eliminar-curso' },
}

export const MODULOS_CURSOS = {
    GET_MODULOS: { path: '/academic/cursos/:id_curso/modulos', key: 'modulos' },
    POST_REGISTRAR_MODULO: { path: '/academic/cursos/:id_curso/modulos', key: 'registrar-modulo' },
    PUT_ACTUALIZAR_MODULO: { path: '/academic/modulos/:id_modulo', key: 'actualizar-modulo' },
    DELETE_MODULO: { path: '/academic/modulos/:id_modulo', key: 'eliminar-modulo' },
    
    GET_LISTAR_LECCIONES_MODULO: { path: '/academic/modulos/:id_modulo/lecciones', key: 'listar-lecciones-modulo' },
    GET_LISTAR_RECURSOS_MODULO: { path: '/academic/lecciones/:id_leccion/recursos', key: 'listar-recursos-modulo' },

    POST_REGISTRAR_RECURSO: { path: '/academic/lecciones/:id_leccion/recursos', key: 'registrar-recurso' },
    PUT_ACTUALIZAR_RECURSO: { path: '/academic/recursos/:id_recurso', key: 'actualizar-recurso' },
    DELETE_RECURSO: { path: '/academic/recursos/:id_recurso', key: 'eliminar-recurso' },
}