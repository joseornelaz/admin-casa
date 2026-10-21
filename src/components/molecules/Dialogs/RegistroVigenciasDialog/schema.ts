import { z } from "zod";

export const RegistroVigenciaFormSchema = (
  materiasValidas: number[],
  tutoresValidos: number[],
  tiposGrupoValidos: number[]
) =>
  z.object({
    // Paso 1: Vigencia y Grupo
    idMateria: z
      .number({ message: "Seleccionar Materia" })
      .min(1, { message: "Seleccionar Materia" })
      .refine((id) => (materiasValidas.length > 0 ? materiasValidas.includes(id) : id > 0), {
        message: "Seleccionar Materia",
      }),
    // nombre: z
    //   .string()
    //   .trim()
    //   .min(1, { message: "El nombre de la vigencia es requerido" }),
    // tipoVigencia: z
    //   .string()
    //   .trim()
    //   .min(1, { message: "El tipo de vigencia es requerido" }),
    fechaInicio: z
      .string()
      .trim()
      .min(1, { message: "La fecha de inicio es requerida" }),
    fechaFin: z
      .string()
      .trim()
      .min(1, { message: "La fecha de fin es requerida" }),

    // Paso 1: Vigencia y Grupo
    nombreGrupo: z
      .string()
      .trim()
      .min(1, { message: "El nombre del grupo es requerido" }),
    descripcionGrupo: z.string().optional(),
    tipoGrupo: z
      .number({ message: "Seleccionar Tipo de Grupo" })
      .refine((id) => (tiposGrupoValidos.length > 0 ? tiposGrupoValidos.includes(id) : id > 0), {
        message: "Seleccionar Tipo de Grupo",
      }),
    tutor: z
      .number({ message: "Seleccionar Tutor" })
      .refine((id) => id > 0 && (tutoresValidos.length > 0 ? tutoresValidos.includes(id) : true), {
        message: "Seleccionar Tutor",
      }),

    // Paso 3: Clases
    planEstudio: z.string().optional(),
    servicio: z.string().optional(),
    tituloClase: z.string().optional(),
    linkAdmin: z.string().optional(),
    linkTutoria: z.string().optional(),
    descripcionClase: z.string().optional(),
    tipoClase: z.string().optional(),
    materiaClase: z.string().optional(),
    gruposSeleccionados: z.array(z.string()).optional(),
  });

export type RegistroVigenciaFormData = z.infer<ReturnType<typeof RegistroVigenciaFormSchema>>;
