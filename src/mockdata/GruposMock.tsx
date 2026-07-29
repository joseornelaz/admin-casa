import type { Grupo } from "../types/Grupos.interface";

export const GruposMock: Grupo[] = [
  {
    id: 1,
    nombre: 'Diseño de Interfaces I - Grupo A',
    descripcion: 'Grupo de estudiantes que cursan la materia de Diseño de Interfaces I',
    tipoGrupo: 1,
    tutor: 1,
    nombreTutor: 'Juan Pérez',
    fechaRegistro: '2025-09-01',
    totalAlumnos: 30,
    estatus: 1    
  },
  {
    id: 2,
    nombre: 'Programación Avanzada - Grupo B',
    descripcion: 'Grupo de estudiantes que cursan la materia de Programación Avanzada',
    tipoGrupo: 2,
    tutor: 2,
    nombreTutor: 'María López',
    fechaRegistro: '2025-10-01',
    totalAlumnos: 25,
    estatus: 1
  },
  {
    id: 3,
    nombre: 'Bases de Datos - Grupo C',
    descripcion: 'Grupo de estudiantes que cursan la materia de Bases de Datos',
    tipoGrupo: 3,
    tutor: 3,
    nombreTutor: 'Carlos García',
    fechaRegistro: '2025-11-01',
    totalAlumnos: 20,
    estatus: 0
  }
];

export const EstudiantesMock = [
  {
    id: 1,
    nombre: 'Ana Martínez',
    avance: 85,
    calificacion: 9.2,
    estatus: 'Activo'
  },
  {
    id: 2,
    nombre: 'Luis Hernández',
    avance: 70,
    calificacion: 8.5,
    estatus: 'Activo'
  },
  {
    id: 3,
    nombre: 'María González',
    avance: 60,
    calificacion: 7.8,
    estatus: 'Inactivo'
  },
  {
    id: 4,
    nombre: 'Carlos López',
    avance: 90,
    calificacion: 9.5,
    estatus: 'Activo'
  },
  {
    id: 5,  
    nombre: 'Sofía Ramírez',
    avance: 75,
    calificacion: 8.0,
    estatus: 'Activo'
  }

];