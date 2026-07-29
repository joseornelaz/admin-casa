import { useQuery } from "@tanstack/react-query";
import { MateriasMock } from "../mockdata/MateriasMock";


export const GetMaterias = (options?: { enabled?: boolean }) => {
    return useQuery<any, Error>({
        queryKey: ['materias'],
        queryFn: () => Promise.resolve(MateriasMock),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}