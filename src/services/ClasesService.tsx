import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./ApiConfiguration/httpClient";
import { CLASES } from "../types/endpoints";
import type { ClasesResponse, CreateClasePayload, CreateClaseResponse } from "../types/Clases.interface";

export const GetClasesGrupo = (idGrupo: number, options?: { enabled?: boolean }) => {
    return useQuery<ClasesResponse, Error>({
        queryKey: [CLASES.GET_CLASES_GRUPO.key, idGrupo],
        queryFn: () => apiClient.get<ClasesResponse>(`${CLASES.GET_CLASES_GRUPO.path}/${idGrupo}`),
        staleTime: 1000 * 60 * 10, // 10 minutes stale time
        ...options
    });
}

export const CreateClase = async (payload: CreateClasePayload): Promise<CreateClaseResponse> => {
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post<CreateClaseResponse>(CLASES.CREATE_CLASE.path, { data: encryptedPayload });
};
