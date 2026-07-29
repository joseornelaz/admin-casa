import type { Vigencia } from "../types/Vigencias.interface";


export const VigenciasMock: Vigencia[] = [
  {
    id: 1,
    idMateria: 101,
    materia: 'Diseño de Interfaces I',
    nombre: 'Grupo A',
    fechaInicio: '2025-09-01',
    fechaFin: '2025-09-30',
    estatus: 1,
    fechaProrroga: '2025-10-05',
    tipoVigencia: 'NORMAL'
  },
  {
    id: 2,
    idMateria: 102,
    materia: 'Programación Orientada a Objetos',
    nombre: 'Grupo B',
    fechaInicio: '2025-10-01',
    fechaFin: '2025-10-31',
    estatus: 0,
    fechaProrroga: '2025-11-05',
    tipoVigencia: 'PRUEBA'
  },
  {
    id: 3,
    idMateria: 103,
    materia: 'Estructuras de Datos y Algoritmos',
    nombre: 'Grupo C',
    fechaInicio: '2025-11-01',
    fechaFin: '2025-11-30',
    estatus: 1,
    fechaProrroga: '2025-12-05',
    tipoVigencia: 'NORMAL'
  }
];