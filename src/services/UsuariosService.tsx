import { useQuery } from "@tanstack/react-query";
import { USUARIOS_ADMIN } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { Usuario } from "../types/Usuario.interface";

export const GetUsuarios = (options?: { enabled?: boolean }) => {
    return useQuery<Usuario[], Error>({
        queryKey: [USUARIOS_ADMIN.GET_USUARIOS.key],
        queryFn: () => apiClient.get<Usuario[]>(`${USUARIOS_ADMIN.GET_USUARIOS.path}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}

export const GetUsuarioById = (id: number, options?: { enabled?: boolean }) => {
    return useQuery<Usuario, Error>({
        queryKey: [USUARIOS_ADMIN.GET_USUARIOS_BY_ID.key, id],
        queryFn: () => apiClient.get<Usuario>(`${USUARIOS_ADMIN.GET_USUARIOS_BY_ID.path.replace(':id', String(id))}`),
        staleTime: 0, // sin stale time
        ...options
    });
}
