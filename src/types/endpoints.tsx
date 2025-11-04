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