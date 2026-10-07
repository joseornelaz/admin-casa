import { useState, useEffect } from 'react';

/**
 * Hook para retrasar la actualización de un valor hasta que transcurra un tiempo especificado sin cambios.
 * Ideal para campos de búsqueda e inputs que disparan filtrados o peticiones.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
