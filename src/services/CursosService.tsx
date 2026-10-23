import { useQueries, useQuery } from "@tanstack/react-query";
import { CURSOS, MODULOS_CURSOS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { CreateModuloPayload, Curso, ModulosResponse, RecursosResponse, LeccionesResponse, CreateRecursoPayload, RecursosPorModulo } from "../types/Cursos.interface";


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
        staleTime: 0, // sin stale time
        ...options
    });
}

export const GetCursoByPlan = (id: number, options?: { enabled?: boolean }) => {
    return useQuery<Curso[], Error>({
        queryKey: [CURSOS.GET_CURSOS_BY_PLAN.key, id],
        queryFn: () => apiClient.get<Curso[]>(`${CURSOS.GET_CURSOS_BY_PLAN.path.replace(':id_plan', id.toString())}`),
        staleTime: 0, // sin stale time
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

    const recursosPorModulo = leccionesConModulo.reduce<RecursosPorModulo>(
        (recursos, { idModulo }, index) => {
            const recursosDelModulo = recursos[idModulo] ?? {};

            (recursosQueries[index].data ?? []).forEach((recurso) => {
                const tipoRecurso = recurso.tipo_recurso_nombre;
                recursosDelModulo[tipoRecurso] = [
                    ...(recursosDelModulo[tipoRecurso] ?? []),
                    recurso,
                ];
            });

            recursos[idModulo] = recursosDelModulo;
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

export const CreateRecurso = async (id_modulo: number, recurso: CreateRecursoPayload): Promise<any> => {
    const formData = new FormData();
    formData.append('titulo', recurso.titulo);
    formData.append('descripcion_html', recurso.descripcion_html || '');
    formData.append('id_tipo_recurso', recurso.id_tipo_recurso.toString() || '');
    formData.append('tipo_examen', recurso.tipo_examen || '');
    formData.append('url', recurso.url || '');

    if (recurso.file) {
        formData.append('file', recurso.file);
    }

    // La subida de un paquete (.zip con muchos archivos) puede tardar más de 10 s:
    // se amplía el timeout solo para esta petición, sin afectar al resto del cliente.
    return await apiClient.post(
        `${MODULOS_CURSOS.POST_REGISTRAR_RECURSO.path.replace(':id_modulo', id_modulo.toString()).replace(':id_leccion', recurso.id_leccion.toString())}`,
        formData, { timeout: 120000 }
    );
}

/*

export const SaveComentarioForo = async (payload: 
    { 
        id_mensaje: number | null, id_recurso: number, mensaje: string, id_mensaje_respuesta: number | null, files: File[] | null,
        archivos_eliminar?: { id_archivo: number }[]
    }): Promise<ForosSaveResponse> => {

    const encryptedPayload = await apiClient.encryptData({
        id_mensaje: payload.id_mensaje,
        id_recurso: payload.id_recurso,
        mensaje: payload.mensaje,
        id_mensaje_respuesta: payload.id_mensaje_respuesta,
        archivos_eliminar: payload.archivos_eliminar
    });

    const formData = new FormData(); 
    formData.append('data', encryptedPayload);

    if (payload.files && payload.files.length > 0) {
        payload.files.forEach((file) => {
            formData.append('files_foros', file);
        });
    }

    return await apiClient.post<ForosSaveResponse>(SALA_CONVERSACION.SET_MENSAJES.path, formData);
};

*/

export const UpdateRecurso = (id_recurso: number, recurso: Partial<CreateRecursoPayload>) => {
    return apiClient.put(`${MODULOS_CURSOS.PUT_ACTUALIZAR_RECURSO.path.replace(':id_recurso', id_recurso.toString())}`, recurso);
}

export const DeleteRecurso = (id_recurso: number) => {
    return apiClient.delete(`${MODULOS_CURSOS.DELETE_RECURSO.path.replace(':id_recurso', id_recurso.toString())}`);
}