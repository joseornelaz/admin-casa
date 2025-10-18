import { z } from "zod";

export const VigenciaFormSchema = (materias: number[]) =>
    z.object({
        materia: z
            .number()
            .min(1, { message: "Seleccionar Materia" })
            .refine((id) => materias.includes(id), {
                message: "Seleccionar Materia",
            }),
        name: z.string().nonempty("Nombre de vigencia es requerida"),
        tipoVigencia: z.string().nonempty("Tipo Vigencia es requerida"),
        fechaInicioInscripcion: z.string().nonempty("Fecha inicio de inscripción es requerida"),
        fechaLimiteCarga: z.string().nonempty("Fecha límite de carga es requerida"),
        fechaInicioCurso: z.string().nonempty("Fecha inicio del curso es requerida"),
        fechaFinCurso: z.string().nonempty("Fecha fin del curso es requerida"),
});


export type VigenciaFormData = z.infer<ReturnType<typeof VigenciaFormSchema>>;