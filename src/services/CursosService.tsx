import { useQueries, useQuery } from "@tanstack/react-query";
import { CURSOS, MODULOS_CURSOS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { CreateModuloPayload, Curso, ModulosResponse, RecursosResponse, LeccionesResponse, CreateRecursoPayload } from "../types/Cursos.interface";


export const GetCursos = (options?: { enabled?: boolean }) => {
    return useQuery<Curso[], Error>({
        queryKey: [CURSOS.GET_CURSOS.key],
        queryFn: () => apiClient.get<Curso[]>(`${CURSOS.GET_CURSOS.path}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}

export const GetCursoById = (id: number, options?: { enabled?: boolean }) => {
    return useQuery<Curso, Error>({
        queryKey: [CURSOS.GET_CURSOS.key, id],
        queryFn: () => apiClient.get<Curso>(`${CURSOS.GET_CURSOS.path}/${id}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}

export const CreateCurso = (curso: Partial<Curso>) => {
    return apiClient.post<Curso>(`${CURSOS.POST_REGISTRAR_CURSO.path}`, curso);
}

export const UpdateCurso = (id: number, curso: Partial<Curso>) => {
    return apiClient.put<Curso>(`${CURSOS.PUT_ACTUALIZAR_CURSO.path.replace(':id', String(id))}`, curso);
}

export const DeleteCurso = (id: number) => {
    return apiClient.delete(`${CURSOS.DELETE_ELIMINAR_CURSO.path.replace(':id', String(id))}`);
}

// MODULOS

export const GetModulosByCursoId = (id_curso: number, options?: { enabled?: boolean }) => {
    return useQuery<ModulosResponse[], Error>({
        queryKey: [MODULOS_CURSOS.GET_MODULOS.key, id_curso],
        queryFn: () => apiClient.get(`${MODULOS_CURSOS.GET_MODULOS.path.replace(':id_curso', id_curso.toString())}`),
        staleTime: 0, // sin stale time
        ...options
    });
}

export const GetCursoContenido = (id_curso: number, options?: { enabled?: boolean }) => {
    const modulosQuery = GetModulosByCursoId(id_curso, options);
    const modulos = modulosQuery.data ?? [];

    const leccionesQueries = useQueries({
        queries: modulos.map((modulo) => ({
            queryKey: [MODULOS_CURSOS.GET_LISTAR_LECCIONES_MODULO.key, modulo.id_modulo],
            queryFn: () => apiClient.get<LeccionesResponse[]>(
                MODULOS_CURSOS.GET_LISTAR_LECCIONES_MODULO.path.replace(':id_modulo', modulo.id_modulo.toString())
            ),
            staleTime: 1000 * 60 * 10,
            enabled: Boolean(options?.enabled && modulosQuery.isSuccess),
        })),
    });

    const leccionesConModulo = leccionesQueries.flatMap((query, index) =>
        (query.data ?? []).map((leccion) => ({
            idModulo: modulos[index].id_modulo,
            idLeccion: leccion.id_leccion,
        }))
    );

    const recursosQueries = useQueries({
        queries: leccionesConModulo.map(({ idLeccion }) => ({
            queryKey: [MODULOS_CURSOS.GET_LISTAR_RECURSOS_MODULO.key, idLeccion],
            queryFn: () => apiClient.get<RecursosResponse[]>(
                MODULOS_CURSOS.GET_LISTAR_RECURSOS_MODULO.path.replace(':id_leccion', idLeccion.toString())
            ),
            staleTime: 1000 * 60 * 10,
            enabled: Boolean(options?.enabled && leccionesQueries.every((query) => query.isSuccess)),
        })),
    });

    const recursosPorModulo = leccionesConModulo.reduce<Record<number, RecursosResponse[]>>(
        (recursos, { idModulo }, index) => {
            recursos[idModulo] = [...(recursos[idModulo] ?? []), ...(recursosQueries[index].data ?? [])];
            return recursos;
        },
        {}
    );

    return {
        modulos,
        recursosPorModulo,
        lecciones: leccionesConModulo,
        isLoading: Boolean(options?.enabled) && (
            modulosQuery.isPending ||
            modulosQuery.isFetching ||
            leccionesQueries.some((query) => query.isPending || query.isFetching) ||
            recursosQueries.some((query) => query.isPending || query.isFetching)
        ),
        isError: modulosQuery.isError || leccionesQueries.some((query) => query.isError) || recursosQueries.some((query) => query.isError),
        isSuccess: modulosQuery.isSuccess && leccionesQueries.every((query) => query.isSuccess) && recursosQueries.every((query) => query.isSuccess),
    };
};

export const GetModuloContenido = (id_modulo: number, id_leccion: number, options?: { enabled?: boolean }) => {
  const leccionesQuery = GetLeccionesByModuloId(id_modulo, options);
  const recursosQuery = GetRecursosByModuloId(id_leccion, options);

  return {
    lecciones: leccionesQuery.data ?? [],
    recursos: recursosQuery.data ?? [],
    isLoading: leccionesQuery.isLoading || recursosQuery.isLoading,
    isError: leccionesQuery.isError || recursosQuery.isError,
    error: leccionesQuery.error || recursosQuery.error,
    refetch: () => {
      leccionesQuery.refetch();
      recursosQuery.refetch();
    }
  };
};

export const GetLeccionesByModuloId = (id_modulo: number, options?: { enabled?: boolean }) => {
    return useQuery<LeccionesResponse[], Error>({
        queryKey: [MODULOS_CURSOS.GET_LISTAR_LECCIONES_MODULO.key, id_modulo],
        queryFn: () => apiClient.get(`${MODULOS_CURSOS.GET_LISTAR_LECCIONES_MODULO.path.replace(':id_modulo', id_modulo.toString())}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}

export const GetRecursosByModuloId = (id_leccion: number, options?: { enabled?: boolean }) => {
    return useQuery<RecursosResponse[], Error>({
        queryKey: [MODULOS_CURSOS.GET_LISTAR_RECURSOS_MODULO.key, id_leccion],
        queryFn: () => apiClient.get(`${MODULOS_CURSOS.GET_LISTAR_RECURSOS_MODULO.path.replace(':id_leccion', id_leccion.toString())}`),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}

export const CreateModulo = (id_curso: number, modulo: CreateModuloPayload) => {
    return apiClient.post<{ id: number; message: string }>(`${MODULOS_CURSOS.POST_REGISTRAR_MODULO.path.replace(':id_curso', id_curso.toString())}`, modulo);
}

export const UpdateModulo = (id_modulo: number, modulo: {titulo: string, descripcion?: string, orden?: number}) => {
    return apiClient.put(`${MODULOS_CURSOS.PUT_ACTUALIZAR_MODULO.path.replace(':id_modulo', id_modulo.toString())}`, modulo);
}

export const DeleteModulo = (id_modulo: number) => {
    return apiClient.delete(`${MODULOS_CURSOS.DELETE_MODULO.path.replace(':id_modulo', id_modulo.toString())}`);
}

export const CreateRecurso = (id_leccion: number, recurso: CreateRecursoPayload) => {
    return apiClient.post(`${MODULOS_CURSOS.POST_REGISTRAR_RECURSO.path.replace(':id_leccion', id_leccion.toString())}`, recurso);
}

export const UpdateRecurso = (id_recurso: number, recurso: Partial<CreateRecursoPayload>) => {
    return apiClient.put(`${MODULOS_CURSOS.PUT_ACTUALIZAR_RECURSO.path.replace(':id_recurso', id_recurso.toString())}`, recurso);
}

export const DeleteRecurso = (id_recurso: number) => {
    return apiClient.delete(`${MODULOS_CURSOS.DELETE_RECURSO.path.replace(':id_recurso', id_recurso.toString())}`);
}