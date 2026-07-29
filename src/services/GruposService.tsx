import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./ApiConfiguration/httpClient";
import { PERIODOS_INSCRIPCION } from "../types/endpoints";
import { GruposMock } from "../mockdata/GruposMock";
import type { GrupoPayload } from "../types/Grupos.interface";

export const GetGrupos = (options?: { enabled?: boolean }) => {
    return useQuery<any, Error>({
        queryKey: ['gruposList'],
        queryFn: () => Promise.resolve(GruposMock),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });

    // return useQuery<PeriodoInscripcion, Error>({
    //     queryKey: [PERIODOS_INSCRIPCION.GET_PERIODOS_INSCRIPCION.key],
    //     queryFn: () => apiClient.get<PeriodoInscripcion>(`${PERIODOS_INSCRIPCION.GET_PERIODOS_INSCRIPCION.path}`),
    //     staleTime: 1000 * 60 * 10, // 10 minutos de stale time
    //     ...options
    // });
}

export const GetGrupoById = (id: number, options?: { enabled?: boolean }) => {
    return useQuery<any, Error>({
        queryKey: ['grupo', id],
        queryFn: () => Promise.resolve(GruposMock.find(grupo => grupo.id === id)),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
};


export const PostRegistrarGrupo = async (payload: GrupoPayload) => {
    return { success: true, data: payload };

    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post(PERIODOS_INSCRIPCION.POST_REGISTRAR_PERIODO.path, { data: encryptedPayload });
}