import { z } from "zod";

export const VigenciaFormSchema = (materiasValidas: number[]) =>
  z.object({
    idMateria: z
      .number({ message: "Seleccionar Materia" })
      .min(1, { message: "Seleccionar Materia" })
      .refine(
        (id) => (materiasValidas.length > 0 ? materiasValidas.includes(id) : id > 0),
        { message: "Seleccionar Materia" }
      ),
    nombre: z
      .string()
      .trim()
      .min(1, { message: "Nombre de vigencia es requerido" }),
    tipoVigencia: z
      .string()
      .trim()
      .min(1, { message: "Tipo Vigencia es requerida" }),
    fechaInicio: z
      .string()
      .trim()
      .min(1, { message: "Fecha inicio es requerida" }),
    fechaFin: z
      .string()
      .trim()
      .min(1, { message: "Fecha fin es requerida" }),
    fechaProrroga: z.string(),
  });

export type VigenciaFormData = z.infer<ReturnType<typeof VigenciaFormSchema>>;