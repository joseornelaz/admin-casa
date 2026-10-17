import { useQuery } from "@tanstack/react-query";
import { CATALOGOS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { CatalogoEstadosCurso } from "../types/Catalogos.interface";

export const GetCatalogoEstadosCurso = (options?: { enabled?: boolean }) => {
    return useQuery<CatalogoEstadosCurso[], Error>({
        queryKey: [CATALOGOS.GET_ESTATUS_CURSOS.key],
        queryFn: () => apiClient.get<CatalogoEstadosCurso[]>(`${CATALOGOS.GET_ESTATUS_CURSOS.path}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}