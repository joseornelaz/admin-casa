import { z } from "zod";

const socialMediaSchema = z.object({
  link: z.string().url('URL inválida').min(1, 'El link es requerido'),
  platform: z.string().min(1, 'Selecciona una red social'),
});

const phoneSchema = z.object({
  number: z.string().min(10, 'Número inválido'),
  type: z.enum(['Móvil', 'Casa', 'Trabajo']),
});

export const AltaUnicaFormSchema = () =>
    z.object({
        // materia: z
        //     .number()
        //     .min(1, { message: "Seleccionar Materia" })
        //     .refine((id) => materias.includes(id), {
        //         message: "Seleccionar Materia",
        //     }),
        numeroEmpleado: z.string().nonempty("Numero de empleado es requerido"),
        nombre: z.string().nonempty("Nombre es requerido"),
        apellidoPaterno: z.string().nonempty("Apellido Paterno es requerido"),
        apellidoMaterno: z.string().nonempty("Apellido Materno es requerido"),
        fechaNacimiento: z.string().nonempty("Fecha de Nacimiento es requerida"),
        edad: z.string().nonempty("Edad es requerida"),
        sexo: z.string().nonempty("Sexo es requerido"),
        estadoCivil: z.string(),
        curp: z.string(),
        escolaridad: z.string(),

        // datos laborales
        asociacion: z.string(),
        empresa: z.string(),
        corporacion: z.string(),
        programaAcademico: z.string(),
        rutaEstudios: z.string(),
        tipoUsuario: z.string().nonempty("Tipo de usuario es requerido"),
        estado: z.string(),
        ciudad: z.string(),
        centro: z.string(),
        region: z.string(),
        puesto: z.string(),

        // datos de contacto
        calle: z.string(),
        numero: z.string(),
        colonia: z.string(),
        municipio: z.string(),
        codigoPostal: z.string(),
        correoElectronicoContacto: z.string().email("Correo electrónico inválido").nonempty("Correo electrónico es requerido"),
        socialMedia: z.array(socialMediaSchema).optional(),
        phones: z.array(phoneSchema).optional(),

        // notas y observaciones
        elegible: z.string(),
        interesado: z.string(),
        campana: z.string(),
        usuarioResponsable: z.string(),
        comentarios: z.string().max(500, "Máximo 500 caracteres"),
});


export type AltaUnicaFormData = z.infer<ReturnType<typeof AltaUnicaFormSchema>>;