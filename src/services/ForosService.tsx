import type { ForosSaveResponse, TemaForoByIdResponse, DatosSalaConversacionResponse, ForoMensajesResponse, ForosGrupoResponse, ForosResponse, ListadoGrupoAlumnosResponse } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./ApiConfiguration/httpClient";
import { FOROS_ADMIN, SALA_CONVERSACION } from "../types/endpoints";

export const GetForoGrupo = (idGrupo: number, options?: { enabled?: boolean }) => {
    return useQuery<ForosGrupoResponse, Error>({
        queryKey: [FOROS_ADMIN.GET_FORO_GRUPOS.key, idGrupo],
        queryFn: () => apiClient.get<ForosGrupoResponse>(`${FOROS_ADMIN.GET_FORO_GRUPOS.path}/${idGrupo}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}

export const GetGruposAsignados = (options?: { enabled?: boolean }) => {
    return useQuery<ListadoGrupoAlumnosResponse, Error>({
        queryKey: [FOROS_ADMIN.GET_GRUPOS_ASIGNADOS.key],
        queryFn: () => apiClient.get<ListadoGrupoAlumnosResponse>(`${FOROS_ADMIN.GET_GRUPOS_ASIGNADOS.path}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}

export const GetForos = (payload: { grupo: number, foro: number, calificados: number}, options?: { enabled?: boolean }) => {
    // 0: Todas -> null
    // 1: Pendientes de calificar -> false
    // 2: Calificados -> true
    
    let calificadosParam = 'null';
    const val = Number(payload.calificados);

    if (val === 1) {
        calificadosParam = 'false';
    } else if (val === 2) {
        calificadosParam = 'true';
    }

    return useQuery<ForosResponse, Error>({
        // Include parameters in queryKey to differentiate cache entries
        queryKey: [FOROS_ADMIN.GET_FORO_CALIFICAR.key, payload.grupo, payload.foro, calificadosParam],
        queryFn: () => apiClient.get<ForosResponse>(`${FOROS_ADMIN.GET_FORO_CALIFICAR.path}?id_grupo=${payload.grupo}&id_recurso=${payload.foro}&calificado=${calificadosParam}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}


/*  */

export const GetIdConversacion = (idTipoSala: number) => {
    return useQuery<DatosSalaConversacionResponse, Error>({
        queryKey: [SALA_CONVERSACION.GET_SALA_CONVERSACION.key, idTipoSala],
        queryFn: () => apiClient.get<DatosSalaConversacionResponse>(`${SALA_CONVERSACION.GET_SALA_CONVERSACION.path}?id_tipo_sala=${idTipoSala}`),
    });
}

export const GetTemaForoById = (idRecurso: number, options?: { enabled?: boolean }) => {
    return useQuery<TemaForoByIdResponse, Error>({
        queryKey: [SALA_CONVERSACION.GET_TEMA_FORO_BY_ID.key, idRecurso],
        queryFn: () => apiClient.get<TemaForoByIdResponse>(`${SALA_CONVERSACION.GET_TEMA_FORO_BY_ID.path}?id_recurso=${idRecurso}`),
        ...options
    });
}

export const GetMensajesForo = (id_tipo_sala: number, idRecurso: number, pagina: number, todos: number, orden: string, paginasize: number) => {

    const url = `${SALA_CONVERSACION.GET_MENSAJES.path}?id_tipo_sala=${id_tipo_sala}&id_recurso=${idRecurso}&pagina=${pagina}&todos=${todos}&orden=${orden}${id_tipo_sala !== 4 ? `&paginasize=${paginasize}` : ''}`;

    const keys = [SALA_CONVERSACION.GET_MENSAJES.key, id_tipo_sala, idRecurso, pagina, todos, orden, paginasize];

    if(id_tipo_sala === 4) {
        keys.pop(); //quitamos paginasize para SalaConversacion
    }

    return useQuery<ForoMensajesResponse, Error>({
        queryKey: keys,
        queryFn: async () => await apiClient.get<ForoMensajesResponse>(url),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}

export const SaveComentarioForo = async (payload: 
    { 
        id_mensaje: number | null, id_recurso: number, mensaje: string, id_mensaje_respuesta: number | null
    }): Promise<ForosSaveResponse> => {

    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<ForosSaveResponse>(SALA_CONVERSACION.SET_MENSAJES.path, { data: encryptedPayload });
};

export const DeleteMensaje = async (id_mensaje: number) => {
    const payload = {id_mensaje};
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post(SALA_CONVERSACION.DELETE_MENSAJES.path, { data: encryptedPayload });
};

import type { CalificarForoPayload, CalificarForoResponse } from "../types/Foros.interface";

export const CalificarForo = async (payload: CalificarForoPayload): Promise<CalificarForoResponse> => {
    
    
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post<CalificarForoResponse>('/calificaciones/calificar', { data: encryptedPayload });
};