import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./ApiConfiguration/httpClient";
import { PERIODOS_INSCRIPCION } from "../types/endpoints";
import type { VigenciaPayload } from "../types/Vigencias.interface";
import { VigenciasMock } from "../mockdata/VigenciasMock";

export const GetVigencias = (options?: { enabled?: boolean }) => {
    return useQuery<any, Error>({
        queryKey: ['vigenciasList'],
        queryFn: () => Promise.resolve(VigenciasMock),
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

export const GetVigenciaById = (id: number, options?: { enabled?: boolean }) => {
    return useQuery<any, Error>({
        queryKey: ['vigencia', id],
        queryFn: () => Promise.resolve(VigenciasMock.find(grupo => grupo.id === id)),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
};


export const PostRegistrarVigencia = async (payload: VigenciaPayload) => {
    return { success: true, data: payload };

    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post(PERIODOS_INSCRIPCION.POST_REGISTRAR_PERIODO.path, { data: encryptedPayload });
}