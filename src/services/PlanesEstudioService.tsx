import { useQuery } from "@tanstack/react-query";
import { PLANES_ESTUDIO } from "../types/endpoints";
import type { EmpresaPlanesResponse, ProgramasAcademicosTotalCursosResponse } from "../types/PlanesEstudio.interface";
import { apiClient } from "./ApiConfiguration/httpClient";


export const GetPlanesEstudioTotalAlumnos = (options?: { enabled?: boolean }) => {
    return useQuery<EmpresaPlanesResponse[], Error>({
        queryKey: [PLANES_ESTUDIO.GET_PLANES_ESTUDIO_TOTAL_ALUMNOS.key],
        queryFn: () => apiClient.get<EmpresaPlanesResponse[]>(`${PLANES_ESTUDIO.GET_PLANES_ESTUDIO_TOTAL_ALUMNOS.path}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}

export const GetPlanesEstudioTotalCursos = (options?: { enabled?: boolean }) => {
    return useQuery<ProgramasAcademicosTotalCursosResponse[], Error>({
        queryKey: [PLANES_ESTUDIO.GET_PLANES_ESTUDIO_TOTAL_CURSOS.key],
        queryFn: () => apiClient.get<ProgramasAcademicosTotalCursosResponse[]>(`${PLANES_ESTUDIO.GET_PLANES_ESTUDIO_TOTAL_CURSOS.path}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}