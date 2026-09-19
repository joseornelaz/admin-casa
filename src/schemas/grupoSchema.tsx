import { z } from "zod";

export const GrupoFormSchema = (_materias?: number[]) =>
  z.object({
    nombre: z.string().optional(),
    planEstudio: z.union([z.string(), z.number()]).optional(),
    rutaEstudio: z.union([z.string(), z.number()]).optional(),
    tutor: z.string().optional(),
    correoTutor: z.string().optional(),
    administrador: z.union([z.string(), z.number()]).optional(),
    fechaRegistro: z.string().optional(),
    fechaModificacion: z.string().optional(),
    descripcion: z.string().optional(),
    activo: z.boolean().optional(),
    habilitado: z.boolean().optional(),
    normal: z.boolean().optional(),
  });

export type GrupoFormData = z.infer<ReturnType<typeof GrupoFormSchema>>;