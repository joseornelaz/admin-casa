import { z } from "zod";

export const RegistrarGrupoFormSchema = (tutoresValidos: number[], tiposGrupoValidos: number[]) =>
    z.object({
        // nombre: z.string().nonempty("Nombre del grupo es requerido"),
        // nombre: z.string()
        //         .trim() // Remueve espacios en blanco accidentales
        //         .min(1, { message: "El nombre del grupo es requerido" }),
        // descripcion: z.string(),
        // tipoGrupo: z
        //             .number()
        //             .refine((id) => tipoGrupo.includes(id), {
        //                 message: "Seleccionar Tipo de Grupo",
        //             }),
        // tutor: z
        //     .number()
        //     .min(1, { message: "Seleccionar Tutor" })
        //     .refine((id) => tutor.includes(id), {
        //         message: "Seleccionar Tutor",
        //     }),
       nombre: z
      .string()
      .trim()
      .min(1, { message: "El nombre del grupo es requerido" }),

    descripcion: z.string().optional(),

    tipoGrupo: z
      .number({ message: "Seleccionar Tipo de Grupo" })
      .refine((id) => tiposGrupoValidos.includes(id), {
        message: "Seleccionar Tipo de Grupo",
      }),

    tutor: z
      .number({ message: "Seleccionar Tutor" })
      .refine((id) => id > 0 && tutoresValidos.includes(id), {
            message: "Seleccionar Tutor",
        }),
});


export type RegistrarGrupoFormData = z.infer<ReturnType<typeof RegistrarGrupoFormSchema>>;