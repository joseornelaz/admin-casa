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