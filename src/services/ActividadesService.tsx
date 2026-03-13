import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./ApiConfiguration/httpClient";
import { ACTIVIDADES } from "../types/endpoints";
import type { ActividadesResponse, ActividadDetalleResponse, CalificarActividadPayload, CalificarActividadResponse } from "../types/Actividades.interface";

export const GetActividadesGrupo = (idGrupo: number, options?: { enabled?: boolean }) => {
    return useQuery<ActividadesResponse, Error>({
        queryKey: [ACTIVIDADES.GET_ACTIVIDADES_GRUPO.key, idGrupo],
        queryFn: () => apiClient.get<ActividadesResponse>(`${ACTIVIDADES.GET_ACTIVIDADES_GRUPO.path}/${idGrupo}`),
        staleTime: 1000 * 60 * 10, // 10 minutes stale time
        ...options
    });
}

export const GetActividadDetalle = (idCurso: number, idRecurso: number, options?: { enabled?: boolean }) => {
    return useQuery<ActividadDetalleResponse, Error>({
        queryKey: [ACTIVIDADES.GET_ACTIVIDAD_DETALLE.key, idCurso, idRecurso],
        queryFn: () => apiClient.get<ActividadDetalleResponse>(`${ACTIVIDADES.GET_ACTIVIDAD_DETALLE.path}?id_curso=${idCurso}&id_recurso=${idRecurso}`),
        staleTime: 1000 * 60 * 5, 
        ...options
    });
}

export const CalificarActividad = async (payload: CalificarActividadPayload): Promise<CalificarActividadResponse> => {
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post<CalificarActividadResponse>('/calificaciones/calificar', { data: encryptedPayload });
};