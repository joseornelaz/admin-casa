import { z } from "zod";

export const FilterVigenciaSchema = (materias: number[]) =>
    z.object({
        materias: z
            .number()
            .min(1, { message: "Seleccionar Materia" })
            .refine((id) => materias.includes(id), {
                message: "Seleccionar Materia",
            }),
        planEstudios: z
            .number()
            .min(1, { message: "Seleccionar Materia" })
            .refine((id) => materias.includes(id), {
                message: "Seleccionar Materia",
            }),
        rutaEstudios: z
            .number()
            .min(1, { message: "Seleccionar Materia" })
            .refine((id) => materias.includes(id), {
                message: "Seleccionar Materia",
            }),
        
});


export type FilterVigenciaData = z.infer<ReturnType<typeof FilterVigenciaSchema>>;