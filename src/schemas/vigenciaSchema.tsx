import { z } from "zod";

export const VigenciaFormSchema = (materias: number[]) =>
    z.object({
        idMateria: z
            .number()
            .min(1, { message: "Seleccionar Materia" })
            .refine((id) => materias.includes(id), {
                message: "Seleccionar Materia",
            }),
        nombre: z.string().nonempty("Nombre de vigencia es requerido"),
        tipoVigencia: z.string().nonempty("Tipo Vigencia es requerida"),
        fechaInicio: z.string().nonempty("Fecha inicio es requerida"),
        fechaFin: z.string().nonempty("Fecha fin es requerida"),
        fechaProrroga: z.string().nonempty("Fecha de prorroga es requerida"),
});


export type VigenciaFormData = z.infer<ReturnType<typeof VigenciaFormSchema>>;