import { z } from "zod";

export const ForoSchema = (grupo_alumnos: number[], foros: number[], limite: number[]) =>
    z.object({
        grupo_alumnos: z
            .number()
            .min(1, { message: "Seleccionar Grupo de Alumnos" })
            .refine((id) => grupo_alumnos.includes(id), {
                message: "Seleccionar Grupo de Alumnos",
            }),
        foros: z
            .number()
            .min(1, { message: "Seleccionar Foro" })
            .refine((id) => foros.includes(id), {
                message: "Seleccionar Foro",
            }),
        limite: z
            .number()
            .min(0, { message: "Selecciona un limite" })
            .refine((id) => limite.includes(id), {
                message: "Selecciona un limite",
            }),
        
});


export type ForoData = z.infer<ReturnType<typeof ForoSchema>>;