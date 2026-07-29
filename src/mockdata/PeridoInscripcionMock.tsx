import type { PeriodoInscripcion } from "../types/PeriodoInscripcion.interface";

export const PeriodoInscripcionMock: PeriodoInscripcion[] = [
  {
    id: 1,
    nombrePeriodo: 'Diseño de Interfaces I',
    estatusPeriodo: 'ABIERTO',
    enabled: true,
    fechaCreacion: '2025-09-26',
    inicioInscripcion: '2025-09-01',
    finInscripcion: '2025-09-30',
    inicioPlataforma: '2025-10-05'
  },
  {
    id: 2,
    nombrePeriodo: 'Programación Orientada a Objetos',
    estatusPeriodo: 'PROXIMO',
    enabled: true,
    fechaCreacion: '2026-01-10',
    inicioInscripcion: '2026-02-01',
    finInscripcion: '2026-02-28',
    inicioPlataforma: '2026-03-05'
  },
  {
    id: 3,
    nombrePeriodo: 'Estructuras de Datos y Algoritmos',
    estatusPeriodo: 'CERRADO',
    enabled: false,
    fechaCreacion: '2026-05-14',
    inicioInscripcion: '2026-06-01',
    finInscripcion: '2026-06-15',
    inicioPlataforma: '2026-06-20'
  }
];