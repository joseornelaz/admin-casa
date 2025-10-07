import { z } from "zod";

export const GrupoFormSchema = (materias: number[]) =>
    z.object({
        nombre: z.string().nonempty("Nombre de vigencia es requerida"),
        planEstudio: z
            .number()
            .min(1, { message: "Seleccionar Materia" })
            .refine((id) => materias.includes(id), {
                message: "Seleccionar Materia",
            }),
        rutaEstudio: z
            .number()
            .min(1, { message: "Seleccionar Materia" })
            .refine((id) => materias.includes(id), {
                message: "Seleccionar Materia",
            }),
        tutor: z.string().nonempty("Fecha límite de carga es requerida"),
        correoTutor: z.string().nonempty("Fecha inicio del curso es requerida"),
        administrador: z.string().nonempty("Fecha fin del curso es requerida"),
        fechaRegistro: z.string().nonempty("Fecha fin del curso es requerida"),
        fechaModificacion: z.string().nonempty("Fecha fin del curso es requerida"),
        descripcion: z.string().nonempty("Fecha fin del curso es requerida"),
});


export type GrupoFormData = z.infer<ReturnType<typeof GrupoFormSchema>>;