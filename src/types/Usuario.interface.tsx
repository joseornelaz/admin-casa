export interface Usuario {
  id_usuario: number;
  sub_cognito: string;
  correo: string;
  usuario: string;
  matricula: string | null;
  id_tipo_usuario: number;
  id_plan_estudio: number | null;
  tipo_usuario: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string | null;
  foto_perfil_url: string | null;
  nombre_plan: string | null;
  nombre_empresa: string | null;
}

export type RolUsuario = "Administrador" | "Asesor" | "Docente" | "Tutor" | "Coordinador";
export type EstatusUsuario = "Activo" | "Inactivo";

export interface UsuarioRow {
  id: number;
  nombre: string;
  iniciales: string;
  avatarBg?: string;
  avatarColor?: string;
  correo: string;
  rolPrincipal: RolUsuario;
  organizacion: string;
  estatus: EstatusUsuario;
  ultAcceso: string;
}

export interface UsuariosFilterParams {
  searchText: string;
  rol: string;
  estatus: string;
  organizacion: string;
}


export type TipoUsuario = "Personal interno" | "Colaborador externo";
export type EstadoUsuario = "Activo" | "Inactivo";
export type NivelAcceso = "Básico" | "Estándar" | "Avanzado";

export interface NuevoUsuario {
  nombre: string;
  correo: string;
  telefono: string;
  tipoUsuario: TipoUsuario;
  estado: EstadoUsuario;
  rol: RolUsuario;
  permisos: string[];
  nivelAcceso: NivelAcceso;
  campus: string;
  programa: string;
  unidadAcademica: string;
}

