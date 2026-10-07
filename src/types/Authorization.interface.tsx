// import type { Perfil } from "./Perfil.interface";

export interface LoginCredentials {
  password: string;
  email?: string;
}

export interface LoginResponse {
    accessToken:  string;
    refreshToken: string;
    authMethod:   string;
    user:         User;
}

export interface User {
    uuid:        string;
    email:       string;
    firstName:   string;
    lastName:    string;
    fullName:    string;
    role:        string;
    photoUrl:    string;
    username:    string;
    matricula:   string;
    planEstudio: string;
    empresa:     string;
    campusId:    number;
}
