// import type { Perfil } from "./Perfil.interface";

export interface LoginCredentials {
  password: string;
  usuario: string;
}

export interface LoginResponse {
    accessToken:  string;
    refreshToken: string;
    authMethod:   string;
    user:         User;
}

export interface User {
    uuid?:        string;
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
    role: string;
}
