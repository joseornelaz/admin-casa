import { useQuery } from "@tanstack/react-query";
import { TutoresMock } from "../mockdata/TutoresMock";

export const GetTutores = (options?: { enabled?: boolean }) => {
    return useQuery<any, Error>({
        queryKey: ['tutores'],
        queryFn: () => Promise.resolve(TutoresMock),
        staleTime: 1000 * 60 * 10, // 10 minutos de stale time
        ...options
    });
}