import { z } from "zod";

export const PeriodoInscripcionFormSchema = (estatus: number[]) =>
    z.object({
        // materia: z
        //     .number()
        //     .min(1, { message: "Seleccionar Materia" })
        //     .refine((id) => materias.includes(id), {
        //         message: "Seleccionar Materia",
        //     }),
        nombrePeriodo: z.string().nonempty("Nombre del periodo es requerido"),
        fechaInicioInscripcion: z.string().nonempty("Inicio de inscripción es requerida"),
        fechaFinInscripcion: z.string().nonempty("Fin de inscripción es requerida"),
        fechaInicioPlataforma: z.string().nonempty("Inicio en plataforma es requerida"),
        estatusPeriodo: z
            .number()
            .min(1, { message: "Seleccionar Estatus" })
            .refine((id) => estatus.includes(id), {
                message: "Seleccionar Estatus",
            }),
});


export type PeriodoInscripcionFormData = z.infer<ReturnType<typeof PeriodoInscripcionFormSchema>>;