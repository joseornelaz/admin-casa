import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./ApiConfiguration/httpClient";
import { GRUPOS_VIGENCIAS, PERIODOS_INSCRIPCION } from "../types/endpoints";
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

    const payload_grupo = {
        nombre_grupo: payload.nombre,
        descripcion: payload.descripcionGrupo,
        id_plan_estudio: payload.idPlanEstudio,
        id_curso: payload.idMateria,
    }

    const response = await apiClient.post<any>(`${GRUPOS_VIGENCIAS.POST_REGISTRAR_GRUPO.path}`, payload_grupo);

    await PostRegistrarGrupoTutor(response.id_grupo, payload);
    await PostRegistrarGrupoClase(response.id_grupo, payload);

    return response;
};

export const PostRegistrarGrupoTutor = async (id_curso: number, payload: VigenciaPayload) => {
    const payload_tutor = {
        id_usuario_tutor: payload.tutor,
        fecha_inicio: payload.fechaInicio,
        fecha_fin: payload.fechaFin
    }
    return await apiClient.post<any>(`${GRUPOS_VIGENCIAS.POST_REGISTRAR_GRUPO_TUTOR.path.replace(':id', String(id_curso))}`, payload_tutor);
};

export const PostRegistrarGrupoClase = async (id_curso: number, payload: VigenciaPayload) => {
    const payload_clase = {
        titulo: payload.tituloClase,
        descripcion: payload.descripcionClase,
        fecha_inicio: payload.fechaInicio,
        fecha_fin: payload.fechaFin,
        calendario_url: "",
        reunion_url: payload.linkTutoria,
        grabacion_url: payload.linkAdmin,
    }
    return await apiClient.post<any>(`${GRUPOS_VIGENCIAS.POST_REGISTRAR_GRUPO_CLASE.path.replace(':id', String(id_curso))}`, payload_clase);
};



// POST_REGISTRAR_GRUPO: { path: '/grupos', key: 'registrar-grupo' },
//     POST_REGISTRAR_GRUPO_TUTOR: { path: '/grupos/:id/tutores', key: 'registrar-grupo-tutores' },
//     POST_REGISTRAR_GRUPO_CLASE: { path: '/grupos/:id/tutorias', key: 'registrar-grupo-tutorias' },


export const PutActualizarVigencia = async ({ id, payload }: { id: number; payload: Partial<VigenciaPayload> }) => {
    return { success: true, data: { id, ...payload } };
};